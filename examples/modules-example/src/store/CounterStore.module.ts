import { ActionContext, CommitOptions, DispatchOptions } from 'vuex';
import StoreModule from '../../../../dist/StoreModule';
import RootStoreModule from '@/store/RootStore.module';

export default class CounterStoreModule extends StoreModule {
  public static readonly INCREMENT: string = 'increment';
  public static readonly DECREMENT: string = 'decrement';
  public static readonly COUNTX10: string = 'countX10';

  // state property typings (these are not used to set or get values...only for typings)
  public count: number;

  // typed mutations commits, actions dispatches, and getter accessors
  public dispatchDecrement(payload: number, options?: DispatchOptions) { return this.dispatch(CounterStoreModule.DECREMENT, payload, options); }
  public commitIncrement(payload: number, options?: CommitOptions) { return this.commit(CounterStoreModule.INCREMENT, payload, options); }
  public getCountX10(): number { return this.get(CounterStoreModule.COUNTX10); }

  constructor(parentModule: StoreModule) {
    super();

    this._moduleNamespace = 'CounterStore';
    this._parentModule = parentModule;

    this.setOptions(
      // this should be familiar...it's exactly what you've already been doing (no magic here)
      {
        namespaced: true,
        state: {
          count: 0,
        },
        mutations: {
          [CounterStoreModule.DECREMENT](state: CounterStoreModule, payload: number) {
            state.count -= payload;
          },
          [CounterStoreModule.INCREMENT](state: CounterStoreModule, payload: number) {
            state.count += payload;
          },
        },
        actions: {
          [CounterStoreModule.DECREMENT](context: ActionContext<CounterStoreModule, RootStoreModule>, payload: number) {
            context.commit(CounterStoreModule.DECREMENT, payload);
            // dispatch to another module
            RootStoreModule.helpers.dispatchChange('-');
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


