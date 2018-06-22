import Vue from 'vue';
import Vuex from 'vuex';
import AppStore from '@/store/AppStore.module';

Vue.use(Vuex);

export default new Vuex.Store(AppStore.get().options);
