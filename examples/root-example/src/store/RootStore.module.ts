import StoreModule from '../../../../dist/StoreModule';
import { ActionContext, CommitOptions, DispatchOptions } from 'vuex';
import CounterStoreModule from '../../../modules-example/src/store/CounterStore.module';

export default class RootStoreModule extends StoreModule {
  // static helpers reference (only the RootStoreModule needs this)
  public static helpers: RootStoreModule;

  public static readonly INCREMENT: string = 'increment';
  public static readonly DECREMENT: string = 'decrement';
  public static readonly COUNTX10: string = 'countX10';

  // state property typings (these are not used to set or get values...only for typings)
  public count: number;

  // typed mutations commits, actions dispatches, and getter accessors
  public dispatchDecrement(payload: number, options?: DispatchOptions) { return this.dispatch(CounterStoreModule.DECREMENT, payload, options); }
  public commitIncrement(payload: number, options?: CommitOptions) { return this.commit(CounterStoreModule.INCREMENT, payload, options); }
  public getCountX10(): number { return this.get(CounterStoreModule.COUNTX10); }

  constructor() {
    super();

    // store this instance as the global static helper instance
    RootStoreModule.helpers = this;
    // don't define a name for root because it's technically not a module nor does it have a namespace
    this.moduleNamespace = '';

    this.setOptions(
      // this should be familiar to you...it's exactly what you've already been doing (no magic here)
      {
        state: {
          count: 0,
        },
        mutations: {
          [RootStoreModule.DECREMENT](state: RootStoreModule, payload: number) {
            state.count -= payload;
          },
          [RootStoreModule.INCREMENT](state: RootStoreModule, payload: number) {
            state.count += payload;
          },
        },
        actions: {
          [RootStoreModule.DECREMENT](context: ActionContext<RootStoreModule, RootStoreModule>, payload: number) {
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
