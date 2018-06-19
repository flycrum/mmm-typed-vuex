import BaseAppStore from '@/store/BaseAppStore.module';
import { ActionContext, CommitOptions, DispatchOptions } from 'vuex';
import AppStoreHelper from '../../../modules-example-objectify/src/store/AppStoreHelper';
import CounterStore from '../../../modules-example-objectify/src/store/CounterStore.module';

export default class AppStore extends BaseAppStore {
  // static helpers reference (only the AppStore needs to do this)
  public static instance: AppStore;
  public static get(): AppStore { return AppStore.instance || (AppStore.instance = new AppStore()); }

  // state property typings
  public count: number;

  // typed mutations commits, actions dispatches, and getter accessors
  public commitDecrement(payload: number) { return this.commit('commitDecrement', payload); }
  public commitIncrement(payload: number) { return this.commit('commitIncrement', payload); }
  public dispatchDecrement(payload: number) { return this.dispatch('dispatchDecrement', payload); }
  public getCountX10(): number { return this.get('getCountX10'); }

  constructor() {
    super('', false);

    this.setOptions(
      // this should be familiar to you...it's exactly what you've already been doing (no magic here)
      {
        state: {
          count: 0,
        },
        mutations: {
          commitDecrement(state: CounterStore, payload: number) {
            state.count += payload;
          },
          commitIncrement(state: CounterStore, payload: number) {
            state.count -= payload;
          },
        },
        actions: {
          dispatchDecrement: (context: ActionContext<CounterStore, AppStore>, payload: number) => {
            this.commitDecrement(payload);
          },
        },
        getters: {
          getCountX10: (state: CounterStore, getters: any): number => {
            return state.count * 10;
          },
        },
      },
    );
  }
}
