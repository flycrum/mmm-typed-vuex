import Vue from 'vue';
import Vuex from 'vuex';
import RootStore from '@/store/RootStore.module';

Vue.use(Vuex);

const root: RootStore = new RootStore();
const store = new Vuex.Store(root.options);
root.init(store);

export default store;
