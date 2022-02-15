"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clean = void 0;
/* eslint-disable prefer-const */
const shelljs_1 = require("shelljs");
// DO NOT DELETE THIS FILE
// This file is used by build system to build a clean npm package with the compiled js files in the root of the package.
// It will not be included in the npm package.
const CLEAN_COMMAND2 = 'git add . && git commit -am "clean"';
const CLEAN_COMMAND35 = 'git push --follow-tags';
function clean(currentBranch, productionBranch) {
    const CLEAN_COMMAND4 = `git checkout ${currentBranch} && git merge ${productionBranch}`;
    const CLEAN_COMMAND6 = `git checkout ${currentBranch}`;
    (0, shelljs_1.exec)(CLEAN_COMMAND2);
    (0, shelljs_1.exec)(CLEAN_COMMAND35);
    (0, shelljs_1.exec)(CLEAN_COMMAND4);
    (0, shelljs_1.exec)(CLEAN_COMMAND35);
    (0, shelljs_1.exec)(CLEAN_COMMAND6);
}
exports.clean = clean;
