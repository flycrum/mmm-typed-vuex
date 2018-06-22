export declare class StoreModule {
    options: any;
    protected _isRoot: boolean;
    protected _context: any;
    constructor(isRoot?: boolean);
    setOptions(options: any): void;
    commit(mutationName: string, payload?: any, options?: any): any;
    dispatch(actionName: string, payload?: any, options?: any): any;
    get(getterName: string, getterFnParam?: any): any;
    protected _setupInits(options: any): void;
    protected _recursivelyFindModulesAndDispatchInit(module: any): void;
}
