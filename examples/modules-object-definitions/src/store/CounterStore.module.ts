import { StoreModule } from '../../../../dist/StoreModule';
import { ActionContext } from 'vuex';
import AppStore from '@/store/AppStore.module';
import AppStoreHelper from '@/store/AppStoreHelper';

export interface CounterStoreStateI {
  count: number;
}

export default class CounterStore extends StoreModule {
  // state property typings
  public state: CounterStoreStateI;

  public getters: any = {
    countX10: (): number => { return this.get('countX10'); },
  };

  public mutations: any = {
    decrement: (payload: number) => { return this.commit('decrement', payload); },
    increment: (payload: number) => { return this.commit('increment', payload); },
  };

  public actions: any = {
    decrement: (payload: number) => { return this.dispatch('decrement', payload); },
  };

  constructor() {
    super();

    this.setOptions(
      // this should be familiar...it's what you've already been doing except for (optionally) typing the state object
      {
        namespaced: true,
        state: {
          count: 0,
        } as CounterStoreStateI,
        getters: {
          countX10: (state: CounterStoreStateI): number => {
            return state.count * 10;
          },
        },
        mutations: {
          decrement(state: CounterStoreStateI, payload: number) {
            state.count -= payload;
          },
          increment(state: CounterStoreStateI, payload: number) {
            state.count += payload;
          },
        },
        actions: {
          decrement: (context: ActionContext<CounterStoreStateI, AppStore>, payload: number) => {
            this.mutations.decrement(payload);
            // dispatch to another module
            AppStoreHelper.actions.addToTitle('-');
          },
        },
      },
    );
  }
}
