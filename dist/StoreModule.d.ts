export default class StoreModule {
    static rootStore: any;
    protected _moduleNamespace: string;
    protected _parentModule: StoreModule;
    protected _store: any;
    protected _modulePathCacheMap: {
        [path: string]: string;
    };
    constructor();
    init(store: any): void;
    setOptions(options: any): void;
    getModulePath(module: StoreModule, path?: string): string;
    protected _commit(commitFn: (type: string, payload?: any, options?: any) => void, mutationName: string, payload?: any, options?: any): any;
    protected _dispatch(dispatchFn: (type: string, payload?: any, options?: any) => void, actionName: string, payload?: any, options?: any): any;
    get(getterName: string): any;
    protected _processModulePath(module: StoreModule, path?: string): string;
}
