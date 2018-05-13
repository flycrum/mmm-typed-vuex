export interface StoreModuleI {
  namespaced?: boolean;
  state?: {};
  getters?: {};
  actions?: {};
  mutations?: {};
  modules?: {};
}

export class StoreModule implements StoreModuleI {
  public namespaced: boolean;
  public state: {};
  public getters: {};
  public actions: {};
  public mutations: {};
  public modules: {};

  protected _moduleNamespace: string;
  protected _parentModule: StoreModule;

  protected _mixinOptions(options: StoreModuleI): void {
    Object.assign(this, options);
  }

  // dynamically generated state with module reference
  protected _generateState(): any {
    return {
      module: this,
    };
  }

  protected _getModulePath(module: StoreModule, path?: string): string {
    path = path || '';
    // prepend this module's name (if one is given)
    path = (module._moduleNamespace ? module._moduleNamespace + '/' : module._moduleNamespace || '') + path;
    // recursively get ancestor's paths
    return module._parentModule ? this._getModulePath(module._parentModule, path) : path;
  }
}
