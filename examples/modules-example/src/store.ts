import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import RootStoreModule from '@/store/RootStore.module';

Vue.use(Vuex);

const root: RootStoreModule = new RootStoreModule();
const store = new Vuex.Store(root as StoreOptions<{}>);
root.init(store);

export default store;
