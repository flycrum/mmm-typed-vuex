"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StoreModule = /** @class */ (function () {
    function StoreModule() {
    }
    //
    // METHODS
    //
    StoreModule.prototype.init = function (store) {
        // store static reference
        //StoreModule.rootStore = store;
        // set on the vuex store instance
        // store.mmm = this;
    };
    StoreModule.prototype.setOptions = function (options) {
        Object.assign(this, options);
    };
    // TODO - lazy set once (cache initial result and use that every subsequent request)
    StoreModule.prototype._getModulePath = function (module, path) {
        path = path || '';
        // prepend this module's name (if one is given)
        path = (module._moduleNamespace ? module._moduleNamespace + '/' : module._moduleNamespace || '') + path;
        // recursively get ancestor's paths
        return module._parentModule ? this._getModulePath(module._parentModule, path) : path;
    };
    StoreModule.prototype._commit = function (commitFn, mutationName, payload, options) {
        return commitFn(this._getModulePath(this, mutationName), payload, options);
    };
    StoreModule.prototype._dispatch = function (dispatchFn, actionName, payload, options) {
        return dispatchFn(this._getModulePath(this, actionName), payload, options);
    };
    StoreModule.prototype._get = function (getterName, component) {
        return component.$store.getters[this._getModulePath(this, getterName)];
    };
    return StoreModule;
}());
exports.default = StoreModule;
