/// <reference path="../node_modules/typings/main.d.ts" />

import { Blueberry } from './core/Blueberry';
import { BerryObject } from './core/BerryObject';
import { BerryBehavior } from './core/BerryBehavior';
import { Http } from './components/Http';
import { Effects } from './components/Effects';

window.berryObject = BerryObject;
window.effects = Effects;
window.http = Http;
window.blueberry = new Blueberry();
window.BerryBehavior = BerryBehavior;