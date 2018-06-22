import { StoreModule } from '../../../../dist/StoreModule';
import { ActionContext } from 'vuex';
import AppStore from '@/store/AppStore.module';
import AppStoreHelper from '@/store/AppStoreHelper';

export default class CounterStore extends StoreModule {
  get count() { return this.state.count; }

  // mutations commits, actions dispatches, and getter accessors
  getCountX10() { return this.get('getCountX10'); }
  commitDecrement(payload) { return this.commit('commitDecrement', payload); }
  commitIncrement(payload) { return this.commit('commitIncrement', payload); }
  dispatchDecrement(payload) { return this.dispatch('dispatchDecrement', payload); }

  constructor() {
    super();

    this.setOptions(
      // this should be familiar...it's what you've already been doing except for (optionally) typing the state object
      {
        namespaced: true,
        state: {
          count: 0,
        },
        getters: {
          getCountX10: (state) => {
            return state.count * 10;
          },
        },
        mutations: {
          commitDecrement(state, payload) {
            state.count -= payload;
          },
          commitIncrement(state, payload) {
            state.count += payload;
          },
        },
        actions: {
          dispatchDecrement: (context, payload) => {
            this.commitDecrement(payload);
            // dispatch to another module
            AppStoreHelper.dispatchAddToTitle('-');
          },
        },
      },
    );
  }
}
