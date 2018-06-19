export declare class StoreModule {
    static rootStoreModule: StoreModule;
    static vuexStore: any;
    moduleNamespace: string;
    options: object;
    parentModule: StoreModule;
    protected _modulePathCacheMap: {
        [path: string]: string;
    };
    constructor(moduleNamespace: string, parentModule: StoreModule | boolean);
    init(vuexStore: any): void;
    setOptions(options: object): void;
    getModulePath(module: StoreModule, path?: string): string;
    commit(mutationName: string, payload?: any, options?: any): any;
    dispatch(actionName: string, payload?: any, options?: any): any;
    get(getterName: string, getterFnParam?: any): any;
    protected _processModulePath(module: StoreModule, path?: string): string;
}
