export class StoreModule {
  // STATIC PROPERTIES
  public static rootStoreModule: StoreModule;
  public static vuexStore: any;

  // PROPERTIES
  public moduleNamespace: string;
  public options: object;
  public parentModule: StoreModule;

  // VARIABLES
  protected _modulePathCacheMap: {[path: string]: string};

  // CONSTRUCTOR
  constructor(moduleNamespace: string, parentModule: StoreModule | boolean) {
    this.moduleNamespace = moduleNamespace;
    this.parentModule = typeof(parentModule) === 'boolean' ? undefined : parentModule;
    this._modulePathCacheMap = {};
  }

  // METHODS
  public init(vuexStore: any) {
    StoreModule.vuexStore = vuexStore;
    StoreModule.rootStoreModule = this;
  }

  public setOptions(options: object): void {
    this.options = options;
  }

  public getModulePath(module: StoreModule, path?: string): string {
    // use cached path OR determine path and cache that result
    return this._modulePathCacheMap[path] || (this._modulePathCacheMap[path] = this._processModulePath(module, path));
  }

  public commit(mutationName: string, payload?: any, options?: any): any {
    return StoreModule.vuexStore.commit.call(StoreModule.vuexStore, this.getModulePath(this, mutationName), payload, options);
  }

  public dispatch(actionName: string, payload?: any, options?: any): any {
    return StoreModule.vuexStore.dispatch.call(StoreModule.vuexStore, this.getModulePath(this, actionName), payload, options);
  }

  public get(getterName: string, getterFnParam?: any): any {
    if(getterFnParam) {
      return StoreModule.vuexStore.getters[this.getModulePath(this, getterName)](getterFnParam);
    }
    
    return StoreModule.vuexStore.getters[this.getModulePath(this, getterName)];
  }

  // FUNCTIONS
  protected _processModulePath(module: StoreModule, path?: string): string {
    path = path || '';
    // prepend this module's name (if one is given)
    path = (module.moduleNamespace ? module.moduleNamespace + '/' : module.moduleNamespace || '') + path;
    // recursively get ancestor's paths
    return module.parentModule ? this._processModulePath(module.parentModule, path) : path;
  }
}
