import { StoreModule } from '../../../../dist/StoreModule';
import CounterStore from '@/store/CounterStore.module';

export default class AppStore extends StoreModule {
  // static helpers reference (only the AppStore needs to do this)
  static instance;
  static get() { return AppStore.instance || (AppStore.instance = new AppStore()); }

  // mutations commits, actions dispatches, and getter accessors
  commitAddToTitle(payload) { return this.commit('commitAddToTitle', payload); }
  dispatchAddToTitle(payload) { return this.dispatch('dispatchAddToTitle', payload); }
  getTitleWithCaps() { return this.get('titleWithCaps'); }

  CounterStore = new CounterStore();

  constructor() {
    super(true);

    this.setOptions(
      // this should be familiar...it's what you've already been doing (no magic here)
      {
        state: {
          title: 'Flat Module Definitions Example',
        },
        getters: {
          titleWithCaps: (state, getters) => {
            return state.title.toUpperCase();
          },
        },
        mutations: {
          commitAddToTitle(state, payload) {
            state.title += payload;
          },
        },
        actions: {
          initMmm: (context) => {
            this.commitAddToTitle(' - initMmm');
          },
          dispatchAddToTitle: (context, payload) => {
            this.commitAddToTitle(payload);
          },
        },
        modules: {
          CounterStore: this.CounterStore.options,
        },
      },
    );
  }
}
