"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let domain;
exports.domain = domain;
var DOMAIN;
(function (DOMAIN) {
    DOMAIN["ORG"] = ".tuniu.org";
    DOMAIN["COM"] = ".tuniu.com";
})(DOMAIN = exports.DOMAIN || (exports.DOMAIN = {}));
switch (process.env.NODE_ENV) {
    default:
        exports.domain = domain = DOMAIN.ORG;
        break;
    case 'pre':
    case 'prod':
        exports.domain = domain = DOMAIN.COM;
        break;
}
//# sourceMappingURL=env.js.map