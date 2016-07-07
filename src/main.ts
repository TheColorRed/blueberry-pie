/// <reference path="../node_modules/typings/main.d.ts" />

import { Blueberry } from './core/Blueberry';
import { BerryObject } from './core/BerryObject';
import { BerryBehavior } from './core/BerryBehavior';

// Components
import { Http } from './components/Http';
import { Effects } from './components/Effects';

// Utilities
import { Time } from './utils/Time';
import { Mathf } from './utils/Mathf';

window.berryObject = BerryObject;
window.effects = Effects;
window.http = Http;
window.blueberry = new Blueberry();
window.BerryBehavior = BerryBehavior;
window.Time = Time;
window.Mathf = Mathf;