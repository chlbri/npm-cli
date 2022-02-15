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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./clean"), exports);
__exportStar(require("./isUpToDate"), exports);
__exportStar(require("./pack"), exports);
__exportStar(require("./rinit"), exports);
__exportStar(require("./versionnize"), exports);
const child_process_1 = __importDefault(require("child_process"));
const shelljs_1 = __importDefault(require("shelljs"));
const util_1 = __importDefault(require("util"));
const clean_1 = require("./clean");
const isUpToDate_1 = require("./isUpToDate");
const pack_1 = require("./pack");
const rinit_1 = require("./rinit");
const exec1 = util_1.default.promisify(child_process_1.default.exec);
async function publish({ currentBranch = 'dev', productionBranch = 'main', lib = 'lib', versionProps = { type: 'patch', add: 1 }, }) {
    const COMMANDS = {
        CHECKOUT_MAIN: `git checkout ${productionBranch}`,
        MERGE: `git merge ${currentBranch}`,
        INSTALL: 'pnpm install --no-frozen-lockfile',
        PUBLISH: 'pnpm publish --access public --no-git-checks',
        GIT_CLEAN: 'git clean -fd && git checkout -- .',
    };
    // TODO: Add verif for git status
    if ((0, isUpToDate_1.isUpToDate)()) {
        (0, rinit_1.rinit)();
        await exec1(COMMANDS.INSTALL);
        shelljs_1.default.exec(COMMANDS.CHECKOUT_MAIN);
        shelljs_1.default.exec(COMMANDS.MERGE);
        (0, pack_1.pack)({ lib, versionProps });
        shelljs_1.default.exec(COMMANDS.INSTALL);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('dotenv').config();
        shelljs_1.default.exec(`export NPM_TOKEN="${process.env.NPM_TOKEN}" && ${COMMANDS.PUBLISH}`);
        shelljs_1.default.exec(COMMANDS.GIT_CLEAN);
        shelljs_1.default.exec(COMMANDS.INSTALL);
        (0, clean_1.clean)(currentBranch, productionBranch);
        shelljs_1.default.exec(COMMANDS.INSTALL);
    }
}
exports.default = publish;
