export default class StoreModule {
    protected _moduleNamespace: string;
    protected _parentModule: StoreModule;
    protected _store: any;
    init(store: any): void;
    setOptions(options: any): void;
    protected _getModulePath(module: StoreModule, path?: string): string;
    protected _commit(commitFn: (type: string, payload?: any, options?: any) => void, mutationName: string, payload?: any, options?: any): any;
    protected _dispatch(dispatchFn: (type: string, payload?: any, options?: any) => void, actionName: string, payload?: any, options?: any): any;
    protected _get(getterName: string, component: any): any;
}
