"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pack = void 0;
const edit_json_file_1 = __importDefault(require("edit-json-file"));
const shelljs_1 = require("shelljs");
const constants_1 = require("./constants");
const versionnize_1 = require("./versionnize");
// DO NOT DELETE THIS FILE
// This file is used by build system to build a clean npm package with the compiled js files in the root of the package.
// It will not be included in the npm package.
function resetToMain(data) {
    if (typeof data !== 'string')
        return '';
    let _data = '';
    if (data.startsWith('dist/')) {
        _data = data.slice(5);
    }
    if (data.startsWith('lib/')) {
        _data = data.slice(4);
    }
    return _data;
}
function pack({ lib, versionProps }) {
    const COPY_COMMAND = `cp -R ${lib}/* .`;
    (0, shelljs_1.exec)('tsc');
    (0, shelljs_1.exec)(COPY_COMMAND);
    (0, shelljs_1.exec)(constants_1.REMOVE_COMMAND);
    const file = (0, edit_json_file_1.default)(constants_1.PACKAGE);
    // #region my own
    file.unset('devDependencies');
    file.unset('scripts');
    // #endregion
    // #region Config
    const typings = resetToMain(file.get('typings'));
    file.set('typings', typings);
    const _main = resetToMain(file.get('main'));
    file.set('main', _main);
    // #endregion
    // #region Versioning
    const _version = file.get('version');
    if (typeof _version === 'string') {
        const version = (0, versionnize_1.versionnize)(versionProps, _version);
        file.set('version', version);
    }
    // #endregion
    file.save();
}
exports.pack = pack;
