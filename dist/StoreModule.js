"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StoreModule = /** @class */ (function () {
    // CONSTRUCTOR
    function StoreModule() {
        this._modulePathCacheMap = {};
    }
    // METHODS
    StoreModule.prototype.init = function (store) {
        this.store = store;
        this.state = store.state;
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
    StoreModule.prototype.commit = function (mutationName, payload, options) {
        return StoreModule.rootStore.commit.call(StoreModule.rootStore, this.getModulePath(this, mutationName), payload, options);
    };
    StoreModule.prototype.dispatch = function (actionName, payload, options) {
        return StoreModule.rootStore.dispatch.call(StoreModule.rootStore, this.getModulePath(this, actionName), payload, options);
    };
    StoreModule.prototype.get = function (getterName) {
        return StoreModule.rootStore.getters[this.getModulePath(this, getterName)];
    };
    // FUNCTIONS
    StoreModule.prototype._processModulePath = function (module, path) {
        path = path || '';
        // prepend this module's name (if one is given)
        path = (module.moduleNamespace ? module.moduleNamespace + '/' : module.moduleNamespace || '') + path;
        // recursively get ancestor's paths
        return module.parentModule ? this._processModulePath(module.parentModule, path) : path;
    };
    return StoreModule;
}());
exports.default = StoreModule;
