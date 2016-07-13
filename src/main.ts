/// <reference path="../node_modules/typings/main.d.ts" />

import { Blueberry } from './core/Blueberry';
import { BerryObject } from './core/BerryObject';
import { BerryBehavior } from './core/BerryBehavior';

// Components
// import { Http } from './components/Http';
import { Tween, EaseType, LoopType } from './components/Tween';

// Utilities
import { Settings } from './utils/Settings';
import { Time } from './utils/Time';
import { Mathf } from './utils/Mathf';
import { watch } from './utils/Watcher';
import { when } from './utils/When';
import { Vector2 } from './utils/Vector';
import { Color } from './utils/Color/Color';
import { BlendType } from './utils/Color/ColorBlend';

// Blueberry
window.blueberry     = new Blueberry();

// Functions
window.watch = watch;
window.when = when;

// Utilities
window.BerryObject     = BerryObject;
window.Settings        = Settings;
window.Vector2         = Vector2;
window.Color           = Color;
window.Color.BlendType = BlendType;
window.BerryBehavior   = BerryBehavior;
window.Time            = Time;
window.Mathf           = Mathf;
window.Tween           = Tween;
window.Tween.Easing    = EaseType;
window.Tween.Looping   = LoopType;