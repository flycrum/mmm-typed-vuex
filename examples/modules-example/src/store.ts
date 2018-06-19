import Vue from 'vue';
import Vuex from 'vuex';
import AppStore from '@/store/AppStore.module';

Vue.use(Vuex);

const appStore = AppStore.get();
const store = new Vuex.Store(appStore.options);
appStore.init(store);

export default store;
