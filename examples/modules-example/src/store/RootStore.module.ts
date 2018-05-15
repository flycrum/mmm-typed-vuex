import { StoreModule } from '../../../../dist/StoreModule';
import CounterStoreModule from '@/store/CounterStore.module';

export default class RootStoreModule extends StoreModule {
  // state property typings
  // these are not used to set or get values...only for typings
  public title: string;
  public module: RootStoreModule;

  // sub-modules
  // these are used to init the modules...as well for typings
  public CounterStore: CounterStoreModule = new CounterStoreModule(this);

  constructor() {
    super();

    // don't define a name for root because it's technically not a module nor does it have a namespace
    this._moduleNamespace = '';

    this._mixinOptions(
      {
        state: Object.assign(this._generateState(), {
          title: 'Module Example',
        }),
        modules: {
          CounterStore: this.CounterStore,
        },
      },
    );
  }
}
