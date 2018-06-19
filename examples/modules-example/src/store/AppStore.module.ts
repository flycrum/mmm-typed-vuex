import BaseAppStore from '@/store/BaseAppStore.module';
import CounterStore from '@/store/CounterStore.module';
import { ActionContext, DispatchOptions } from 'vuex';

export default class AppStore extends BaseAppStore {
  // static helpers reference (only the AppStore needs to do this)
  public static instance: AppStore;
  public static get(): AppStore { return AppStore.instance || (AppStore.instance = new AppStore()); }

  // state property typings
  public title: string;

  // mutations commits, actions dispatches, and getter accessors
  public commitChange(payload: string) { return this.commit('commitChange', payload); }
  public dispatchChange(payload: string, options?: DispatchOptions) { return this.dispatch('dispatchChange', payload, options); }
  public getTitleWithCaps(): string { return this.get('getTitleWithCaps'); }

  // sub-modules (these are used to init the modules...as well for typings)
  public CounterStore: CounterStore = new CounterStore(this);

  constructor() {
    super('', false);

    this.setOptions(
      // this should be familiar...it's what you've already been doing (no magic here)
      {
        state: {
          title: 'Module Example',
        },
        mutations: {
          commitChange(state: AppStore, payload: string) {
            state.title += payload;
          },
        },
        actions: {
          dispatchChange: (context: ActionContext<AppStore, AppStore>, payload: string) => {
            this.commitChange(payload);
          },
        },
        getters: {
          getTitleWithCaps: (state: AppStore, getters: any): string => {
            return state.title.toUpperCase();
          },
        },
        modules: {
          [this.CounterStore.moduleNamespace]: this.CounterStore.options,
        },
      },
    );
  }
}
