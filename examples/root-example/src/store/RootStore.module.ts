import { StoreModule } from '../../../../dist/StoreModule';
import { ActionContext, CommitOptions, DispatchOptions } from 'vuex';

export default class RootStoreModule extends StoreModule {
  public static readonly INCREMENT: string = 'increment';
  public static readonly DECREMENT: string = 'decrement';
  public static readonly COUNTX10: string = 'countX10';

  // state property typings
  // these are not used to set or get values...only for typings
  public count: number;
  public module: RootStoreModule;

  // typed mutations commits, actions dispatches, and getter accessors
  public dispatchDecrement(payload: number, options?: DispatchOptions) { return [this._getModulePath(this, RootStoreModule.DECREMENT), payload, options]; }
  public commitIncrement(payload: number, options?: CommitOptions) { return [this._getModulePath(this, RootStoreModule.INCREMENT), payload, options]; }
  public getCountX10(comp: any): number { return comp.$store.getters[this._getModulePath(this, RootStoreModule.COUNTX10)]; }

  constructor() {
    super();

    // don't define a name for root because it's technically not a module nor does it have a namespace
    this._moduleNamespace = '';

    this.setOptions(
      // this should be familiar to you...it's exactly what you've already been doing (no magic here)
      {
        state: Object.assign(this._generateState(), {
          count: 0,
        }),
        mutations: {
          [RootStoreModule.DECREMENT](state: RootStoreModule, payload: number) {
            state.count -= payload;
          },
          [RootStoreModule.INCREMENT](state: RootStoreModule, payload: number) {
            state.count += payload;
          },
        },
        actions: {
          [RootStoreModule.DECREMENT](context: ActionContext<any, any>, payload: number) {
            context.commit(RootStoreModule.DECREMENT, payload);
          },
        },
        getters: {
          [RootStoreModule.COUNTX10]: (state: RootStoreModule, getters: any): number => {
            return state.count * 10;
          },
        },
      },
    );
  }
}
