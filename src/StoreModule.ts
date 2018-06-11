export default class StoreModule {
  //
  // STATIC PROPERTIES
  //
  public static rootStore: any;

  //
  // VARIABLES
  //
  protected _moduleNamespace: string;
  protected _parentModule: StoreModule;
  protected _store: any;
  protected _modulePathCacheMap: {[path: string]: string};

  //
  // CONSTRUCTOR
  //

  constructor() {
    this._modulePathCacheMap = {};
  }

  //
  // METHODS
  //
  public init(store: any) {
    // store static reference
    StoreModule.rootStore = store;
  }

  public setOptions(options: any): void {
    Object.assign(this, options);
  }

  public getModulePath(module: StoreModule, path?: string): string {
    let cache: string = this._modulePathCacheMap[path];

    if(cache) {
      return cache;
    }

    return this._modulePathCacheMap[path] = this._processModulePath(module, path);
  }

  protected _commit(commitFn: (type: string, payload?: any, options?: any) => void, mutationName: string, payload?: any, options?: any): any {
    return commitFn(this.getModulePath(this, mutationName), payload, options);
  }

  protected _dispatch(dispatchFn: (type: string, payload?: any, options?: any) => void, actionName: string, payload?: any, options?: any): any {
    return dispatchFn(this.getModulePath(this, actionName), payload, options);
  }

  public get(getterName: string): any {
    return StoreModule.rootStore.getters[this.getModulePath(this, getterName)];
  }

  protected _processModulePath(module: StoreModule, path?: string): string {
    path = path || '';
    // prepend this module's name (if one is given)
    path = (module._moduleNamespace ? module._moduleNamespace + '/' : module._moduleNamespace || '') + path;
    // recursively get ancestor's paths
    return module._parentModule ? this._processModulePath(module._parentModule, path) : path;
  }
}
