"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rinit = exports.emptyDirSync = void 0;
const fs_1 = __importDefault(require("fs"));
function emptyDirSync(path) {
    if (fs_1.default.existsSync(path)) {
        fs_1.default.readdirSync(path).forEach(file => {
            const curPath = `${path}/${file}`;
            const isDirectory = fs_1.default.lstatSync(curPath).isDirectory();
            isDirectory ? emptyDirSync(curPath) : fs_1.default.unlinkSync(curPath);
        });
        fs_1.default.rmdirSync(path);
    }
}
exports.emptyDirSync = emptyDirSync;
function rinit() {
    emptyDirSync('node_modules');
    console.log('Empty node_modules', '=>', 'done');
}
exports.rinit = rinit;
