"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StoreModule = /** @class */ (function () {
    function StoreModule() {
    }
    StoreModule.prototype._mixinOptions = function (options) {
        Object.assign(this, options);
    };
    // dynamically generated state with module reference
    StoreModule.prototype._generateState = function () {
        return {
            module: this,
        };
    };
    StoreModule.prototype._getModulePath = function (module, path) {
        path = path || '';
        // prepend this module's name (if one is given)
        path = (module._moduleNamespace ? module._moduleNamespace + '/' : module._moduleNamespace || '') + path;
        // recursively get ancestor's paths
        return module._parentModule ? this._getModulePath(module._parentModule, path) : path;
    };
    return StoreModule;
}());
exports.StoreModule = StoreModule;
