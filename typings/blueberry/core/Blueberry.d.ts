import { BerryBehavior } from './BerryBehavior';
export declare class Blueberry extends BerryBehavior {
    protected loadSequence: Function[];
    private lastLoopTime;
    private targetFps;
    private optimalTime;
    private lastFpsTime;
    private startTime;
    /**
     * Creates an instance of Blueberry.
     *
     */
    constructor();
    /**
     * Initialization of the blueberry framework
     *
     * @protected
     */
    protected init(): void;
    /**
     * The main loop that controls the flow of blueberry
     *
     * @private
     */
    private berryLoop();
    /**
     * Gets the number of nanoseconds
     *
     * @readonly
     * @private
     * @type {number}
     */
    private getNanoSeconds;
    /**
     * Adds components to an blueberry object during initialization
     *
     * @private
     * @param {BerryObject} berry
     * @param {Element} node
     */
    private addBerryComponents(berry, node);
    /**
     * Tells all blueberry components to call their "awake" script.
     * "awake" is only called once for every component upon creation.
     * It should be assumed that no other object has been created at this time
     *
     * @private
     */
    private berriesAwake();
    /**
     * Tells all blueberry components to call thier "enable" script.
     * "onEnable" is called whenever a component/object gets enabled.
     *
     * @private
     */
    private berriesEnable();
    /**
     * Tells all blueberry components to call their "start" script.
     * "start" is only called once for every component upon creation.
     * You can assume that all object are availible for use at this point
     *
     * @private
     */
    private berriesStart();
    /**
     * Tells all blueberry components to call their "onDisable" script.
     * "onDisable" is called whenever a object/component gets disabled
     *
     * @private
     */
    private berriesDisable();
    /**
     * Tells all blueberry components to call their "update" script.
     * "update" gets called every frame on an enabled object/component.
     * We can not assume all "update" calls have been called at this point.
     *
     * @private
     */
    private berriesUpdate();
    /**
     * Tells all blueberry components to call their "lateUpdate" script.
     * "lateUpdate" gets called every frame after "update" is called.
     * All "update" calls have been completed at this point.
     *
     * @private
     */
    private berriesLateUpdate();
    /**
     * Destroys all blueberry objects marked for destuction.
     * "onDisable" will be triggered prior to destuction.
     *
     * @private
     */
    private berriesDestroy();
    /**
     * Updates the DOM and/or styles.
     *
     * @private
     */
    private berriesRender();
    /**
     * Finalization of the frame for using values on the next frame.
     *
     * @private
     */
    private berriesLastFame();
    /**
     * Checks if an object is visible using "display" and "visibility"
     *
     * @private
     * @param {HTMLElement} element
     * @returns
     */
    private isElementActive(element);
    private isElementInViewport(berry);
}
