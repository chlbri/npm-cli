"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./clean"), exports);
__exportStar(require("./pack"), exports);
__exportStar(require("./rinit"), exports);
__exportStar(require("./isUpToDate"), exports);
const shelljs_1 = require("shelljs");
const clean_1 = require("./clean");
const isUpToDate_1 = require("./isUpToDate");
const pack_1 = require("./pack");
const rinit_1 = require("./rinit");
function publish({ currentBranch = 'dev', productionBranch = 'main', lib = 'lib', }) {
    const COMMANDS = {
        GIT_MAIN: `git checkout ${productionBranch}`,
        INSTALL: 'pnpm install',
        PUBLISH: 'pnpm publish --access public --no-git-checks',
        GIT_CLEAN: 'git clean -fd && git checkout -- .',
    };
    // TODO: Add verif for git status
    if ((0, isUpToDate_1.isUpToDate)()) {
        (0, rinit_1.rinit)();
        (0, shelljs_1.exec)(COMMANDS.INSTALL);
        (0, shelljs_1.exec)(COMMANDS.GIT_MAIN);
        (0, pack_1.pack)(lib);
        (0, shelljs_1.exec)(COMMANDS.INSTALL);
        (0, shelljs_1.exec)(COMMANDS.PUBLISH);
        (0, shelljs_1.exec)(COMMANDS.GIT_CLEAN);
        (0, shelljs_1.exec)(COMMANDS.INSTALL);
        (0, clean_1.clean)(currentBranch, productionBranch);
    }
}
exports.default = publish;
publish({ currentBranch: 'dev', productionBranch: 'main' });
