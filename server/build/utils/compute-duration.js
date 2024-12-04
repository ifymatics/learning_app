"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeDuration = void 0;
const computeDuration = () => {
    const timeInMonth = Math.ceil(Date.now() / 1000);
    return timeInMonth;
};
exports.computeDuration = computeDuration;
