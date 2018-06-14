"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StratumError extends Error {
    constructor(message, error) {
        super(message);
        this.error = error;
        Error["captureStackTrace"](this, this.constructor);
    }
    toString() {
        return `${this.name}: ${this.message}\n\n${this.error[1]}`;
    }
}
exports.StratumError = StratumError;
//# sourceMappingURL=stratumerror.js.map