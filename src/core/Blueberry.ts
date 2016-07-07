import { BerryBehavior } from './BerryBehavior'
import { Berry } from './Berry'
import { BerryObject } from './BerryObject'
import { BerryManager } from './managers/BerryManager'

export class Blueberry extends BerryBehavior {

    protected loadSequence: Function[] = [];

    public constructor() {
        super();
        this.init();
        let $this = this;
        window.onload = function () {
            $this.loadSequence.forEach(callback => {
                callback();
            });
        }
    }

    protected init() {
        let $this = this;
        this.load(() => {
            let nodes: NodeListOf<HTMLElement> = document.querySelectorAll('[blueberry],[data-blueberry]') as NodeListOf<HTMLElement>;
            let berryObjects: BerryObject[] = [];
            for (let i = 0; i < nodes.length; i++) {
                let node = nodes.item(i);
                if (node.hasAttribute('blueberry') || node.hasAttribute('data-blueberry')) {
                    let berryObject = new BerryObject(node);
                    berryObject.name = node.getAttribute('blueberry') || node.getAttribute('data-blueberry') || '';
                    berryObject.tag = node.getAttribute('tag') || node.getAttribute('data-tag') || '';
                    this.setBerryClickHandler(berryObject, node);
                    this.addBerryComponents(berryObject, node);
                    berryObjects.push(berryObject);
                }
            }
            BerryManager.setBerries(berryObjects);
            this.berryLoop();
        });
    }

    private lastLoopTime = (new Date()).getMilliseconds() * 1000;
    private targetFps = 60;
    private optimalTime = 1000000000 / this.targetFps;
    private lastFpsTime = 0;

    private berryLoop() {
        var now = this.getNanoSeconds;
        var updateLength = now - this.lastLoopTime;
        this.lastLoopTime = now;
        var delta = updateLength / this.optimalTime;

        this.lastFpsTime += updateLength;
        if (this.lastFpsTime >= 1000000000) {
            this.lastFpsTime = 0;
        }

        this.berriesSetDelta(delta);

        // Run Event list
        // Initialization
        this.berriesAwake();
        this.berriesEnable();
        this.berriesStart();

        // Logic
        this.berriesUpdate();
        this.berriesLateUpdate();

        this.berriesRender();

        // Disable
        this.berriesDisable();
        this.berriesDestroy();

        this.berriesLastFame();

        var next = (this.lastLoopTime - this.getNanoSeconds + this.optimalTime) / 1000000;
        setTimeout(this.berryLoop.bind(this), next);
    }

    private get getNanoSeconds(): number {
        return (new Date()).getMilliseconds() * 1000
    }

    private setBerryClickHandler(berry: BerryObject, node: Element): void {
        node.addEventListener('click', e => {
            berry.getComponents().forEach(comp => {
                comp.berryObject.sendMessage('click');
                // if (typeof comp.behavior.click == 'function') {
                //     e.preventDefault();
                //     comp.behavior.click();
                // }
            });
        });
    }

    private addBerryComponents(berry: BerryObject, node: Element): void {
        if (node.hasAttribute('component') || node.hasAttribute('data-component')) {
            var component: string = node.getAttribute('component') || node.getAttribute('data-component') || '';
            component.split(' ').forEach(component => {
                berry.addComponent(component);
            });
        }
    }

    private berriesSetDelta(delta: number): void {
        BerryManager.berries.forEach(berry => {
            berry.getComponents().forEach(comp => {
                comp.behavior.setDeltaTime(delta);
            });
        });
    }

    private berriesAwake(): void {
        BerryManager.berries.forEach(berry => {
            if (!berry.hasAwaken) {
                berry.sendMessage('awake');
                berry.hasAwaken = true;
            }
        });
    }

    private berriesEnable(): void {
        BerryManager.berries.forEach(berry => {
            if (!berry.isEnabled && this.isVisible(berry.htmlBerry) && !berry.lastFrameEnabled) {
                berry.sendMessage('onEnable');
                berry.isEnabled = true;
            }
        });
    }

    private berriesStart(): void {
        BerryManager.berries.forEach(berry => {
            if (!berry.hasStarted) {
                berry.sendMessage('start');
                berry.hasStarted = true;
            }
        });
    }

    private berriesDisable(): void {
        BerryManager.berries.forEach(berry => {
            if (berry.shouldDisable || (berry.isEnabled && !this.isVisible(berry.htmlBerry) && !berry.lastFrameEnabled)) {
                berry.sendMessage('onDisable');
            }
        });
    }

    private berriesDestroy() {
        BerryManager.berries.forEach(berry => {
            if (berry.shouldDestroy) {
                setTimeout(function () {
                    if (berry.htmlBerry.parentElement !== null) {
                        berry.sendMessage('onDisable');
                        BerryManager.removeBerry(berry);
                        berry.htmlBerry.parentElement.removeChild(berry.htmlBerry);
                    }
                }, berry.destroyDelay * 1000);
            }
        });
    }

    private berriesUpdate(): void {
        BerryManager.berries.forEach(berry => {
            if (berry.isEnabled) {
                berry.sendMessage('update');
            }
        });
    }

    private berriesLateUpdate(): void {
        BerryManager.berries.forEach(berry => {
            if (berry.isEnabled) {
                berry.sendMessage('lateUpdate');
            }
        });
    }

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

    private berriesLastFame() {
        BerryManager.berries.forEach(berry => {
            if (berry.shouldDisable) {
                berry.isEnabled = false;
                berry.shouldDisable = false;
            }
            berry.getComponents().forEach(comp => {
                if (!this.isVisible(berry.htmlBerry)) {
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

    private isVisible(element: HTMLElement) {
        return (element.style.display != 'none' && element.style.visibility != 'hidden');
    }

    public load(callback: Function) {
        this.loadSequence.push(callback);
    }

}