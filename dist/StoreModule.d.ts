export declare class StoreModule {
    options: any;
    protected _context: any;
    protected _isRoot: boolean;
    protected _store: any;
    constructor(isRoot?: boolean);
    setOptions(options: any): void;
    commit(mutationName: string, payload?: any, options?: any): any;
    dispatch(actionName: string, payload?: any, options?: any): any;
    get(getterName: string, ...getterFnParams: any[]): any;
    protected _setupInits(options: any): void;
    protected _recursivelyFindModulesAndDispatchInit(module: any): void;
}
export declare function mmmState(target: object, propertyKey: string | symbol): void;
export declare function mmmMutation(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
export declare function mmmAction(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
export declare function mmmGetter(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;
