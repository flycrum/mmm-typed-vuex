import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: 'Module Example',
  },
  modules: {
    CounterStore: {
      namespaced: true,
      state: {
        count: 0,
      },
      mutations: {
        decrement(state, payload) {
          state.count -= payload;
        },
        increment(state, payload: number) {
          state.count += payload;
        },
      },
      actions: {
        decrement(context, payload) {
          context.commit('decrement', payload);
        },
      },
      getters: {
        countX10: (state, getters) => {
          return state.count * 10;
        },
      },
    },
  },
});
