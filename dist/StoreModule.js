"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StoreModule = /** @class */ (function () {
    //
    // CONSTRUCTOR
    //
    function StoreModule() {
        this._modulePathCacheMap = {};
    }
    //
    // METHODS
    //
    StoreModule.prototype.init = function (store) {
        // store static reference
        StoreModule.rootStore = store;
    };
    StoreModule.prototype.setOptions = function (options) {
        Object.assign(this, options);
    };
    StoreModule.prototype.getModulePath = function (module, path) {
        var cache = this._modulePathCacheMap[path];
        if (cache) {
            return cache;
        }
        return this._modulePathCacheMap[path] = this._processModulePath(module, path);
    };
    StoreModule.prototype._commit = function (commitFn, mutationName, payload, options) {
        return commitFn(this.getModulePath(this, mutationName), payload, options);
    };
    StoreModule.prototype._dispatch = function (dispatchFn, actionName, payload, options) {
        return dispatchFn(this.getModulePath(this, actionName), payload, options);
    };
    StoreModule.prototype.get = function (getterName) {
        return StoreModule.rootStore.getters[this.getModulePath(this, getterName)];
    };
    StoreModule.prototype._processModulePath = function (module, path) {
        path = path || '';
        // prepend this module's name (if one is given)
        path = (module._moduleNamespace ? module._moduleNamespace + '/' : module._moduleNamespace || '') + path;
        // recursively get ancestor's paths
        return module._parentModule ? this._processModulePath(module._parentModule, path) : path;
    };
    return StoreModule;
}());
exports.default = StoreModule;
