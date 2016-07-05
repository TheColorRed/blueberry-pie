(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BerryBehavior_ts_1 = require('../core/BerryBehavior.ts');
var Effects = (function (_super) {
    __extends(Effects, _super);
    function Effects() {
        _super.apply(this, arguments);
    }
    Effects.prototype.awake = function () {
        alert('Effects have awaken!');
    };
    return Effects;
}(BerryBehavior_ts_1.BerryBehavior));
exports.Effects = Effects;

},{"../core/BerryBehavior.ts":3}],2:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Object_ts_1 = require('./Object.ts');
var Berry = (function (_super) {
    __extends(Berry, _super);
    function Berry() {
        _super.apply(this, arguments);
    }
    return Berry;
}(Object_ts_1.Object));
exports.Berry = Berry;

},{"./Object.ts":7}],3:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Component_ts_1 = require('./Component.ts');
var BerryManager_ts_1 = require('./managers/BerryManager.ts');
var BerryBehavior = (function (_super) {
    __extends(BerryBehavior, _super);
    function BerryBehavior() {
        _super.apply(this, arguments);
    }
    BerryBehavior.prototype.each = function (callback) {
        BerryManager_ts_1.BerryManager.berries.forEach(function (berry) {
            callback(berry);
        });
        return this;
    };
    BerryBehavior.prototype.sendMessage = function (name) {
    };
    return BerryBehavior;
}(Component_ts_1.Component));
exports.BerryBehavior = BerryBehavior;

},{"./Component.ts":6,"./managers/BerryManager.ts":8}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Object_ts_1 = require('./Object.ts');
var BerryManager_ts_1 = require('./managers/BerryManager.ts');
var BerryObject = (function (_super) {
    __extends(BerryObject, _super);
    function BerryObject(berry) {
        _super.call(this);
        this.components = [];
        this.berry = berry;
    }
    BerryObject.find = function (selector) {
        var nodes = document.querySelectorAll(selector);
        var berries = [];
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes.item(i);
            if (node.hasAttribute('blueberry')) {
                for (var j = 0; j < BerryManager_ts_1.BerryManager.berries.length; j++) {
                    var berry = BerryManager_ts_1.BerryManager.berries[j];
                    if (node == berry.berry) {
                        berries.push(berry);
                    }
                }
            }
        }
        return berries;
    };
    BerryObject.findObjectsWithName = function (name) {
        var objs = [];
        for (var i in BerryManager_ts_1.BerryManager.berries) {
            if (BerryManager_ts_1.BerryManager.berries[i].name == name) {
                objs.push(BerryManager_ts_1.BerryManager.berries[i]);
            }
        }
        return objs;
    };
    BerryObject.findWithName = function (name) {
        for (var i in BerryManager_ts_1.BerryManager.berries) {
            if (BerryManager_ts_1.BerryManager.berries[i].name == name) {
                return BerryManager_ts_1.BerryManager.berries[i];
            }
        }
        return null;
    };
    BerryObject.prototype.addComponent = function (component, options) {
        var comp = component;
        comp.behavior = component;
        comp.options = options;
        comp.sendMessage('awake');
        this.components.push(comp);
        return comp;
    };
    BerryObject.prototype.getComponent = function (component) {
        for (var i in this.components) {
            var comp = this.components[i];
            if (component == comp) {
                return comp;
            }
        }
        return null;
    };
    return BerryObject;
}(Object_ts_1.Object));
exports.BerryObject = BerryObject;

},{"./Object.ts":7,"./managers/BerryManager.ts":8}],5:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BerryBehavior_ts_1 = require('./BerryBehavior.ts');
var BerryObject_ts_1 = require('./BerryObject.ts');
var BerryManager_ts_1 = require('./managers/BerryManager.ts');
var Blueberry = (function (_super) {
    __extends(Blueberry, _super);
    function Blueberry() {
        _super.call(this);
        this.loadSequence = [];
        this.init();
        var $this = this;
        window.onload = function () {
            $this.loadSequence.forEach(function (callback) {
                callback();
            });
        };
    }
    Blueberry.prototype.init = function () {
        var $this = this;
        this.load(function () {
            var nodes = document.querySelectorAll('[blueberry]');
            var berries = [];
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes.item(i);
                if (node.hasAttribute('blueberry')) {
                    var berry = new BerryObject_ts_1.BerryObject(node);
                    berry.name = node.getAttribute('blueberry');
                    berries.push(berry);
                }
            }
            BerryManager_ts_1.BerryManager.setBerries(berries);
        });
    };
    Blueberry.prototype.load = function (callback) {
        this.loadSequence.push(callback);
    };
    Blueberry.prototype.start = function (callback) {
        this.load(callback);
    };
    return Blueberry;
}(BerryBehavior_ts_1.BerryBehavior));
exports.Blueberry = Blueberry;

},{"./BerryBehavior.ts":3,"./BerryObject.ts":4,"./managers/BerryManager.ts":8}],6:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Berry_ts_1 = require('./Berry.ts');
var Component = (function (_super) {
    __extends(Component, _super);
    function Component(componentName) {
        _super.call(this);
        this.componentName = componentName;
    }
    return Component;
}(Berry_ts_1.Berry));
exports.Component = Component;

},{"./Berry.ts":2}],7:[function(require,module,exports){
"use strict";
var Object = (function () {
    function Object() {
        this.name = '';
    }
    return Object;
}());
exports.Object = Object;

},{}],8:[function(require,module,exports){
"use strict";
var BerryManager = (function () {
    function BerryManager() {
    }
    Object.defineProperty(BerryManager, "berries", {
        get: function () {
            return BerryManager._berries;
        },
        enumerable: true,
        configurable: true
    });
    BerryManager.setBerries = function (berries) {
        BerryManager._berries = berries;
    };
    BerryManager.addBerry = function (berry) {
        BerryManager._berries.push(berry);
    };
    BerryManager._berries = [];
    return BerryManager;
}());
exports.BerryManager = BerryManager;

},{}],9:[function(require,module,exports){
"use strict";
var Blueberry_ts_1 = require('./core/Blueberry.ts');
var BerryObject_ts_1 = require('./core/BerryObject.ts');
var Effects_ts_1 = require('./components/Effects.ts');
window.blueberry = new Blueberry_ts_1.Blueberry();
window.berryObject = BerryObject_ts_1.BerryObject;
window.effects = Effects_ts_1.Effects;

},{"./components/Effects.ts":1,"./core/BerryObject.ts":4,"./core/Blueberry.ts":5}]},{},[9]);
