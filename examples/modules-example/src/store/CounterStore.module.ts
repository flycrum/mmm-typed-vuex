import { ActionContext, CommitOptions, DispatchOptions } from 'vuex';
import { StoreModule } from '../../../../dist/StoreModule';

export default class CounterStoreModule extends StoreModule {
  public static readonly INCREMENT: string = 'increment';
  public static readonly DECREMENT: string = 'decrement';
  public static readonly COUNTX10: string = 'countX10';

  // state property typings
  // these are not used to set or get values...only for typings
  public count: number;
  public module: CounterStoreModule;

  // typed mutations commits, actions dispatches, and getter accessors
  public dispatchDecrement(payload: number, options?: DispatchOptions) { return [this._getModulePath(this, CounterStoreModule.DECREMENT), payload, options]; }
  public commitIncrement(payload: number, options?: CommitOptions) { return [this._getModulePath(this, CounterStoreModule.INCREMENT), payload, options]; }
  public getCountX10(comp: any): number { return comp.$store.getters[this._getModulePath(this, CounterStoreModule.COUNTX10)]; }

  constructor(parentModule: StoreModule) {
    super();

    this._moduleNamespace = 'CounterStore';
    this._parentModule = parentModule;

    this._mixinOptions(
      // this should be familiar to you...it's exactly what you've already been doing (no magic here)
      {
        namespaced: true,
        state: Object.assign(this._generateState(), {
          count: 0,
        }),
        mutations: {
          [CounterStoreModule.DECREMENT](state: CounterStoreModule, payload: number) {
            state.count -= payload;
          },
          [CounterStoreModule.INCREMENT](state: CounterStoreModule, payload: number) {
            state.count += payload;
          },
        },
        actions: {
          [CounterStoreModule.DECREMENT](context: ActionContext<any, any>, payload: number) {
            context.commit(CounterStoreModule.DECREMENT, payload);
          },
        },
        getters: {
          [CounterStoreModule.COUNTX10]: (state: CounterStoreModule, getters: any): number => {
            return state.count * 10;
          },
        },
      },
    );
  }
}


