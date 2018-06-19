import BaseAppStore from '../../../modules-example/src/store/BaseAppStore.module';
import CounterStoreModule from '../../../modules-example/src/store/CounterStore.module';
import { ActionContext, CommitOptions, DispatchOptions } from 'vuex';

export default class AppStore extends BaseAppStore {
  // static helpers reference (only the AppStore needs to do this)
  public static instance: AppStore;
  public static get(): AppStore { return AppStore.instance || (AppStore.instance = new AppStore()); }

  public static readonly COMMIT_INCREMENT: string = 'commitIncrement';
  public static readonly COMMIT_DECREMENT: string = 'commitDecrement';
  public static readonly DISPATCH_DECREMENT: string = 'dispatchDecrement';
  public static readonly GET_COUNTX10: string = 'getCountX10';

  // state property typings
  public count: number;

  // typed mutations commits, actions dispatches, and getter accessors
  public commitIncrement(payload: number) { return this.commit(AppStore.COMMIT_INCREMENT, payload); }
  public commitDecrement(payload: number, options?: CommitOptions) { return this.commit(AppStore.COMMIT_INCREMENT, payload, options); }
  public dispatchDecrement(payload: number, options?: DispatchOptions) { return this.dispatch(AppStore.DISPATCH_DECREMENT, payload, options); }
  public getCountX10(): number { return this.get(AppStore.GET_COUNTX10); }

  constructor() {
    super('', false);

    this.setOptions(
      // this should be familiar to you...it's exactly what you've already been doing (no magic here)
      {
        state: {
          count: 0,
        },
        mutations: {
          commitIncrement(state: CounterStoreModule, payload: number) {
            state.count -= payload;
          },
          commitDecrement(state: CounterStoreModule, payload: number) {
            state.count += payload;
          },
        },
        actions: {
          dispatchDecrement: (context: ActionContext<CounterStoreModule, AppStore>, payload: number) => {
            this.commitDecrement(payload);
          },
        },
        getters: {
          getCountX10: (state: CounterStoreModule, getters: any): number => {
            return state.count * 10;
          },
        },
      },
    );
  }
}
