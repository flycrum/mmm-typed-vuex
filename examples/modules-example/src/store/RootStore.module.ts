import StoreModule from '../../../../dist/StoreModule';
import CounterStoreModule from '@/store/CounterStore.module';
import { CommitOptions, DispatchOptions } from 'vuex';

export default class RootStoreModule extends StoreModule {
  // static helpers reference (only the RootStoreModule needs this)
  public static helpers: RootStoreModule;
  // constants
  public static readonly GET_TITLE_WITH_CAPS: string = 'GET_TITLE_WITH_CAPS';

  // state property typings (these are not used to set or get values...only for typings)
  public title: string;

  // mutations commits, actions dispatches, and getter accessors
  public getTitleWithCaps(comp: any): string { return comp.$store.getters[this.getModulePath(this, RootStoreModule.GET_TITLE_WITH_CAPS)]; }

  // sub-modules (these are used to init the modules...as well for typings)
  public CounterStore: CounterStoreModule = new CounterStoreModule(this);

  constructor() {
    super();

    // store this instance as the global static helper instance
    RootStoreModule.helpers = this;
    // don't define a name for root because it's technically not a module nor does it have a namespace
    this._moduleNamespace = '';

    this.setOptions(
      // this should be familiar...it's exactly what you've already been doing (no magic here)
      {
        state: {
          title: 'Module Example',
        },
        getters: {
          [RootStoreModule.GET_TITLE_WITH_CAPS]: (state: RootStoreModule, getters: any): string => {
            return state.title.toUpperCase();
          },
        },
        modules: {
          CounterStore: this.CounterStore,
        },
      },
    );
  }
}
