"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StoreModule = /** @class */ (function () {
    // CONSTRUCTOR
    function StoreModule(moduleNamespace, parentModule) {
        this.moduleNamespace = moduleNamespace;
        this.parentModule = typeof (parentModule) === 'boolean' ? undefined : parentModule;
        this._modulePathCacheMap = {};
    }
    // METHODS
    StoreModule.prototype.init = function (vuexStore) {
        StoreModule.vuexStore = vuexStore;
        StoreModule.rootStoreModule = this;
    };
    StoreModule.prototype.setOptions = function (options) {
        Object.assign(this, options);
    };
    StoreModule.prototype.getModulePath = function (module, path) {
        // use cached path OR determine path and cache that result
        return this._modulePathCacheMap[path] || (this._modulePathCacheMap[path] = this._processModulePath(module, path));
    };
    StoreModule.prototype.commit = function (mutationName, payload, options) {
        return StoreModule.vuexStore.commit.call(StoreModule.vuexStore, this.getModulePath(this, mutationName), payload, options);
    };
    StoreModule.prototype.dispatch = function (actionName, payload, options) {
        return StoreModule.vuexStore.dispatch.call(StoreModule.vuexStore, this.getModulePath(this, actionName), payload, options);
    };
    StoreModule.prototype.get = function (getterName) {
        return StoreModule.vuexStore.getters[this.getModulePath(this, getterName)];
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
exports.StoreModule = StoreModule;
