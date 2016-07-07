import { BerryBehavior } from './BerryBehavior'
import { Berry } from './Berry'
import { BerryObject } from './BerryObject'
import { BerryManager } from './managers/BerryManager'
import { Time } from '../utils/Time'

export class Blueberry extends BerryBehavior {

    protected loadSequence: Function[] = [];

    ////////////////////////////////////////////////////////////////////////////
    // Blueberry main loop values
    ////////////////////////////////////////////////////////////////////////////
    private lastLoopTime = this.getNanoSeconds;// * 1000;
    private targetFps = 240;
    private optimalTime = 1000000000 / this.targetFps;
    private lastFpsTime = 0;

    private startTime = 0;

    /**
     * Creates an instance of Blueberry.
     *
     */
    public constructor() {
        super();
        this.init();
        let $this: Blueberry = this;
        window.onload = function () {
            $this.loadSequence.forEach(callback => {
                callback();
            });
        }

        window.onscroll = window.onresize = function () {
            BerryManager.berries.forEach(berry => {
                // Skip the check if the berry isn't enabled
                if (!berry.isEnabled) { return; }

                // Check if the item is in the viewport
                var isVisible = $this.isElementInViewport(berry);

                // If the item enters the viewport let the componets know
                if (berry.isVisible != isVisible && isVisible) {
                    berry.sendMessage('onEnterViewport');
                    berry.isVisible = true;
                }

                // If the item leaves the viewport let the componets know
                else if (berry.isVisible != isVisible && !isVisible) {
                    berry.sendMessage('onExitViewport');
                    berry.isVisible = false;
                }
            });
        }
    }

    /**
     * Initialization of the blueberry framework
     *
     * @protected
     */
    protected init() {
        let $this = this;
        this.loadSequence.push(() => {
            let nodes: NodeListOf<HTMLElement> = document.querySelectorAll('[blueberry],[data-blueberry]') as NodeListOf<HTMLElement>;
            let berryObjects: BerryObject[] = [];
            for (let i = 0; i < nodes.length; i++) {
                let node = nodes.item(i);

                // Create an instance of BerryObject
                let berryObject = new BerryObject(node);

                // Setup the name and tag
                berryObject.name = node.getAttribute('blueberry') || node.getAttribute('data-blueberry') || '';
                berryObject.tag = node.getAttribute('tag') || node.getAttribute('data-tag') || '';

                // Setup a click message for this object
                node.addEventListener('click', e => {
                    berryObject.sendMessage('click', { event: e });
                });

                // Check if the object is in the viewport
                berryObject.isVisible = $this.isElementInViewport(berryObject);

                // Adds components defined in the DOM
                $this.addBerryComponents(berryObject, node);

                // Send an awake message
                berryObject.sendMessage('awake');

                // Adds the berryObject to the array
                berryObjects.push(berryObject);
            }

            // Set the berry array in the manager
            BerryManager.setBerries(berryObjects);

            // Set the initial startTime
            $this.startTime = (new Date()).getTime();

            // Start the application
            $this.berryLoop();
        });
    }

    /**
     * The main loop that controls the flow of blueberry
     *
     * @private
     */
    private berryLoop() {
        Time.setFrameTime(((new Date).getTime() - this.startTime) / 1000);
        var nanoSeconds = this.getNanoSeconds;
        var now = nanoSeconds;
        var updateLength = now - this.lastLoopTime;
        this.lastLoopTime = now;
        var delta = updateLength / this.optimalTime;

        this.lastFpsTime += updateLength;
        if (this.lastFpsTime >= 1000000000) {
            this.lastFpsTime = 0;
        }

        // Set the delta on each berry
        Time.setDeltaTime(delta / this.targetFps);
        // Time.setDeltaTime(delta);

        // Run event items
        // Initialization
        this.berriesAwake();
        this.berriesEnable();
        this.berriesStart();

        // Frame based updates
        this.berriesUpdate();
        this.berriesLateUpdate();

        // Render to the screen
        this.berriesRender();

        // Disable
        this.berriesDisable();
        this.berriesDestroy();

        // Cleanup
        this.berriesLastFame();

        var next = (this.lastLoopTime - nanoSeconds + this.optimalTime) / 1000000;
        setTimeout(this.berryLoop.bind(this), next);
    }

    /**
     * Gets the number of nanoseconds
     *
     * @readonly
     * @private
     * @type {number}
     */
    private get getNanoSeconds(): number {
        // console.log((new Date).getMilliseconds())
        return (new Date()).getTime() * 1000000;
    }

