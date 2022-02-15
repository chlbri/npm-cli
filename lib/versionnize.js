"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.versionnize = void 0;
function splitVersion(version) {
    const _versionsA = version.split('.').map(v => Number.parseInt(v));
    return {
        patch: _versionsA[2],
        minor: _versionsA[1],
        major: _versionsA[0],
    };
}
function buildVersion({ patch, minor, major, }) {
    return `${major}.${minor}.${patch}`;
}
function versionnize(props, version) {
    let _version = version;
    if (typeof props === 'string') {
        _version = props;
    }
    else {
        const versions = splitVersion(_version);
        const { add, type } = props;
        versions[type] += add;
        _version = buildVersion(versions);
    }
    return _version;
}
exports.versionnize = versionnize;
