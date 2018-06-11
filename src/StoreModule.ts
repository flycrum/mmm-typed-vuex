export default class StoreModule {
  // STATIC PROPERTIES
  public static rootStore: any;

  // VARIABLES
  protected _moduleNamespace: string;
  protected _parentModule: StoreModule;
  protected _modulePathCacheMap: {[path: string]: string};

  // CONSTRUCTOR
  constructor() {
    this._modulePathCacheMap = {};
  }

  // METHODS
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

  public commit(mutationName: string, payload?: any, options?: any): any {
    return StoreModule.rootStore.commit.call(StoreModule.rootStore, this.getModulePath(this, mutationName), payload, options);
  }

  public dispatch(actionName: string, payload?: any, options?: any): any {
    return StoreModule.rootStore.dispatch.call(StoreModule.rootStore, this.getModulePath(this, actionName), payload, options);
  }

  public get(getterName: string): any {
    return StoreModule.rootStore.getters[this.getModulePath(this, getterName)];
  }

  // FUNCTIONS
  protected _processModulePath(module: StoreModule, path?: string): string {
    path = path || '';
    // prepend this module's name (if one is given)
    path = (module._moduleNamespace ? module._moduleNamespace + '/' : module._moduleNamespace || '') + path;
    // recursively get ancestor's paths
    return module._parentModule ? this._processModulePath(module._parentModule, path) : path;
  }
}
