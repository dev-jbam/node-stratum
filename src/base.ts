"use strict";

import * as Debug from "debug";
import { EventEmitter } from "eventemitter3";

const debug = Debug("stratum");

export class Base extends EventEmitter {
  static debug(...msg: any[]) {
    debug( "Base" + ": ", ...msg);

    return typeof msg === 'object' ? msg.join(', ') : msg;
  }
}
