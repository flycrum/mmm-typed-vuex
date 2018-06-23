export class StoreModule {
  // PROPERTIES

  public options: any; // the vuex options object used to register the store

  // VARIABLES

  protected _context: any; // the content for for this module
  protected _isRoot: boolean; // whether this is the root module as seen in the store
  protected _store: any;

  // CONSTRUCTOR

  constructor(isRoot ?: boolean) {
    this._isRoot = isRoot || false;
  }

  // METHODS

  public setOptions(options: any): void {
    this.options = options;
    this._setupInits(options);
  }

  public commit(mutationName: string, payload?: any, options?: any): any {
    return this._context.commit(mutationName, payload, options);
  }

  public dispatch(actionName: string, payload?: any, options?: any): any {
    return this._context.dispatch(actionName, payload, options);
  }

  public get(getterName: string, getterFnParam?: any): any {
    if(getterFnParam) {
      return this._context.getters[getterName](getterFnParam);
    }

    return this._context.getters[getterName];
  }

  // FUNCTIONS

  protected _setupInits(options: any) {
    const that = this;

    options.actions = options.actions || {};
    options.actions._mmmInit = function(context: any, module: any) {
      that._store = this;
      that._context = context;
      // this is the ole switcheroo...allowing each module to 'type' their 'state' property but then setting the underlying vuex state to it here
      that['state'] = context.state;

      if(options.actions.initModule) {
        context.dispatch('initModule', context, module);
      }
    };

    // if root store / module
    if(this._isRoot) {
      options.plugins = options.plugins || [];
      options.plugins.push(
        (context: any) => {
          if(context._modules && context._modules.root) {
            this._recursivelyFindModulesAndDispatchInit(context._modules.root);
          }
        }
      );
    }
  }

  protected _recursivelyFindModulesAndDispatchInit(module: any) {
    module.context.dispatch('_mmmInit', module.context, module);

    if(module._children) {
      for(const moduleName in module._children) {
        this._recursivelyFindModulesAndDispatchInit(module._children[moduleName]);
      }
    }
  }
}
