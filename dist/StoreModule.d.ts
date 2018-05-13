export interface StoreModuleI {
    namespaced?: boolean;
    state?: {};
    getters?: {};
    actions?: {};
    mutations?: {};
    modules?: {};
}
export declare class StoreModule implements StoreModuleI {
    namespaced: boolean;
    state: {};
    getters: {};
    actions: {};
    mutations: {};
    modules: {};
    protected _moduleNamespace: string;
    protected _parentModule: StoreModule;
    protected _mixinOptions(options: StoreModuleI): void;
    protected _generateState(): any;
    protected _getModulePath(module: StoreModule, path?: string): string;
}
