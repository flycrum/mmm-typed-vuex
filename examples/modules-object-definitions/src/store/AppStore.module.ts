import { StoreModule } from '../../../../dist/StoreModule';
import CounterStore from '@/store/CounterStore.module';
import { ActionContext } from 'vuex';

export interface AppStoreStateI {
  title: string;
}

export default class AppStore extends StoreModule {
  // static helpers reference (only the AppStore needs to do this)
  public static instance: AppStore;
  public static get(): AppStore { return AppStore.instance || (AppStore.instance = new AppStore()); }

  // state property typings
  public state: AppStoreStateI;

  public getters: any = {
    titleWithCaps: (): number => { return this.get('titleWithCaps'); },
  };

  public mutations: any = {
    addToTitle: (payload: string) => { return this.commit('addToTitle', payload); },
  };

  public actions: any = {
    addToTitle: (payload: string) => { return this.dispatch('addToTitle', payload); },
  };

  // sub-modules (these are used to init the modules...as well for typings)
  public CounterStore: CounterStore = new CounterStore();

  constructor() {
    super(true);

    this.setOptions(
      // this should be familiar...it's what you've already been doing (no magic here)
      {
        state: {
          title: 'Object Module Definitions Example',
        } as AppStoreStateI,
        getters: {
          titleWithCaps: (state: AppStoreStateI, getters: any): string => {
            return state.title.toUpperCase();
          },
        },
        mutations: {
          addToTitle(state: AppStoreStateI, payload: string) {
            state.title += payload;
          },
        },
        actions: {
          initModule: (context: ActionContext<AppStoreStateI, AppStoreStateI>) => {
            this.mutations.addToTitle(' - initModule');
          },
          addToTitle: (context: ActionContext<AppStoreStateI, AppStoreStateI>, payload: string) => {
            this.mutations.addToTitle(payload);
          },
        },
        modules: {
          CounterStore: this.CounterStore.options,
        },
      },
    );
  }
}