    /**
     * Adds components to an blueberry object during initialization
     *
     * @private
     * @param {BerryObject} berry
     * @param {Element} node
     */
    private addBerryComponents(berry: BerryObject, node: Element): void {
        if (node.hasAttribute('component') || node.hasAttribute('data-component')) {
            var component: string = node.getAttribute('component') || node.getAttribute('data-component') || '';
            component.split(' ').forEach(component => {
                berry.addComponent(component);
            });
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Begin Blueberry messages
    ////////////////////////////////////////////////////////////////////////////

    /**
     * Tells all blueberry components to call their "awake" script.
     * "awake" is only called once for every component upon creation.
     * It should be assumed that no other object has been created at this time
     *
     * @private
     */
    private berriesAwake(): void {
        BerryManager.berries.forEach(berry => {
            if (!berry.hasAwaken) {
                berry.sendMessage('awake');
            }
        });
    }

    /**
     * Tells all blueberry components to call thier "enable" script.
     * "onEnable" is called whenever a component/object gets enabled.
     *
     * @private
     */
    private berriesEnable(): void {
        BerryManager.berries.forEach(berry => {
            if (this.isElementActive(berry.htmlBerry) && !berry.lastFrameEnabled) {
                berry.sendMessage('onEnable');
            }
        });
    }

    /**
     * Tells all blueberry components to call their "start" script.
     * "start" is only called once for every component upon creation.
     * You can assume that all object are availible for use at this point
     *
     * @private
     */
    private berriesStart(): void {
        BerryManager.berries.forEach(berry => {
            if (!berry.hasStarted) {
                berry.sendMessage('start');
            }
        });
    }

    /**
     * Tells all blueberry components to call their "onDisable" script.
     * "onDisable" is called whenever a object/component gets disabled
     *
     * @private
     */
    private berriesDisable(): void {
        BerryManager.berries.forEach(berry => {
            if (berry.shouldDisable || (berry.isEnabled && !this.isElementActive(berry.htmlBerry) && !berry.lastFrameEnabled)) {
                berry.sendMessage('onDisable');
            }
        });
    }

    /**
     * Tells all blueberry components to call their "update" script.
     * "update" gets called every frame on an enabled object/component.
     * We can not assume all "update" calls have been called at this point.
     *
     * @private
     */
    private berriesUpdate(): void {
        BerryManager.berries.forEach(berry => {
            berry.sendMessage('update');
        });
    }

    /**
     * Tells all blueberry components to call their "lateUpdate" script.
     * "lateUpdate" gets called every frame after "update" is called.
     * All "update" calls have been completed at this point.
     *
     * @private
     */
    private berriesLateUpdate(): void {
        BerryManager.berries.forEach(berry => {
            berry.sendMessage('lateUpdate');
        });
    }

    ////////////////////////////////////////////////////////////////////////////
    // End Blueberry messages
    ////////////////////////////////////////////////////////////////////////////

    /**
     * Destroys all blueberry objects marked for destuction.
     * "onDisable" will be triggered prior to destuction.
     *
     * @private
     */
    private berriesDestroy() {
        BerryManager.berries.forEach(berry => {
            if (berry.shouldDestroy) {
                setTimeout(function () {
                    if (berry.htmlBerry.parentElement !== null) {
                        berry.sendMessage('onDisable');
                        berry.sendMessage('onDestroy');
                        BerryManager.removeBerry(berry);
                        berry.htmlBerry.parentElement.removeChild(berry.htmlBerry);
                    }
                }, berry.destroyDelay * 1000);
            }
        });
    }

    /**
     * Updates the DOM and/or styles.
     *
     * @private
     */
    private berriesRender() {
        BerryManager.berries.forEach(berry => {
            if (berry.shouldDisable) {
                berry.htmlBerry.style.display = 'none';
            }
            // else {
            //     berry.getBerry.style.display = 'block';
            // }
        });
    }

    /**
     * Finalization of the frame for using values on the next frame.
     *
     * @private
     */
    private berriesLastFame() {
        BerryManager.berries.forEach(berry => {
            if (berry.shouldDisable) {
                berry.isEnabled = false;
                berry.shouldDisable = false;
            }
            berry.getComponents().forEach(comp => {
                if (!this.isElementActive(berry.htmlBerry)) {
                    berry.lastFrameEnabled = false;
                } else {
                    berry.lastFrameEnabled = true;
                }
                if (berry.shouldDisable) {
                    comp.behavior.isEnabled = false;
                }
            });
        });
    }

    /**
     * Checks if an object is visible using "display" and "visibility"
     *
     * @private
     * @param {HTMLElement} element
     * @returns
     */
    private isElementActive(element: HTMLElement) {
        return (element.style.display != 'none' && element.style.visibility != 'hidden');
    }

    private isElementInViewport(berry: BerryObject) {
        var rect: ClientRect = berry.htmlBerry.getBoundingClientRect();
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    }

}