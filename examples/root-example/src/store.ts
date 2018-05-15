import Vue from 'vue';
import Vuex from 'vuex';
import RootStoreModule from '@/store/RootStore.module';

Vue.use(Vuex);

export default new Vuex.Store(new RootStoreModule());
