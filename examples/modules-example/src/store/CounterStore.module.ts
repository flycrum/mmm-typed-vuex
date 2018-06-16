import { ActionContext } from 'vuex';
import { StoreModule } from '../../../../dist/StoreModule';
import RootStoreModule from '@/store/RootStore.module';

export default class CounterStoreModule extends StoreModule {
  public static readonly COMMIT_INCREMENT: string = 'commitIncrement';
  public static readonly COMMIT_DECREMENT: string = 'commitDecrement';
  public static readonly DISPATCH_DECREMENT: string = 'dispatchDecrement';
  public static readonly GET_COUNTX10: string = 'getCountX10';

  // state property typings (these are not used to set or get values...only for typings)
  public count: number;

  // typed mutations commits, actions dispatches, and getter accessors
  public commitIncrement(payload: number) { return this.commit(CounterStoreModule.COMMIT_INCREMENT, payload); }
  public dispatchDecrement(payload: number) { return this.dispatch(CounterStoreModule.DISPATCH_DECREMENT, payload); }
  public getCountX10(): number { return this.get(CounterStoreModule.GET_COUNTX10); }

  constructor(parentModule: StoreModule) {
    super('CounterStore', parentModule);

    this.setOptions(
      // this should be familiar...it's exactly what you've already been doing (no magic here)
      {
        namespaced: true,
        state: {
          count: 0,
        },
        mutations: {
          [CounterStoreModule.COMMIT_DECREMENT](state: CounterStoreModule, payload: number) {
            state.count -= payload;
          },
          [CounterStoreModule.COMMIT_INCREMENT](state: CounterStoreModule, payload: number) {
            state.count += payload;
          },
        },
        actions: {
          [CounterStoreModule.DISPATCH_DECREMENT](context: ActionContext<CounterStoreModule, RootStoreModule>, payload: number) {
            context.commit(CounterStoreModule.COMMIT_DECREMENT, payload);
            // dispatch to another module
            RootStoreModule.actions.dispatchChange('-');
          },
        },
        getters: {
          [CounterStoreModule.GET_COUNTX10]: (state: CounterStoreModule, getters: any): number => {
            return state.count * 10;
          },
        },
      },
    );
  }
}


