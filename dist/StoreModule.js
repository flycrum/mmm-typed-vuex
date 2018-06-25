"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StoreModule = /** @class */ (function () {
    // CONSTRUCTOR
    function StoreModule(isRoot) {
        this._isRoot = isRoot || false;
    }
    // METHODS
    StoreModule.prototype.setOptions = function (options) {
        this.options = options;
        this._setupInits(options);
    };
    StoreModule.prototype.commit = function (mutationName, payload, options) {
        return this._context.commit(mutationName, payload, options);
    };
    StoreModule.prototype.dispatch = function (actionName, payload, options) {
        return this._context.dispatch(actionName, payload, options);
    };
    StoreModule.prototype.get = function (getterName) {
        var getterFnParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            getterFnParams[_i - 1] = arguments[_i];
        }
        if (getterFnParams && getterFnParams.length > 0) {
            return (_a = this._context.getters)[getterName].apply(_a, getterFnParams);
        }
        return this._context.getters[getterName];
        var _a;
    };
    // FUNCTIONS
    StoreModule.prototype._setupInits = function (options) {
        var _this = this;
        var that = this;
        options.actions = options.actions || {};
        options.actions._mmmInit = function (context, module) {
            that._store = this;
            that._context = context;
            // this is the ole switcheroo...allowing each module to 'type' their 'state' property but then setting the underlying vuex state to it here
            that['state'] = context.state;
            if (options.actions.initModule) {
                context.dispatch('initModule', context, module);
            }
        };
        // if root store / module
        if (this._isRoot) {
            options.plugins = options.plugins || [];
            options.plugins.push(function (context) {
                if (context._modules && context._modules.root) {
                    _this._recursivelyFindModulesAndDispatchInit(context._modules.root);
                }
            });
        }
    };
    StoreModule.prototype._recursivelyFindModulesAndDispatchInit = function (module) {
        module.context.dispatch('_mmmInit', module.context, module);
        if (module._children) {
            for (var moduleName in module._children) {
                this._recursivelyFindModulesAndDispatchInit(module._children[moduleName]);
            }
        }
    };
    return StoreModule;
}());
exports.StoreModule = StoreModule;
function mmmState(target, propertyKey) {
    Object.defineProperty(target, propertyKey, {
        get: function () { return this.state[propertyKey]; },
    });
}
exports.mmmState = mmmState;
function mmmMutation() {
    return function (target, propertyKey, descriptor) {
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this.commit.apply(this, [propertyKey].concat(args));
        };
        return descriptor;
    };
}
exports.mmmMutation = mmmMutation;
function mmmAction() {
    return function (target, propertyKey, descriptor) {
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this.dispatch.apply(this, [propertyKey].concat(args));
        };
        return descriptor;
    };
}
exports.mmmAction = mmmAction;
function mmmGetter() {
    return function (target, propertyKey, descriptor) {
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this.get.apply(this, [propertyKey].concat(args));
        };
        return descriptor;
    };
}
exports.mmmGetter = mmmGetter;
