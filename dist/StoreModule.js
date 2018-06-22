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
    StoreModule.prototype.get = function (getterName, getterFnParam) {
        if (getterFnParam) {
            return this._context.getters[getterName](getterFnParam);
        }
        return this._context.getters[getterName];
    };
    // FUNCTIONS
    StoreModule.prototype._setupInits = function (options) {
        var _this = this;
        options.actions = options.actions || {};
        options.actions._mmmInit = function (context, module) {
            // console.log('_mmmInit dispatched and received');
            _this._context = context;
            // this is the ole switcheroo...allowing each module to 'type' their 'state' property but then setting the underlying vuex state to it here
            _this['state'] = context.state;
            if (options.actions.initMmm) {
                context.dispatch('initMmm', context, module);
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
