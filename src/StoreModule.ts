export default class StoreModule {
  //
  // STATIC PROPERTIES
  //
  // public static rootStore: any;

  //
  // VARIABLES
  //
  protected _moduleNamespace: string;
  protected _parentModule: StoreModule;
  protected _store: any;

  //
  // METHODS
  //
  public init(store: any) {
    // store static reference
    //StoreModule.rootStore = store;

    // set on the vuex store instance
    // store.mmm = this;
  }

  public setOptions(options: any): void {
    Object.assign(this, options);
  }

  // TODO - lazy set once (cache initial result and use that every subsequent request)
  protected _getModulePath(module: StoreModule, path?: string): string {
    path = path || '';
    // prepend this module's name (if one is given)
    path = (module._moduleNamespace ? module._moduleNamespace + '/' : module._moduleNamespace || '') + path;
    // recursively get ancestor's paths
    return module._parentModule ? this._getModulePath(module._parentModule, path) : path;
  }

  protected _commit(commitFn: (type: string, payload?: any, options?: any) => void, mutationName: string, payload?: any, options?: any): any {
    return commitFn(this._getModulePath(this, mutationName), payload, options);
  }

  protected _dispatch(dispatchFn: (type: string, payload?: any, options?: any) => void, actionName: string, payload?: any, options?: any): any {
    return dispatchFn(this._getModulePath(this, actionName), payload, options);
  }

  protected _get(getterName: string, component: any): any {
    return component.$store.getters[this._getModulePath(this, getterName)];
  }
}
