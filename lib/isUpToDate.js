"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUpToDate = void 0;
const shelljs_1 = require("shelljs");
function isUpToDate() {
    return (0, shelljs_1.exec)('git status -s').stdout.length === 0;
}
exports.isUpToDate = isUpToDate;
