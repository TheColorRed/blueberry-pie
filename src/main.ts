/// <reference path="../node_modules/typings/main.d.ts" />

import { Blueberry } from './core/Blueberry.ts';
import { BerryObject } from './core/BerryObject.ts';
import { Http } from './utils/Http.ts';
import { Effects } from './components/Effects.ts';

window.blueberry = new Blueberry();
window.berryObject = BerryObject;
window.effects = Effects;