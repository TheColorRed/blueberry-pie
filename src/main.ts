/// <reference path="../node_modules/typings/main.d.ts" />

import { Blueberry } from './core/Blueberry';
import { BerryObject } from './core/BerryObject';
import { BerryBehavior } from './core/BerryBehavior';

// Components
import { Http } from './components/Http';

// Utilities
import { Settings } from './utils/Settings';
import { Time } from './utils/Time';
import { Mathf } from './utils/Mathf';
import { Tween, EaseType, TweenSettings } from './utils/Tween';
import { watch } from './utils/Watcher';
import { when } from './utils/When';
import { Vector2 } from './utils/Vector';

// Blueberry
window.blueberry     = new Blueberry();

// Functions
window.watch = watch;
window.when = when;

// Utilities
window.BerryObject    = BerryObject;
window.Settings       = Settings;
window.Vector2        = Vector2;
window.Http           = Http;
window.BerryBehavior  = BerryBehavior;
window.Time           = Time;
window.Mathf          = Mathf;
window.Tween          = Tween;
window.Tween.EaseType = EaseType;