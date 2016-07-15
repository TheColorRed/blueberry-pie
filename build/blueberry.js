(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
const Vector_1 = require('../utils/Vector');
const Color_1 = require('../utils/Color/Color');
const Time_1 = require('../utils/Time');
const TweenFx_1 = require('../utils/TweenFx');
const BerryBehavior_1 = require('../core/BerryBehavior');
(function (EaseType) {
    EaseType[EaseType["EaseInBounce"] = 0] = "EaseInBounce";
    EaseType[EaseType["EaseOutBounce"] = 1] = "EaseOutBounce";
    EaseType[EaseType["EaseInOutBounce"] = 2] = "EaseInOutBounce";
    EaseType[EaseType["EaseInBack"] = 3] = "EaseInBack";
    EaseType[EaseType["EaseOutBack"] = 4] = "EaseOutBack";
    EaseType[EaseType["EaseInOutBack"] = 5] = "EaseInOutBack";
    EaseType[EaseType["EaseInElastic"] = 6] = "EaseInElastic";
    EaseType[EaseType["EaseOutElastic"] = 7] = "EaseOutElastic";
    EaseType[EaseType["EaseInOutElastic"] = 8] = "EaseInOutElastic";
    EaseType[EaseType["EaseInCirc"] = 9] = "EaseInCirc";
    EaseType[EaseType["EaseOutCirc"] = 10] = "EaseOutCirc";
    EaseType[EaseType["EaseInOutCirc"] = 11] = "EaseInOutCirc";
    EaseType[EaseType["EaseInExpo"] = 12] = "EaseInExpo";
    EaseType[EaseType["EaseOutExpo"] = 13] = "EaseOutExpo";
    EaseType[EaseType["EaseInOutExpo"] = 14] = "EaseInOutExpo";
    EaseType[EaseType["EaseInSine"] = 15] = "EaseInSine";
    EaseType[EaseType["EaseOutSine"] = 16] = "EaseOutSine";
    EaseType[EaseType["EaseInOutSine"] = 17] = "EaseInOutSine";
    EaseType[EaseType["EaseInQuint"] = 18] = "EaseInQuint";
    EaseType[EaseType["EaseOutQuint"] = 19] = "EaseOutQuint";
    EaseType[EaseType["EaseInOutQuint"] = 20] = "EaseInOutQuint";
    EaseType[EaseType["EaseInQuart"] = 21] = "EaseInQuart";
    EaseType[EaseType["EaseOutQuart"] = 22] = "EaseOutQuart";
    EaseType[EaseType["EaseInOutQuart"] = 23] = "EaseInOutQuart";
    EaseType[EaseType["EaseInQuad"] = 24] = "EaseInQuad";
    EaseType[EaseType["EaseOutQuad"] = 25] = "EaseOutQuad";
    EaseType[EaseType["EaseInOutQuad"] = 26] = "EaseInOutQuad";
    EaseType[EaseType["EaseInCubic"] = 27] = "EaseInCubic";
    EaseType[EaseType["EaseOutCubic"] = 28] = "EaseOutCubic";
    EaseType[EaseType["EaseInOutCubic"] = 29] = "EaseInOutCubic";
    EaseType[EaseType["Clerp"] = 30] = "Clerp";
    EaseType[EaseType["Spring"] = 31] = "Spring";
    EaseType[EaseType["Linear"] = 32] = "Linear";
})(exports.EaseType || (exports.EaseType = {}));
var EaseType = exports.EaseType;
(function (LoopType) {
    LoopType[LoopType["None"] = 0] = "None";
    LoopType[LoopType["Repeat"] = 1] = "Repeat";
    LoopType[LoopType["PingPong"] = 2] = "PingPong";
})(exports.LoopType || (exports.LoopType = {}));
var LoopType = exports.LoopType;
class TweenSettings {
}
exports.TweenSettings = TweenSettings;
(function (TweenType) {
    TweenType[TweenType["Move"] = 0] = "Move";
    TweenType[TweenType["Scale"] = 1] = "Scale";
    TweenType[TweenType["Color"] = 2] = "Color";
})(exports.TweenType || (exports.TweenType = {}));
var TweenType = exports.TweenType;
class Tween extends BerryBehavior_1.BerryBehavior {
    constructor(...args) {
        super(...args);
        this.isRunning = false;
        this.percentage = 0;
        this.runningTime = 0;
        this.completed = false;
        this.started = false;
        this.reverse = false;
        this.time = 0;
    }
    awake() {
        this.duration = this.settings.duration || 2;
        this.easeType = this.settings.easeType || EaseType.Linear;
        this.loopType = this.settings.loopType || LoopType.None;
        this.units = this.settings.units || 'px';
        if (this.tweenType == TweenType.Scale) {
            this.endVector = this.settings.endScale || Vector_1.Vector2.one;
        }
        else if (this.tweenType == TweenType.Move) {
            this.endVector = this.settings.endPosition || Vector_1.Vector2.one;
        }
        this.berryObject.css('position', 'absolute');
        this.isRunning = true;
    }
    update() {
        if (this.isRunning) {
            if (!this.reverse) {
                if (this.percentage < 1) {
                    this.tweenUpdate();
                }
                else {
                    this.tweenComplete();
                }
            }
            else {
                if (this.percentage > 0) {
                    this.tweenUpdate();
                }
                else {
                    this.tweenComplete();
                }
            }
        }
    }
    tweenUpdate() {
        switch (this.tweenType) {
            case TweenType.Move:
                this.moveTarget();
                break;
            case TweenType.Scale:
                this.scaleTarget();
                break;
            case TweenType.Color:
                this.colorTarget();
                break;
        }
        this.updatePercentage();
    }
    tweenComplete() {
        this.isRunning = false;
        if (this.loopType == LoopType.None) {
        }
        else {
            switch (this.loopType) {
                case LoopType.Repeat:
                    this.percentage = 0;
                    this.runningTime = 0;
                    this.time = 0;
                    this.isRunning = true;
                    this.berryObject.css('left', this.initPosition.x + this.units);
                    this.berryObject.css('top', this.initPosition.y + this.units);
                    break;
                case LoopType.PingPong:
                    this.reverse = !this.reverse;
                    this.runningTime = 0;
                    this.isRunning = true;
            }
        }
    }
    updatePercentage() {
        this.runningTime += Time_1.Time.deltaTime;
        if (this.reverse) {
            this.percentage = 1 - this.runningTime / this.duration;
            this.time -= Time_1.Time.deltaTime / this.duration;
        }
        else {
            this.percentage = this.runningTime / this.duration;
            this.time += Time_1.Time.deltaTime / this.duration;
        }
    }
    finalFrame() {
        switch (this.tweenType) {
            case TweenType.Scale:
                this.berryObject.css('width', this.endVector.x + this.units).css('height', this.endVector.y + this.units);
                break;
            case TweenType.Move:
                this.berryObject.css('left', this.endVector.x + this.units).css('top', this.endVector.y + this.units);
                break;
        }
    }
    moveTarget() {
        var start = this.settings.startPosition || Vector_1.Vector2.zero;
        var end = this.settings.endPosition || Vector_1.Vector2.zero;
        this.berryObject
            .css('left', TweenFx_1.TweenFx.animate(this.initPosition.x, end.x, this.time, this.easeType) + this.units)
            .css('top', TweenFx_1.TweenFx.animate(this.initPosition.y, end.y, this.time, this.easeType) + this.units);
    }
    scaleTarget() {
        var end = this.settings.endScale || Vector_1.Vector2.one;
        this.berryObject
            .css('width', TweenFx_1.TweenFx.animate(this.initScale.x, end.x, this.time, this.easeType) + this.units)
            .css('height', TweenFx_1.TweenFx.animate(this.initScale.y, end.y, this.time, this.easeType) + this.units);
    }
    colorTarget() {
        var end = this.settings.endColor || Color_1.Color.white;
        var color = new Color_1.Color(Math.round(TweenFx_1.TweenFx.animate(this.initColor.r, end.r, this.time, this.easeType)), Math.round(TweenFx_1.TweenFx.animate(this.initColor.g, end.g, this.time, this.easeType)), Math.round(TweenFx_1.TweenFx.animate(this.initColor.b, end.b, this.time, this.easeType)));
        this.berryObject.css('background-color', '#' + color.hex());
    }
    static init(settings) {
        var comp = settings.target.addComponent('Tween');
        comp.settings = settings;
        return comp;
    }
    static moveTo(settings) {
        var comp = Tween.init(settings);
        comp.tweenType = TweenType.Move;
        comp.initPosition = settings.target.localPosition;
    }
    static scaleTo(settings) {
        var comp = Tween.init(settings);
        comp.tweenType = TweenType.Scale;
        comp.initScale = settings.target.localScale;
    }
    static colorTo(settings) {
        var comp = Tween.init(settings);
        comp.tweenType = TweenType.Color;
        console.log(comp.berryObject.backgroundColor);
        comp.initColor = comp.berryObject.backgroundColor;
    }
}
exports.Tween = Tween;

},{"../core/BerryBehavior":3,"../utils/Color/Color":11,"../utils/Time":15,"../utils/TweenFx":16,"../utils/Vector":17}],2:[function(require,module,exports){
"use strict";
const Item_1 = require('./Item');
class Berry extends Item_1.Item {
}
exports.Berry = Berry;

},{"./Item":8}],3:[function(require,module,exports){
"use strict";
const Component_1 = require('./Component');
const BerryManager_1 = require('./managers/BerryManager');
class BerryBehavior extends Component_1.Component {
    constructor(...args) {
        super(...args);
        this._becameEnabled = false;
        this.isEnabled = false;
        this.lastFrameEnabled = false;
    }
    get becameEnabled() {
        return this._becameEnabled;
    }
    each(callback) {
        BerryManager_1.BerryManager.berries.forEach(berry => {
            callback(berry);
        });
        return this;
    }
}
exports.BerryBehavior = BerryBehavior;

},{"./Component":7,"./managers/BerryManager":9}],4:[function(require,module,exports){
"use strict";
const BerryManager_1 = require('./managers/BerryManager');
class BerryGroup {
    constructor() {
        this.berries = [];
    }
    add(berry) {
        this.berries.push(berry);
        BerryManager_1.BerryManager.addBerry(berry);
        return this;
    }
    name(value) {
        this.setAttribute('blueberry', value);
        this.berries.forEach(berry => {
            berry.name = value;
        });
        return this;
    }
    tag(value) {
        this.setAttribute('tag', value);
        this.berries.forEach(berry => {
            berry.tag = value;
        });
        return this;
    }
    addComponent(value, options) {
        this.berries.forEach(berry => {
            berry.addComponent(value, options);
        });
        return this;
    }
    setAttribute(key, value) {
        this.berries.forEach(berry => {
            berry.htmlBerry.setAttribute(key, value);
        });
    }
}
exports.BerryGroup = BerryGroup;

},{"./managers/BerryManager":9}],5:[function(require,module,exports){
"use strict";
const BerryBehavior_1 = require('./BerryBehavior');
const Item_1 = require('./Item');
const BerryManager_1 = require('./managers/BerryManager');
const BerryGroup_1 = require('./BerryGroup');
const Settings_1 = require('../utils/Settings');
const Color_1 = require('../utils/Color/Color');
class BerryObject extends Item_1.Item {
    constructor(berry) {
        super();
        this.berry = berry;
    }
    static destroy(item, delay = 0) {
        Item_1.Item.destroy(item, delay);
    }
    static find(selector) {
        let nodes = document.querySelectorAll(selector);
        let berries = [];
        for (let i = 0; i < nodes.length; i++) {
            let node = nodes.item(i);
            if (node.hasAttribute('blueberry')) {
                for (let j = 0; j < BerryManager_1.BerryManager.berries.length; j++) {
                    let berry = BerryManager_1.BerryManager.berries[j];
                    if (node == berry.berry) {
                        berries.push(berry);
                    }
                }
            }
        }
        return berries;
    }
    static findObjectsWithName(name) {
        let objs = [];
        for (var i in BerryManager_1.BerryManager.berries) {
            if (BerryManager_1.BerryManager.berries[i].name == name) {
                objs.push(BerryManager_1.BerryManager.berries[i]);
            }
        }
        return objs;
    }
    static findObjectsWithTag(tag) {
        let objs = [];
        for (var i in BerryManager_1.BerryManager.berries) {
            if (BerryManager_1.BerryManager.berries[i].tag == tag) {
                objs.push(BerryManager_1.BerryManager.berries[i]);
            }
        }
        return objs;
    }
    static findWithName(name) {
        for (var i in BerryManager_1.BerryManager.berries) {
            if (BerryManager_1.BerryManager.berries[i].name == name) {
                return BerryManager_1.BerryManager.berries[i];
            }
        }
        return null;
    }
    static convert(selector) {
        let nodes = document.querySelectorAll(selector);
        let berryGroup = new BerryGroup_1.BerryGroup();
        for (let i = 0; i < nodes.length; i++) {
            let node = nodes.item(i);
            if (!node.hasAttribute('blueberry') && !node.hasAttribute('data-blueberry')) {
                let berryObject = new BerryObject(node);
                node.setAttribute('blueberry', 'BerryObject');
                berryGroup.add(berryObject);
            }
        }
        return berryGroup;
    }
    static instantiate(object) {
        let berry;
        if (object instanceof BerryObject) {
            let node = document.createElement(object.htmlBerry.tagName);
            berry = new BerryObject(node);
        }
        else {
            let node;
            if ('template' in object) {
                var template = document.createElement('template');
                template.innerHTML = object.template;
                node = template.content.firstChild;
                BerryObject.addTemplateBerries(node);
            }
            else {
                node = document.createElement(object.tagName);
            }
            node.setAttribute('blueberry', 'BerryObject');
            berry = new BerryObject(node);
            if ('name' in object) {
                berry.name = object.name;
            }
            if ('tag' in object) {
                berry.tag = object.tag;
            }
        }
        return berry;
    }
    static addTemplateBerries(baseNode) {
        if (baseNode.hasAttribute('blueberry') || baseNode.hasAttribute('data-blueberry')) {
            BerryObject.addBerry(baseNode);
        }
        var nodes = baseNode.querySelectorAll('[blueberry],[data-blueberry]');
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes.item(i);
            BerryObject.addBerry(node);
        }
    }
    static addBerry(node) {
        var berry = new BerryObject(node);
        if (node.hasAttribute('components') || node.hasAttribute('data-components')) {
            var component = node.getAttribute('components') || node.getAttribute('data-components') || '';
            component.split(' ').forEach(component => {
                berry.addComponent(component);
            });
        }
        berry.name = node.getAttribute('blueberry') || node.getAttribute('data-blueberry') || '';
        berry.tag = node.getAttribute('tag') || node.getAttribute('data-tag') || '';
        BerryManager_1.BerryManager.berries.push(berry);
    }
    static findWithTag(tag) {
        for (var i in BerryManager_1.BerryManager.berries) {
            if (BerryManager_1.BerryManager.berries[i].tag == tag) {
                return BerryManager_1.BerryManager.berries[i];
            }
        }
        return null;
    }
    addComponent(component, options) {
        let comp;
        if (component in window) {
            comp = new window[component]();
        }
        else {
            comp = new BerryBehavior_1.BerryBehavior();
        }
        comp.options = options;
        comp.name = component;
        comp.setBerryObject(this);
        comp.behavior = comp;
        comp.isVisible = this.isVisible;
        comp.isEnabled = this.isEnabled;
        this.components.push(comp);
        return comp;
    }
    getComponent(component) {
        for (var i in this.components) {
            var comp = this.components[i];
            if (component == comp.name) {
                return comp;
            }
        }
        return null;
    }
    setActive(value) {
        this.shouldDisable = !value;
    }
    append() {
        for (var i = 0; i < arguments.length; i++) {
            this.htmlBerry.appendChild(arguments[i].htmlBerry);
        }
    }
    sendMessage(message, options) {
        if (!this.isEnabled) {
            return;
        }
        this.components.forEach(comp => {
            if ((comp.hasAwaken && message == 'awake') || (comp.hasStarted && message == 'start') || !comp.isEnabled) {
                return;
            }
            if (!comp.hasAwaken && !comp.hasStarted && (message == 'update' || message == 'lateUpdate')) {
                return;
            }
            if (typeof comp.behavior[message] == 'function' && comp.isEnabled) {
                if (message == 'click') {
                    options.event.preventDefault();
                }
                if (message == 'keyup' || message == 'keydown' || message == 'keypress' || message == 'change') {
                    comp.behavior[message](options.event);
                }
                else {
                    comp.behavior[message](options);
                }
            }
            if (message == 'awake') {
                comp.hasAwaken = true;
            }
            if (message == 'start') {
                comp.hasStarted = true;
            }
            if (message == 'onEnable') {
                comp.behavior.isEnabled = true;
                this.isEnabled = true;
            }
            if (message == 'onDisable') {
                comp.behavior.isEnabled = false;
                this.isEnabled = false;
            }
        });
    }
    css(property, value = null) {
        if (typeof value == 'number') {
            value = value + Settings_1.Settings.units;
        }
        else if (value instanceof Color_1.Color) {
            value = '#' + value.hex();
        }
        if (value != null) {
            this.htmlBerry.style[property] = value;
        }
        else {
            return this.htmlBerry.style[property];
        }
        return this;
    }
    addClass(name) {
        if (typeof name == 'object') {
            name.forEach(n => {
                this.htmlBerry.classList.add(n);
            });
        }
        else {
            this.htmlBerry.classList.add(name);
        }
        return this;
    }
    removeClass(name) {
        if (typeof name == 'object') {
            name.forEach(n => {
                this.htmlBerry.classList.remove(n);
            });
        }
        else {
            this.htmlBerry.classList.remove(name);
        }
        return this;
    }
    html(html) {
        this.htmlBerry.innerHTML = html;
        return this;
    }
    text(text) {
        this.htmlBerry.innerText = text;
        return this;
    }
}
exports.BerryObject = BerryObject;

},{"../utils/Color/Color":11,"../utils/Settings":14,"./BerryBehavior":3,"./BerryGroup":4,"./Item":8,"./managers/BerryManager":9}],6:[function(require,module,exports){
"use strict";
const BerryBehavior_1 = require('./BerryBehavior');
const BerryObject_1 = require('./BerryObject');
const BerryManager_1 = require('./managers/BerryManager');
const Time_1 = require('../utils/Time');
const Settings_1 = require('../utils/Settings');
class Blueberry extends BerryBehavior_1.BerryBehavior {
    constructor() {
        super();
        this.loadSequence = [];
        this.lastLoopTime = this.getNanoSeconds;
        this.targetFps = Settings_1.Settings.fps;
        this.optimalTime = 1000000000 / this.targetFps;
        this.lastFpsTime = 0;
        this.startTime = 0;
        this.init();
        let $this = this;
        window.onload = function () {
            $this.loadSequence.forEach(callback => {
                callback();
            });
        };
        window.onscroll = window.onresize = function () {
            BerryManager_1.BerryManager.berries.forEach(berry => {
                if (!berry.isEnabled) {
                    return;
                }
                var isVisible = $this.isElementInViewport(berry);
                if (berry.isVisible != isVisible && isVisible) {
                    berry.sendMessage('onEnterViewport');
                    berry.isVisible = true;
                }
                else if (berry.isVisible != isVisible && !isVisible) {
                    berry.sendMessage('onExitViewport');
                    berry.isVisible = false;
                }
            });
        };
    }
    init() {
        let $this = this;
        this.loadSequence.push(() => {
            let nodes = document.querySelectorAll('[blueberry],[data-blueberry]');
            let berryObjects = [];
            for (let i = 0; i < nodes.length; i++) {
                let node = nodes.item(i);
                let berryObject = new BerryObject_1.BerryObject(node);
                berryObject.name = node.getAttribute('blueberry') || node.getAttribute('data-blueberry') || '';
                berryObject.tag = node.getAttribute('tag') || node.getAttribute('data-tag') || '';
                node.addEventListener('click', e => {
                    berryObject.sendMessage('click', { event: e });
                });
                node.addEventListener('keyup', e => {
                    berryObject.sendMessage('keyup', { event: e });
                });
                node.addEventListener('keydown', e => {
                    berryObject.sendMessage('keydown', { event: e });
                });
                node.addEventListener('keypress', e => {
                    berryObject.sendMessage('keypress', { event: e });
                });
                node.addEventListener('change', e => {
                    berryObject.sendMessage('change', { event: e });
                });
                berryObject.isVisible = $this.isElementInViewport(berryObject);
                $this.addBerryComponents(berryObject, node);
                berryObjects.push(berryObject);
            }
            BerryManager_1.BerryManager.setBerries(berryObjects);
            $this.startTime = (new Date()).getTime();
            $this.berryLoop();
        });
    }
    berryLoop() {
        Time_1.Time.setFrameTime(((new Date).getTime() - this.startTime) / 1000);
        var nanoSeconds = this.getNanoSeconds;
        var now = nanoSeconds;
        var updateLength = now - this.lastLoopTime;
        this.lastLoopTime = now;
        var delta = updateLength / this.optimalTime;
        this.lastFpsTime += updateLength;
        if (this.lastFpsTime >= 1000000000) {
            this.lastFpsTime = 0;
        }
        Time_1.Time.setDeltaTime(delta / this.targetFps);
        this.berriesAwake();
        this.berriesEnable();
        this.berriesStart();
        this.berriesUpdate();
        this.berriesLateUpdate();
        this.berriesRender();
        this.berriesDisable();
        this.berriesDestroy();
        this.berriesLastFame();
        var next = (this.lastLoopTime - nanoSeconds + this.optimalTime) / 1000000;
        setTimeout(this.berryLoop.bind(this), next);
    }
    get getNanoSeconds() {
        return (new Date()).getTime() * 1000000;
    }
    addBerryComponents(berry, node) {
        if (node.hasAttribute('components') || node.hasAttribute('data-components')) {
            var component = node.getAttribute('components') || node.getAttribute('data-components') || '';
            component.split(' ').forEach(component => {
                berry.addComponent(component);
            });
        }
    }
    berriesAwake() {
        BerryManager_1.BerryManager.berries.forEach(berry => {
            berry.sendMessage('awake');
        });
    }
    berriesEnable() {
        BerryManager_1.BerryManager.berries.forEach(berry => {
            if (this.isElementActive(berry.htmlBerry) && !berry.lastFrameEnabled) {
                berry.sendMessage('onEnable');
            }
        });
    }
    berriesStart() {
        BerryManager_1.BerryManager.berries.forEach(berry => {
            berry.sendMessage('start');
        });
    }
    berriesDisable() {
        BerryManager_1.BerryManager.berries.forEach(berry => {
            if (berry.shouldDisable || (berry.isEnabled && !this.isElementActive(berry.htmlBerry) && !berry.lastFrameEnabled)) {
                berry.sendMessage('onDisable');
            }
        });
    }
    berriesUpdate() {
        BerryManager_1.BerryManager.berries.forEach(berry => {
            berry.sendMessage('update');
        });
    }
    berriesLateUpdate() {
        BerryManager_1.BerryManager.berries.forEach(berry => {
            berry.sendMessage('lateUpdate');
        });
    }
    berriesDestroy() {
        BerryManager_1.BerryManager.berries.forEach(berry => {
            if (berry.shouldDestroy) {
                setTimeout(function () {
                    if (berry.htmlBerry.parentElement !== null) {
                        berry.sendMessage('onDisable');
                        berry.sendMessage('onDestroy');
                        BerryManager_1.BerryManager.removeBerry(berry);
                        berry.htmlBerry.parentElement.removeChild(berry.htmlBerry);
                    }
                }, berry.destroyDelay * 1000);
            }
        });
    }
    berriesRender() {
        BerryManager_1.BerryManager.berries.forEach(berry => {
            if (berry.shouldDisable) {
                berry.htmlBerry.style.display = 'none';
            }
        });
    }
    berriesLastFame() {
        BerryManager_1.BerryManager.berries.forEach(berry => {
            if (berry.shouldDisable) {
                berry.isEnabled = false;
                berry.shouldDisable = false;
            }
            berry.getComponents().forEach(comp => {
                if (!this.isElementActive(berry.htmlBerry)) {
                    berry.lastFrameEnabled = false;
                }
                else {
                    berry.lastFrameEnabled = true;
                }
                if (berry.shouldDisable) {
                    comp.behavior.isEnabled = false;
                }
            });
        });
    }
    isElementActive(element) {
        return (element.style.display != 'none' && element.style.visibility != 'hidden');
    }
    isElementInViewport(berry) {
        var rect = berry.htmlBerry.getBoundingClientRect();
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    }
}
exports.Blueberry = Blueberry;

},{"../utils/Settings":14,"../utils/Time":15,"./BerryBehavior":3,"./BerryObject":5,"./managers/BerryManager":9}],7:[function(require,module,exports){
"use strict";
const Berry_1 = require('./Berry');
class Component extends Berry_1.Berry {
    constructor(componentName) {
        super();
        this.hasStarted = false;
        this.hasAwaken = false;
        this.componentName = componentName;
    }
}
exports.Component = Component;

},{"./Berry":2}],8:[function(require,module,exports){
"use strict";
const Vector_1 = require('../utils/Vector');
const Color_1 = require('../utils/Color/Color');
class Item {
    constructor() {
        this.name = '';
        this.tag = '';
        this.components = [];
        this.isEnabled = true;
        this.shouldDisable = false;
        this.shouldEnable = false;
        this.lastFrameEnabled = false;
        this.isVisible = false;
        this.shouldDestroy = false;
        this.destroyDelay = 0;
    }
    get berryObject() {
        return this._berryObject;
    }
    setBerry(berry) {
        this.berry = berry;
    }
    get htmlBerry() {
        return this.berry;
    }
    setBerryObject(berryObject) {
        this._berryObject = berryObject;
    }
    getComponents() {
        return this.components;
    }
    get localPosition() {
        var rect = this.clientRect();
        return new Vector_1.Vector2(rect.left, rect.top);
    }
    get localScale() {
        var rect = this.clientRect();
        return new Vector_1.Vector2(rect.width, rect.height);
    }
    get backgroundColor() {
        var element;
        try {
            element = this.htmlBerry;
        }
        catch (e) {
            element = this.berryObject.htmlBerry;
        }
        var color = window.getComputedStyle(element).backgroundColor;
        var c = color.replace(/[a-z \(\)]/g, '').split(',');
        return new Color_1.Color(parseInt(c[0]), parseInt(c[1]), parseInt(c[2]));
    }
    static destroy(item, delay = 0) {
        item.shouldDestroy = true;
        item.destroyDelay = delay;
    }
    clientRect() {
        var rect;
        try {
            rect = this.htmlBerry.getBoundingClientRect();
        }
        catch (e) {
            rect = this.berryObject.htmlBerry.getBoundingClientRect();
        }
        return rect;
    }
}
exports.Item = Item;

},{"../utils/Color/Color":11,"../utils/Vector":17}],9:[function(require,module,exports){
"use strict";
class BerryManager {
    static get berries() {
        return BerryManager._berries;
    }
    static setBerries(berries) {
        BerryManager._berries = berries;
    }
    static addBerry(berry) {
        BerryManager._berries.push(berry);
    }
    static removeBerry(berry) {
        var idx = BerryManager._berries.indexOf(berry);
        if (idx > -1) {
            BerryManager._berries.splice(idx, 1);
        }
    }
}
BerryManager._berries = [];
exports.BerryManager = BerryManager;

},{}],10:[function(require,module,exports){
"use strict";
const Blueberry_1 = require('./core/Blueberry');
const BerryObject_1 = require('./core/BerryObject');
const BerryBehavior_1 = require('./core/BerryBehavior');
const Tween_1 = require('./components/Tween');
const Settings_1 = require('./utils/Settings');
const Time_1 = require('./utils/Time');
const Mathf_1 = require('./utils/Mathf');
const Watcher_1 = require('./utils/Watcher');
const When_1 = require('./utils/When');
const Vector_1 = require('./utils/Vector');
const Color_1 = require('./utils/Color/Color');
const ColorBlend_1 = require('./utils/Color/ColorBlend');
window.blueberry = new Blueberry_1.Blueberry();
window.watch = Watcher_1.watch;
window.when = When_1.when;
window.BerryObject = BerryObject_1.BerryObject;
window.Settings = Settings_1.Settings;
window.Vector2 = Vector_1.Vector2;
window.Color = Color_1.Color;
window.Color.BlendType = ColorBlend_1.BlendType;
window.BerryBehavior = BerryBehavior_1.BerryBehavior;
window.Time = Time_1.Time;
window.Mathf = Mathf_1.Mathf;
window.Tween = Tween_1.Tween;
window.Tween.Easing = Tween_1.EaseType;
window.Tween.Looping = Tween_1.LoopType;

},{"./components/Tween":1,"./core/BerryBehavior":3,"./core/BerryObject":5,"./core/Blueberry":6,"./utils/Color/Color":11,"./utils/Color/ColorBlend":12,"./utils/Mathf":13,"./utils/Settings":14,"./utils/Time":15,"./utils/Vector":17,"./utils/Watcher":18,"./utils/When":19}],11:[function(require,module,exports){
"use strict";
const ColorBlend_1 = require('./ColorBlend');
class Color {
    constructor(r, g, b, a = 255) {
        if (typeof r == 'string') {
            var c = Color.rgb(r);
            this.r = c.r;
            this.g = c.g;
            this.b = c.b;
            this.a = c.a;
        }
        else {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
    }
    hex() {
        var hexr = this.r.toString(16);
        var hexg = this.g.toString(16);
        var hexb = this.b.toString(16);
        var r = hexr.length == 1 ? "0" + hexr : hexr;
        var g = hexg.length == 1 ? "0" + hexg : hexg;
        var b = hexb.length == 1 ? "0" + hexb : hexb;
        return r + g + b;
    }
    static rgb(hex) {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return new Color(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16));
    }
    blend(color, blendType) {
        return Color.blend(this, color, blendType);
    }
    static blend(color1, color2, blendType) {
        var r, g, b, a;
        switch (blendType) {
            case ColorBlend_1.BlendType.Normal:
                r = ColorBlend_1.ColorBlend.normal(color1.r, color2.r);
                g = ColorBlend_1.ColorBlend.normal(color1.g, color2.g);
                b = ColorBlend_1.ColorBlend.normal(color1.b, color2.b);
                a = ColorBlend_1.ColorBlend.normal(color1.a, color2.a);
                break;
            case ColorBlend_1.BlendType.Lighten:
                r = ColorBlend_1.ColorBlend.lighten(color1.r, color2.r);
                g = ColorBlend_1.ColorBlend.lighten(color1.g, color2.g);
                b = ColorBlend_1.ColorBlend.lighten(color1.b, color2.b);
                a = ColorBlend_1.ColorBlend.lighten(color1.a, color2.a);
                break;
            case ColorBlend_1.BlendType.Darken:
                r = ColorBlend_1.ColorBlend.darken(color1.r, color2.r);
                g = ColorBlend_1.ColorBlend.darken(color1.g, color2.g);
                b = ColorBlend_1.ColorBlend.darken(color1.b, color2.b);
                a = ColorBlend_1.ColorBlend.darken(color1.a, color2.a);
                break;
            case ColorBlend_1.BlendType.Multiply:
                r = ColorBlend_1.ColorBlend.multiply(color1.r, color2.r);
                g = ColorBlend_1.ColorBlend.multiply(color1.g, color2.g);
                b = ColorBlend_1.ColorBlend.multiply(color1.b, color2.b);
                a = ColorBlend_1.ColorBlend.multiply(color1.a, color2.a);
                break;
            case ColorBlend_1.BlendType.Average:
                r = ColorBlend_1.ColorBlend.average(color1.r, color2.r);
                g = ColorBlend_1.ColorBlend.average(color1.g, color2.g);
                b = ColorBlend_1.ColorBlend.average(color1.b, color2.b);
                a = ColorBlend_1.ColorBlend.average(color1.a, color2.a);
                break;
            case ColorBlend_1.BlendType.Add:
                r = ColorBlend_1.ColorBlend.add(color1.r, color2.r);
                g = ColorBlend_1.ColorBlend.add(color1.g, color2.g);
                b = ColorBlend_1.ColorBlend.add(color1.b, color2.b);
                a = ColorBlend_1.ColorBlend.add(color1.a, color2.a);
                break;
            case ColorBlend_1.BlendType.Subtract:
                r = ColorBlend_1.ColorBlend.subtract(color1.r, color2.r);
                g = ColorBlend_1.ColorBlend.subtract(color1.g, color2.g);
                b = ColorBlend_1.ColorBlend.subtract(color1.b, color2.b);
                a = ColorBlend_1.ColorBlend.subtract(color1.a, color2.a);
                break;
            case ColorBlend_1.BlendType.Difference:
                r = ColorBlend_1.ColorBlend.difference(color1.r, color2.r);
                g = ColorBlend_1.ColorBlend.difference(color1.g, color2.g);
                b = ColorBlend_1.ColorBlend.difference(color1.b, color2.b);
                a = ColorBlend_1.ColorBlend.difference(color1.a, color2.a);
                break;
            case ColorBlend_1.BlendType.Negation:
                r = ColorBlend_1.ColorBlend.negation(color1.r, color2.r);
                g = ColorBlend_1.ColorBlend.negation(color1.g, color2.g);
                b = ColorBlend_1.ColorBlend.negation(color1.b, color2.b);
                a = ColorBlend_1.ColorBlend.negation(color1.a, color2.a);
                break;
            case ColorBlend_1.BlendType.Screen:
                r = ColorBlend_1.ColorBlend.screen(color1.r, color2.r);
                g = ColorBlend_1.ColorBlend.screen(color1.g, color2.g);
                b = ColorBlend_1.ColorBlend.screen(color1.b, color2.b);
                a = ColorBlend_1.ColorBlend.screen(color1.a, color2.a);
                break;
            case ColorBlend_1.BlendType.Exclusion:
                r = ColorBlend_1.ColorBlend.exclusion(color1.r, color2.r);
                g = ColorBlend_1.ColorBlend.exclusion(color1.g, color2.g);
                b = ColorBlend_1.ColorBlend.exclusion(color1.b, color2.b);
                a = ColorBlend_1.ColorBlend.exclusion(color1.a, color2.a);
                break;
            case ColorBlend_1.BlendType.Overlay:
                r = ColorBlend_1.ColorBlend.overlay(color1.r, color2.r);
                g = ColorBlend_1.ColorBlend.overlay(color1.g, color2.g);
                b = ColorBlend_1.ColorBlend.overlay(color1.b, color2.b);
                a = ColorBlend_1.ColorBlend.overlay(color1.a, color2.a);
                break;
            case ColorBlend_1.BlendType.SoftLight:
                r = ColorBlend_1.ColorBlend.softLight(color1.r, color2.r);
                g = ColorBlend_1.ColorBlend.softLight(color1.g, color2.g);
                b = ColorBlend_1.ColorBlend.softLight(color1.b, color2.b);
                a = ColorBlend_1.ColorBlend.softLight(color1.a, color2.a);
                break;
            case ColorBlend_1.BlendType.HardLight:
                r = ColorBlend_1.ColorBlend.hardLight(color1.r, color2.r);
                g = ColorBlend_1.ColorBlend.hardLight(color1.g, color2.g);
                b = ColorBlend_1.ColorBlend.hardLight(color1.b, color2.b);
                a = ColorBlend_1.ColorBlend.hardLight(color1.a, color2.a);
                break;
            case ColorBlend_1.BlendType.ColorDodge:
                r = ColorBlend_1.ColorBlend.colorDodge(color1.r, color2.r);
                g = ColorBlend_1.ColorBlend.colorDodge(color1.g, color2.g);
                b = ColorBlend_1.ColorBlend.colorDodge(color1.b, color2.b);
                a = ColorBlend_1.ColorBlend.colorDodge(color1.a, color2.a);
                break;
            case ColorBlend_1.BlendType.ColorBurn:
                r = ColorBlend_1.ColorBlend.colorBurn(color1.r, color2.r);
                g = ColorBlend_1.ColorBlend.colorBurn(color1.g, color2.g);
                b = ColorBlend_1.ColorBlend.colorBurn(color1.b, color2.b);
                a = ColorBlend_1.ColorBlend.colorBurn(color1.a, color2.a);
                break;
            case ColorBlend_1.BlendType.LinearDodge:
                r = ColorBlend_1.ColorBlend.linearDodge(color1.r, color2.r);
                g = ColorBlend_1.ColorBlend.linearDodge(color1.g, color2.g);
                b = ColorBlend_1.ColorBlend.linearDodge(color1.b, color2.b);
                a = ColorBlend_1.ColorBlend.linearDodge(color1.a, color2.a);
                break;
            case ColorBlend_1.BlendType.LinearBurn:
                r = ColorBlend_1.ColorBlend.linearBurn(color1.r, color2.r);
                g = ColorBlend_1.ColorBlend.linearBurn(color1.g, color2.g);
                b = ColorBlend_1.ColorBlend.linearBurn(color1.b, color2.b);
                a = ColorBlend_1.ColorBlend.linearBurn(color1.a, color2.a);
                break;
            case ColorBlend_1.BlendType.LinearLight:
                r = ColorBlend_1.ColorBlend.linearLight(color1.r, color2.r);
                g = ColorBlend_1.ColorBlend.linearLight(color1.g, color2.g);
                b = ColorBlend_1.ColorBlend.linearLight(color1.b, color2.b);
                a = ColorBlend_1.ColorBlend.linearLight(color1.a, color2.a);
                break;
            case ColorBlend_1.BlendType.VividLight:
                r = ColorBlend_1.ColorBlend.vividLight(color1.r, color2.r);
                g = ColorBlend_1.ColorBlend.vividLight(color1.g, color2.g);
                b = ColorBlend_1.ColorBlend.vividLight(color1.b, color2.b);
                a = ColorBlend_1.ColorBlend.vividLight(color1.a, color2.a);
                break;
            case ColorBlend_1.BlendType.PinLight:
                r = ColorBlend_1.ColorBlend.pinLight(color1.r, color2.r);
                g = ColorBlend_1.ColorBlend.pinLight(color1.g, color2.g);
                b = ColorBlend_1.ColorBlend.pinLight(color1.b, color2.b);
                a = ColorBlend_1.ColorBlend.pinLight(color1.a, color2.a);
                break;
            case ColorBlend_1.BlendType.HardMix:
                r = ColorBlend_1.ColorBlend.hardMix(color1.r, color2.r);
                g = ColorBlend_1.ColorBlend.hardMix(color1.g, color2.g);
                b = ColorBlend_1.ColorBlend.hardMix(color1.b, color2.b);
                a = ColorBlend_1.ColorBlend.hardMix(color1.a, color2.a);
                break;
            case ColorBlend_1.BlendType.Reflect:
                r = ColorBlend_1.ColorBlend.reflect(color1.r, color2.r);
                g = ColorBlend_1.ColorBlend.reflect(color1.g, color2.g);
                b = ColorBlend_1.ColorBlend.reflect(color1.b, color2.b);
                a = ColorBlend_1.ColorBlend.reflect(color1.a, color2.a);
                break;
            case ColorBlend_1.BlendType.Glow:
                r = ColorBlend_1.ColorBlend.glow(color1.r, color2.r);
                g = ColorBlend_1.ColorBlend.glow(color1.g, color2.g);
                b = ColorBlend_1.ColorBlend.glow(color1.b, color2.b);
                a = ColorBlend_1.ColorBlend.glow(color1.a, color2.a);
                break;
            case ColorBlend_1.BlendType.Phoenix:
                r = ColorBlend_1.ColorBlend.phoenix(color1.r, color2.r);
                g = ColorBlend_1.ColorBlend.phoenix(color1.g, color2.g);
                b = ColorBlend_1.ColorBlend.phoenix(color1.b, color2.b);
                a = ColorBlend_1.ColorBlend.phoenix(color1.a, color2.a);
                break;
        }
        return new Color(r, g, b, a);
    }
    get invert() {
        var r = Math.abs(this.r - 255);
        var g = Math.abs(this.g - 255);
        var b = Math.abs(this.b - 255);
        return new Color(r, g, b);
    }
    get luminance() {
        return 0.2126 * this.r + 0.7152 * this.g + 0.0722 * this.b;
    }
    get grayscale() {
        return (this.r + this.g + this.b) / 3;
    }
    get maxColorComponent() {
        return Math.max(this.r, this.g, this.b);
    }
    static get indianRed() { return new Color(205, 92, 92); }
    static get lightCoral() { return new Color(240, 128, 128); }
    static get salmon() { return new Color(250, 128, 114); }
    static get darkSalmon() { return new Color(233, 150, 122); }
    static get crimson() { return new Color(220, 20, 60); }
    static get red() { return new Color(255, 0, 0); }
    static get firebrick() { return new Color(178, 34, 34); }
    static get darkRed() { return new Color(139, 0, 0); }
    static get pink() { return new Color(255, 192, 203); }
    static get lightPink() { return new Color(255, 182, 193); }
    static get hotPink() { return new Color(255, 105, 180); }
    static get deepPink() { return new Color(255, 20, 147); }
    static get mediumViolet() { return new Color(199, 21, 133); }
    static get paleViolet() { return new Color(219, 112, 147); }
    static get lightSalmon() { return new Color(255, 160, 122); }
    static get coral() { return new Color(255, 127, 80); }
    static get tomato() { return new Color(255, 99, 71); }
    static get orangeRed() { return new Color(255, 69, 0); }
    static get darkOrange() { return new Color(255, 140, 0); }
    static get orange() { return new Color(255, 165, 0); }
    static get gold() { return new Color(255, 215, 0); }
    static get yellow() { return new Color(255, 215, 0); }
    static get lightYellow() { return new Color(255, 255, 224); }
    static get lemonChiffon() { return new Color(255, 250, 205); }
    static get lightGoldenRodYellow() { return new Color(250, 250, 210); }
    static get papayWhip() { return new Color(255, 239, 213); }
    static get moccasin() { return new Color(255, 228, 181); }
    static get peachPuff() { return new Color(255, 218, 185); }
    static get paleGoldenRod() { return new Color(238, 232, 170); }
    static get khaki() { return new Color(240, 230, 140); }
    static get darkKhaki() { return new Color(189, 183, 107); }
    static get lavender() { return new Color(230, 230, 250); }
    static get thistle() { return new Color(216, 191, 216); }
    static get plum() { return new Color(221, 160, 221); }
    static get violet() { return new Color(238, 130, 238); }
    static get orchid() { return new Color(218, 112, 214); }
    static get fuchsia() { return new Color(255, 0, 255); }
    static get magenta() { return new Color(255, 0, 255); }
    static get mediumOrchid() { return new Color(186, 85, 211); }
    static get mediumPurple() { return new Color(147, 112, 219); }
    static get rebeccaPurple() { return new Color(102, 51, 153); }
    static get blueViolet() { return new Color(138, 43, 226); }
    static get darkViolet() { return new Color(148, 0, 211); }
    static get darkOrchid() { return new Color(153, 50, 204); }
    static get darkMagenta() { return new Color(139, 0, 139); }
    static get purple() { return new Color(128, 0, 128); }
    static get indigo() { return new Color(75, 0, 130); }
    static get slateBlue() { return new Color(106, 90, 205); }
    static get darkSlateBlue() { return new Color(72, 61, 139); }
    static get greenYellow() { return new Color(173, 255, 47); }
    static get chartreuse() { return new Color(127, 255, 0); }
    static get lawnGreen() { return new Color(124, 252, 0); }
    static get lime() { return new Color(0, 255, 0); }
    static get limeGreen() { return new Color(50, 205, 50); }
    static get paleGreen() { return new Color(152, 251, 152); }
    static get lightGreen() { return new Color(144, 238, 144); }
    static get mediumSpringGreen() { return new Color(0, 250, 154); }
    static get springGreen() { return new Color(0, 255, 127); }
    static get mediumSeaGreen() { return new Color(60, 179, 113); }
    static get seaGreen() { return new Color(60, 179, 113); }
    static get forestGreen() { return new Color(34, 139, 34); }
    static get green() { return new Color(0, 128, 0); }
    static get darkGreen() { return new Color(0, 100, 0); }
    static get yellowGreen() { return new Color(154, 205, 50); }
    static get oliveDrab() { return new Color(107, 142, 35); }
    static get olive() { return new Color(128, 128, 0); }
    static get darkOliveGreen() { return new Color(85, 107, 47); }
    static get mediumAquaMarine() { return new Color(102, 205, 170); }
    static get darkSeaGreen() { return new Color(143, 188, 139); }
    static get lightSeaGreen() { return new Color(32, 178, 170); }
    static get darkCyan() { return new Color(0, 139, 139); }
    static get teal() { return new Color(0, 128, 128); }
    static get cyan() { return new Color(0, 255, 255); }
    static get lightCyan() { return new Color(224, 255, 255); }
    static get paleTurquoise() { return new Color(175, 238, 238); }
    static get aquaMarine() { return new Color(127, 255, 212); }
    static get turquoise() { return new Color(64, 224, 208); }
    static get mediumTurquoise() { return new Color(72, 209, 204); }
    static get darkTurquoise() { return new Color(0, 206, 209); }
    static get cadetBlue() { return new Color(95, 158, 160); }
    static get steelBlue() { return new Color(70, 130, 180); }
    static get lightSteelBlue() { return new Color(176, 196, 222); }
    static get powderBlue() { return new Color(176, 224, 230); }
    static get lightBlue() { return new Color(173, 216, 230); }
    static get skyBlue() { return new Color(135, 206, 235); }
    static get lightSkyBlue() { return new Color(135, 206, 250); }
    static get deepSkyBlue() { return new Color(0, 191, 255); }
    static get dodgerBlue() { return new Color(30, 144, 255); }
    static get cornFlowerBlue() { return new Color(100, 149, 237); }
    static get mediumSlateBlue() { return new Color(123, 104, 238); }
    static get royalBlue() { return new Color(65, 105, 225); }
    static get blue() { return new Color(0, 0, 255); }
    static get mediumBlue() { return new Color(0, 0, 205); }
    static get darkBlue() { return new Color(0, 0, 139); }
    static get navy() { return new Color(0, 0, 128); }
    static get midnighBlue() { return new Color(25, 25, 112); }
    static get blueberry() { return new Color(79, 134, 247); }
    static get cornSilk() { return new Color(255, 248, 220); }
    static get blanchedAlmond() { return new Color(255, 235, 205); }
    static get bisque() { return new Color(255, 228, 196); }
    static get navajoWhite() { return new Color(255, 222, 173); }
    static get wheat() { return new Color(245, 222, 179); }
    static get burlyWood() { return new Color(222, 184, 135); }
    static get tan() { return new Color(210, 180, 140); }
    static get rosyBrown() { return new Color(188, 143, 143); }
    static get sandyBrown() { return new Color(244, 164, 96); }
    static get goldenRod() { return new Color(218, 165, 32); }
    static get darkGoldenRod() { return new Color(184, 134, 11); }
    static get peru() { return new Color(205, 133, 63); }
    static get chocolate() { return new Color(210, 105, 30); }
    static get saddleBrown() { return new Color(139, 69, 19); }
    static get sienna() { return new Color(160, 82, 45); }
    static get brown() { return new Color(165, 42, 42); }
    static get maroon() { return new Color(128, 0, 0); }
    static get white() { return new Color(255, 255, 255); }
    static get snow() { return new Color(255, 250, 250); }
    static get honeyDew() { return new Color(240, 255, 240); }
    static get mintCream() { return new Color(245, 255, 250); }
    static get azure() { return new Color(240, 255, 255); }
    static get aliceBlue() { return new Color(240, 248, 255); }
    static get ghostWhite() { return new Color(248, 248, 255); }
    static get whiteSmoke() { return new Color(245, 245, 245); }
    static get seaShell() { return new Color(255, 245, 238); }
    static get beige() { return new Color(245, 245, 220); }
    static get oldLace() { return new Color(253, 245, 230); }
    static get floralWhite() { return new Color(255, 250, 240); }
    static get ivory() { return new Color(255, 255, 240); }
    static get antiqueWhite() { return new Color(250, 235, 215); }
    static get linen() { return new Color(250, 240, 230); }
    static get lavenderBlush() { return new Color(255, 240, 245); }
    static get mistyRose() { return new Color(255, 228, 225); }
    static get gainsBoro() { return new Color(220, 220, 220); }
    static get lightGray() { return new Color(211, 211, 211); }
    static get silver() { return new Color(192, 192, 192); }
    static get darkGray() { return new Color(169, 169, 169); }
    static get gray() { return new Color(128, 128, 128); }
    static get dimGray() { return new Color(105, 105, 105); }
    static get lightSlateGray() { return new Color(119, 136, 153); }
    static get slateGray() { return new Color(112, 128, 144); }
    static get darkSlateGray() { return new Color(47, 79, 79); }
    static get black() { return new Color(0, 0, 0); }
}
exports.Color = Color;

},{"./ColorBlend":12}],12:[function(require,module,exports){
"use strict";
(function (BlendType) {
    BlendType[BlendType["Normal"] = 0] = "Normal";
    BlendType[BlendType["Lighten"] = 1] = "Lighten";
    BlendType[BlendType["Darken"] = 2] = "Darken";
    BlendType[BlendType["Multiply"] = 3] = "Multiply";
    BlendType[BlendType["Average"] = 4] = "Average";
    BlendType[BlendType["Add"] = 5] = "Add";
    BlendType[BlendType["Subtract"] = 6] = "Subtract";
    BlendType[BlendType["Difference"] = 7] = "Difference";
    BlendType[BlendType["Negation"] = 8] = "Negation";
    BlendType[BlendType["Screen"] = 9] = "Screen";
    BlendType[BlendType["Exclusion"] = 10] = "Exclusion";
    BlendType[BlendType["Overlay"] = 11] = "Overlay";
    BlendType[BlendType["SoftLight"] = 12] = "SoftLight";
    BlendType[BlendType["HardLight"] = 13] = "HardLight";
    BlendType[BlendType["ColorDodge"] = 14] = "ColorDodge";
    BlendType[BlendType["ColorBurn"] = 15] = "ColorBurn";
    BlendType[BlendType["LinearDodge"] = 16] = "LinearDodge";
    BlendType[BlendType["LinearBurn"] = 17] = "LinearBurn";
    BlendType[BlendType["LinearLight"] = 18] = "LinearLight";
    BlendType[BlendType["VividLight"] = 19] = "VividLight";
    BlendType[BlendType["PinLight"] = 20] = "PinLight";
    BlendType[BlendType["HardMix"] = 21] = "HardMix";
    BlendType[BlendType["Reflect"] = 22] = "Reflect";
    BlendType[BlendType["Glow"] = 23] = "Glow";
    BlendType[BlendType["Phoenix"] = 24] = "Phoenix";
})(exports.BlendType || (exports.BlendType = {}));
var BlendType = exports.BlendType;
class ColorBlend {
    static normal(a, b) {
        return a;
    }
    static lighten(a, b) {
        return (b > a) ? b : a;
    }
    static darken(a, b) {
        return (b > a) ? a : b;
    }
    static multiply(a, b) {
        return (a * b) / 255;
    }
    static average(a, b) {
        return (a + b) / 2;
    }
    static add(a, b) {
        return Math.min(255, (a + b));
    }
    static subtract(a, b) {
        return (a + b < 255) ? 0 : (a + b - 255);
    }
    static difference(a, b) {
        return Math.abs(a - b);
    }
    static negation(a, b) {
        return (255 - Math.abs(255 - a - b));
    }
    static screen(a, b) {
        return (255 - (((255 - a) * (255 - b)) >> 8));
    }
    static exclusion(a, b) {
        return a + b - 2 * a * b / 255;
    }
    static overlay(a, b) {
        return (b < 128) ? (2 * a * b / 255) : (255 - 2 * (255 - a) * (255 - b) / 255);
    }
    static softLight(a, b) {
        return ((b < 128) ? (2 * ((a >> 1) + 64)) * (b / 255) : (255 - (2 * (255 - ((a >> 1) + 64)) * (255 - b) / 255)));
    }
    static hardLight(a, b) {
        return this.overlay(b, a);
    }
    static colorDodge(a, b) {
        return ((b == 255) ? b : Math.min(255, ((a << 8) / (255 - b))));
    }
    static colorBurn(a, b) {
        return ((b == 0) ? b : Math.max(0, (255 - ((255 - a) << 8) / b)));
    }
    static linearDodge(a, b) {
        return this.add(a, b);
    }
    static linearBurn(a, b) {
        return this.subtract(a, b);
    }
    static linearLight(a, b) {
        return (b < 128) ? this.linearBurn(a, (2 * b)) : this.linearDodge(a, (2 * (b - 128)));
    }
    static vividLight(a, b) {
        return (b < 128) ? this.colorBurn(a, (2 * b)) : this.colorDodge(a, (2 * (b - 128)));
    }
    static pinLight(a, b) {
        return (b < 128) ? this.darken(a, (2 * b)) : this.lighten(a, (2 * (b - 128)));
    }
    static hardMix(a, b) {
        return ((this.vividLight(a, b) < 128) ? 0 : 255);
    }
    static reflect(a, b) {
        return ((b == 255) ? b : Math.min(255, (a * a / (255 - b))));
    }
    static glow(a, b) {
        return this.reflect(b, a);
    }
    static phoenix(a, b) {
        return (Math.min(a, b) - Math.max(a, b) + 255);
    }
}
exports.ColorBlend = ColorBlend;

},{}],13:[function(require,module,exports){
"use strict";
class Mathf {
    static lerp(start, end, time) {
        let val = (1 - time) * start + time * end;
        return val;
    }
    static clamp(value, min, max) {
        return Math.max(Math.min(max, value), min);
    }
    static clamp01(value) {
        return Math.max(Math.min(1, value), 0);
    }
    static invert(value, max) {
        return Math.abs(value - max);
    }
    static invert01(value) {
        return Math.abs(value - 1);
    }
}
exports.Mathf = Mathf;

},{}],14:[function(require,module,exports){
"use strict";
class Settings {
    static set(key, value) {
        Settings[key] = value;
        return Settings;
    }
    static reset(key = null) {
        if (key === 'fps' || key === null) {
            Settings.fps = 240;
        }
        if (key === 'units' || key === null) {
            Settings.units = 'px';
        }
        return Settings;
    }
}
Settings.fps = 240;
Settings.units = 'px';
exports.Settings = Settings;

},{}],15:[function(require,module,exports){
"use strict";
class Time {
    static get deltaTime() {
        return this._deltaTime;
    }
    static get time() {
        return this._time;
    }
    static setDeltaTime(delta) {
        this._deltaTime = delta;
    }
    static setFrameTime(seconds) {
        this._time = seconds;
    }
}
Time._deltaTime = 0;
Time._time = 0;
exports.Time = Time;

},{}],16:[function(require,module,exports){
"use strict";
const Mathf_1 = require('./Mathf');
const Tween_1 = require('../components/Tween');
class TweenFx {
    static easeInBounce(start, end, value) {
        end -= start;
        return end - TweenFx.easeOutBounce(0, end, 1 - value) + start;
    }
    static easeOutBounce(start, end, value) {
        value /= 1;
        end -= start;
        if (value < (1 / 2.75)) {
            return end * (7.5625 * value * value) + start;
        }
        else if (value < (2 / 2.75)) {
            value -= (1.5 / 2.75);
            return end * (7.5625 * (value) * value + .75) + start;
        }
        else if (value < (2.5 / 2.75)) {
            value -= (2.25 / 2.75);
            return end * (7.5625 * (value) * value + .9375) + start;
        }
        else {
            value -= (2.625 / 2.75);
            return end * (7.5625 * (value) * value + .984375) + start;
        }
    }
    static easeInOutBounce(start, end, value) {
        end -= start;
        if (value < 1 / 2)
            return TweenFx.easeInBounce(0, end, value * 2) * 0.5 + start;
        else
            return TweenFx.easeOutBounce(0, end, value * 2 - 1) * 0.5 + end * 0.5 + start;
    }
    static easeOut(start, end, value) {
        return Mathf_1.Mathf.lerp(start, end, Math.sin(value * Math.PI * 0.5));
    }
    static easeInOut(start, end, value) {
        return Mathf_1.Mathf.lerp(start, end, value * value * (3.0 - 2.0 * value));
    }
    static easeInBack(start, end, value) {
        end -= start;
        value /= 1;
        var s = 1.70158;
        return end * (value) * value * ((s + 1) * value - s) + start;
    }
    static easeOutBack(start, end, value) {
        var s = 1.70158;
        end -= start;
        value = (value / 1) - 1;
        return end * ((value) * value * ((s + 1) * value + s) + 1) + start;
    }
    static easeInOutBack(start, end, value) {
        var s = 1.70158;
        end -= start;
        value /= .5;
        if ((value) < 1) {
            s *= (1.525);
            return end / 2 * (value * value * (((s) + 1) * value - s)) + start;
        }
        value -= 2;
        s *= (1.525);
        return end / 2 * ((value) * value * (((s) + 1) * value + s) + 2) + start;
    }
    static easeInElastic(start, end, value) {
        end -= start;
        var p = 1 * .3;
        var s = 0;
        var a = 0;
        if (value == 0)
            return start;
        if ((value /= 1) == 1)
            return start + end;
        if (a == 0 || a < Math.abs(end)) {
            a = end;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(end / a);
        }
        return -(a * Math.pow(2, 10 * (value -= 1)) * Math.sin((value * 1 - s) * (2 * Math.PI) / p)) + start;
    }
    static easeOutElastic(start, end, value) {
        end -= start;
        var p = 1 * .3;
        var s = 0;
        var a = 0;
        if (value == 0)
            return start;
        if ((value /= 1) == 1)
            return start + end;
        if (a == 0 || a < Math.abs(end)) {
            a = end;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(end / a);
        }
        return (a * Math.pow(2, -10 * value) * Math.sin((value * 1 - s) * (2 * Math.PI) / p) + end + start);
    }
    static easeInOutElastic(start, end, value) {
        end -= start;
        var p = 1 * .3;
        var s = 0;
        var a = 0;
        if (value == 0)
            return start;
        if ((value /= 1 / 2) == 2)
            return start + end;
        if (a == 0 || a < Math.abs(end)) {
            a = end;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(end / a);
        }
        if (value < 1)
            return -0.5 * (a * Math.pow(2, 10 * (value -= 1)) * Math.sin((value * 1 - s) * (2 * Math.PI) / p)) + start;
        return a * Math.pow(2, -10 * (value -= 1)) * Math.sin((value * 1 - s) * (2 * Math.PI) / p) * 0.5 + end + start;
    }
    static easeInCirc(start, end, value) {
        end -= start;
        return -end * (Math.sqrt(1 - value * value) - 1) + start;
    }
    static easeOutCirc(start, end, value) {
        value--;
        end -= start;
        return end * Math.sqrt(1 - value * value) + start;
    }
    static easeInOutCirc(start, end, value) {
        value /= .5;
        end -= start;
        if (value < 1)
            return -end / 2 * (Math.sqrt(1 - value * value) - 1) + start;
        value -= 2;
        return end / 2 * (Math.sqrt(1 - value * value) + 1) + start;
    }
    static easeInExpo(start, end, value) {
        end -= start;
        return end * Math.pow(2, 10 * (value / 1 - 1)) + start;
    }
    static easeOutExpo(start, end, value) {
        end -= start;
        return end * (-Math.pow(2, -10 * value / 1) + 1) + start;
    }
    static easeInOutExpo(start, end, value) {
        value /= .5;
        end -= start;
        if (value < 1)
            return end / 2 * Math.pow(2, 10 * (value - 1)) + start;
        value--;
        return end / 2 * (-Math.pow(2, -10 * value) + 2) + start;
    }
    static easeInSine(start, end, value) {
        end -= start;
        return -end * Math.cos(value / 1 * (Math.PI / 2)) + end + start;
    }
    static easeOutSine(start, end, value) {
        end -= start;
        return end * Math.sin(value / 1 * (Math.PI / 2)) + start;
    }
    static easeInOutSine(start, end, value) {
        end -= start;
        return -end / 2 * (Math.cos(Math.PI * value / 1) - 1) + start;
    }
    static easeInQuint(start, end, value) {
        end -= start;
        return end * value * value * value * value * value + start;
    }
    static easeOutQuint(start, end, value) {
        value--;
        end -= start;
        return end * (value * value * value * value * value + 1) + start;
    }
    static easeInOutQuint(start, end, value) {
        value /= .5;
        end -= start;
        if (value < 1)
            return end / 2 * value * value * value * value * value + start;
        value -= 2;
        return end / 2 * (value * value * value * value * value + 2) + start;
    }
    static easeInQuart(start, end, value) {
        end -= start;
        return end * value * value * value * value + start;
    }
    static easeOutQuart(start, end, value) {
        value--;
        end -= start;
        return -end * (value * value * value * value - 1) + start;
    }
    static easeInOutQuart(start, end, value) {
        value /= .5;
        end -= start;
        if (value < 1)
            return end / 2 * value * value * value * value + start;
        value -= 2;
        return -end / 2 * (value * value * value * value - 2) + start;
    }
    static easeInCubic(start, end, value) {
        end -= start;
        return end * value * value * value + start;
    }
    static easeOutCubic(start, end, value) {
        value--;
        end -= start;
        return end * (value * value * value + 1) + start;
    }
    static easeInOutCubic(start, end, value) {
        value /= .5;
        end -= start;
        if (value < 1)
            return end / 2 * value * value * value + start;
        value -= 2;
        return end / 2 * (value * value * value + 2) + start;
    }
    static easeInQuad(start, end, value) {
        end -= start;
        return end * value * value + start;
    }
    static easeOutQuad(start, end, value) {
        end -= start;
        return -end * value * (value - 2) + start;
    }
    static easeInOutQuad(start, end, value) {
        value /= .5;
        end -= start;
        if (value < 1)
            return end / 2 * value * value + start;
        value--;
        return -end / 2 * (value * (value - 2) - 1) + start;
    }
    static clerp(start, end, value) {
        var min = 0.0;
        var max = 360.0;
        var half = Math.abs((max - min) / 2.0);
        var retval = 0.0;
        var diff = 0.0;
        if ((end - start) < -half) {
            diff = ((max - start) + end) * value;
            retval = start + diff;
        }
        else if ((end - start) > half) {
            diff = -((max - end) + start) * value;
            retval = start + diff;
        }
        else
            retval = start + (end - start) * value;
        return retval;
    }
    static spring(start, end, value) {
        value = Mathf_1.Mathf.clamp01(value);
        value = (Math.sin(value * Math.PI * (0.2 + 2.5 * value * value * value)) * Math.pow(1 - value, 2.2) + value) * (1 + (1.2 * (1 - value)));
        return start + (end - start) * value;
    }
    static animate(start, end, time, easeType = Tween_1.EaseType.Linear) {
        switch (easeType) {
            case Tween_1.EaseType.Linear:
                return Mathf_1.Mathf.lerp(start, end, time);
            case Tween_1.EaseType.EaseInBounce:
                return TweenFx.easeInBounce(start, end, time);
            case Tween_1.EaseType.EaseOutBounce:
                return TweenFx.easeOutBounce(start, end, time);
            case Tween_1.EaseType.EaseInOutBounce:
                return TweenFx.easeInOutBounce(start, end, time);
            case Tween_1.EaseType.EaseInBack:
                return TweenFx.easeInBack(start, end, time);
            case Tween_1.EaseType.EaseOutBack:
                return TweenFx.easeOutBack(start, end, time);
            case Tween_1.EaseType.EaseInOutBack:
                return TweenFx.easeInOutBack(start, end, time);
            case Tween_1.EaseType.EaseInElastic:
                return TweenFx.easeInElastic(start, end, time);
            case Tween_1.EaseType.EaseOutElastic:
                return TweenFx.easeOutElastic(start, end, time);
            case Tween_1.EaseType.EaseInOutElastic:
                return TweenFx.easeInOutElastic(start, end, time);
            case Tween_1.EaseType.EaseInCirc:
                return TweenFx.easeInCirc(start, end, time);
            case Tween_1.EaseType.EaseOutCirc:
                return TweenFx.easeOutCirc(start, end, time);
            case Tween_1.EaseType.EaseInOutCirc:
                return TweenFx.easeInOutCirc(start, end, time);
            case Tween_1.EaseType.EaseInExpo:
                return TweenFx.easeInExpo(start, end, time);
            case Tween_1.EaseType.EaseOutExpo:
                return TweenFx.easeOutExpo(start, end, time);
            case Tween_1.EaseType.EaseInOutExpo:
                return TweenFx.easeInOutExpo(start, end, time);
            case Tween_1.EaseType.EaseInSine:
                return TweenFx.easeInSine(start, end, time);
            case Tween_1.EaseType.EaseOutSine:
                return TweenFx.easeOutSine(start, end, time);
            case Tween_1.EaseType.EaseInOutSine:
                return TweenFx.easeInOutSine(start, end, time);
            case Tween_1.EaseType.EaseInQuint:
                return TweenFx.easeInQuint(start, end, time);
            case Tween_1.EaseType.EaseOutQuint:
                return TweenFx.easeOutQuint(start, end, time);
            case Tween_1.EaseType.EaseInOutQuint:
                return TweenFx.easeInOutQuint(start, end, time);
            case Tween_1.EaseType.EaseInQuart:
                return TweenFx.easeInQuart(start, end, time);
            case Tween_1.EaseType.EaseOutQuart:
                return TweenFx.easeOutQuart(start, end, time);
            case Tween_1.EaseType.EaseInOutQuart:
                return TweenFx.easeInOutQuart(start, end, time);
            case Tween_1.EaseType.EaseInCubic:
                return TweenFx.easeInCubic(start, end, time);
            case Tween_1.EaseType.EaseOutCubic:
                return TweenFx.easeOutCubic(start, end, time);
            case Tween_1.EaseType.EaseInOutCubic:
                return TweenFx.easeInOutCubic(start, end, time);
            case Tween_1.EaseType.EaseInQuad:
                return TweenFx.easeInQuad(start, end, time);
            case Tween_1.EaseType.EaseOutQuad:
                return TweenFx.easeOutQuad(start, end, time);
            case Tween_1.EaseType.EaseInOutQuad:
                return TweenFx.easeInOutQuad(start, end, time);
            case Tween_1.EaseType.Clerp:
                return TweenFx.clerp(start, end, time);
            case Tween_1.EaseType.Spring:
                return TweenFx.spring(start, end, time);
        }
    }
}
exports.TweenFx = TweenFx;

},{"../components/Tween":1,"./Mathf":13}],17:[function(require,module,exports){
"use strict";
class Vector2 {
    constructor(first, second = 0) {
        this.x = 0;
        this.y = 0;
        if (typeof first == 'object') {
            this.x = parseInt(first[0]);
            this.y = parseInt(first[1]);
        }
        else {
            this.x = parseInt(first);
            this.y = parseInt(second);
        }
    }
    static get zero() {
        return new Vector2(0, 0);
    }
    static get one() {
        return new Vector2(1, 1);
    }
}
exports.Vector2 = Vector2;

},{}],18:[function(require,module,exports){
"use strict";
function watch(object = {}, handler = null) {
    return new Watch(object, handler);
}
exports.watch = watch;
class Watcher {
    constructor(masterObject, handler) {
        this.watching = [];
        var self = this;
        var mainHandler = {
            get: function (obj, prop) {
                return prop in obj ? obj[prop] : null;
            },
            set: function (obj, prop, value, receiver) {
                if (prop in obj) {
                    if (obj[prop] != value) {
                        self.watching.forEach(item => {
                            if (prop == item.name && WatcherType.Changed == item.type) {
                                item.callback(obj[prop], value);
                            }
                        });
                    }
                    obj[prop] = value;
                    if (handler && typeof handler.set == 'function') {
                        handler.set(obj, prop, value, receiver);
                    }
                }
                return true;
            },
            defineProperty: function (obj, prop, value) {
                obj[prop] = value.value;
                return true;
            },
            deleteProperty: function (obj, prop) {
                self.watching.forEach(item => {
                    if (prop == item.name) {
                        item.callback();
                        var idx = self.watching.indexOf(item);
                        self.watching.splice(idx, 1);
                    }
                });
                return true;
            }
        };
        this.proxy = new Proxy(masterObject, mainHandler);
    }
    create(watch, defaultValue = null, callback = null, type = WatcherType.Default) {
        this.watching.push(new WatcherItem(watch, type, callback));
        if (!(watch in this.proxy)) {
            Object.defineProperty(this.proxy, watch, { value: defaultValue });
        }
        return this;
    }
    listen() {
        return this.proxy;
    }
}
exports.Watcher = Watcher;
(function (WatcherType) {
    WatcherType[WatcherType["Changed"] = 0] = "Changed";
    WatcherType[WatcherType["Default"] = 1] = "Default";
})(exports.WatcherType || (exports.WatcherType = {}));
var WatcherType = exports.WatcherType;
class Watch extends Watcher {
    changed(watch, callback) {
        return this.create(watch, null, callback, WatcherType.Changed);
    }
    destroyed(watch, callback) {
        return this.create(watch, null, callback);
    }
}
exports.Watch = Watch;
class WatcherItem {
    constructor(name, type, callback) {
        this.name = name;
        this.type = type;
        this.callback = callback;
    }
}
exports.WatcherItem = WatcherItem;

},{}],19:[function(require,module,exports){
"use strict";
const Watcher_1 = require('./Watcher');
function when(key, startValue) {
    return new When({}, key, startValue);
}
exports.when = when;
class When extends Watcher_1.Watch {
    constructor(masterObject, a, defaultValue) {
        super(masterObject, {
            set: function (obj, prop, value, receiver) {
                if (obj[$this.a] == obj[$this.b] && !$this.ranEqualCallback) {
                    if (typeof $this.equalsCallback == 'function') {
                        $this.equalsCallback();
                    }
                    $this.ranEqualCallback = true;
                }
                if (obj[$this.a] != obj[$this.b] && !$this.ranNotEqualCallback) {
                    if (typeof $this.notEqualCallback == 'function') {
                        $this.notEqualCallback();
                    }
                    $this.ranNotEqualCallback = true;
                }
                if (obj[$this.a] > obj[$this.b] && !$this.ranGreaterThanCallback) {
                    if (typeof $this.greaterThanCallback == 'function') {
                        $this.greaterThanCallback();
                    }
                    $this.ranGreaterThanCallback = true;
                }
                if (obj[$this.a] >= obj[$this.b] && !$this.ranGreaterThanOrEqualCallback) {
                    if (typeof $this.greaterThanOrEqualCallback == 'function') {
                        $this.greaterThanOrEqualCallback();
                    }
                    $this.ranGreaterThanOrEqualCallback = true;
                }
                if (obj[$this.a] < obj[$this.b] && !$this.ranLessThanCallback) {
                    if (typeof $this.lessThanCallback == 'function') {
                        $this.lessThanCallback();
                    }
                    $this.ranLessThanCallback = true;
                }
                if (obj[$this.a] <= obj[$this.b] && !$this.ranLessThanOrEqualCallback) {
                    if (typeof $this.lessThanOrEqualCallback == 'function') {
                        $this.lessThanOrEqualCallback();
                    }
                    $this.ranLessThanOrEqualCallback = true;
                }
                return true;
            }
        });
        this.a = null;
        this.b = null;
        this.aPrev = null;
        this.bPrev = null;
        this.ranEqualCallback = false;
        this.ranNotEqualCallback = false;
        this.ranGreaterThanCallback = false;
        this.ranGreaterThanOrEqualCallback = false;
        this.ranLessThanCallback = false;
        this.ranLessThanOrEqualCallback = false;
        var $this = this;
        this.a = a;
        this.create(a, defaultValue);
    }
    equals(b, defaultValue, callback) {
        this.b = b;
        this.create(b, defaultValue, callback);
        this.equalsCallback = callback;
        return this;
    }
    notEqual(b, defaultValue, callback) {
        this.b = b;
        this.create(b, defaultValue, callback);
        this.notEqualCallback = callback;
        return this;
    }
    greaterThan(b, defaultValue, callback) {
        this.b = b;
        this.create(b, defaultValue, callback);
        this.greaterThanCallback = callback;
        return this;
    }
    greaterThanOrEqual(b, defaultValue, callback) {
        this.b = b;
        this.create(b, defaultValue, callback);
        this.greaterThanOrEqualCallback = callback;
        return this;
    }
    lessThan(b, defaultValue, callback) {
        this.b = b;
        this.create(b, defaultValue, callback);
        this.lessThanCallback = callback;
        return this;
    }
    lessThanOrEqual(b, defaultValue, callback) {
        this.b = b;
        this.create(b, defaultValue, callback);
        this.lessThanOrEqualCallback = callback;
        return this;
    }
}
exports.When = When;

},{"./Watcher":18}]},{},[10]);
