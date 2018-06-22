import { StoreModule } from '../../../../dist/StoreModule';
import CounterStore from '@/store/CounterStore.module';
import { ActionContext } from 'vuex';

export default class AppStore extends StoreModule {
  // static helpers reference (only the AppStore needs to do this)
  public static instance: AppStore;
  public static get(): AppStore { return AppStore.instance || (AppStore.instance = new AppStore()); }

  // state property typings
  public state: AppStore;
  public get title(): string { return this.state.title; }
  public set title(value: string) { value = value; }

  // mutations commits, actions dispatches, and getter accessors
  public commitAddToTitle(payload: string) { return this.commit('commitAddToTitle', payload); }
  public dispatchAddToTitle(payload: string) { return this.dispatch('dispatchAddToTitle', payload); }
  public getTitleWithCaps(): string { return this.get('titleWithCaps'); }

  // sub-modules (these are used to init the modules...as well for typings)
  public CounterStore: CounterStore = new CounterStore();

  constructor() {
    super(true);

    this.setOptions(
      // this should be familiar...it's what you've already been doing (no magic here)
      {
        state: {
          title: 'Flat Module Definitions Example',
        } as AppStore,
        getters: {
          titleWithCaps: (state: AppStore, getters: any): string => {
            return state.title.toUpperCase();
          },
        },
        mutations: {
          commitAddToTitle(state: AppStore, payload: string) {
            state.title += payload;
          },
        },
        actions: {
          initMmm: (context: ActionContext<AppStore, AppStore>) => {
            this.commitAddToTitle(' - initMmm');
          },
          dispatchAddToTitle: (context: ActionContext<AppStore, AppStore>, payload: string) => {
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
