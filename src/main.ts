/// <reference path="../node_modules/typings/main.d.ts" />

import { Blueberry } from './core/Blueberry';
import { BerryObject } from './core/BerryObject';
import { BerryBehavior } from './core/BerryBehavior';

// Components
import { Http } from './components/Http';

// Utilities
import { Time } from './utils/Time';
import { Mathf } from './utils/Mathf';
import { watch } from './utils/Watcher';
import { When } from './utils/When';

window.blueberry     = new Blueberry();
window.watch = watch;
window.BerryObject   = BerryObject;
window.Http          = Http;
window.BerryBehavior = BerryBehavior;
window.Time          = Time;
window.Mathf = Mathf;