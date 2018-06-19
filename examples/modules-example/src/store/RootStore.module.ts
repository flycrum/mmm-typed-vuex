import { StoreModule } from '../../../../dist/StoreModule';
import CounterStoreModule from '@/store/CounterStore.module';
import { ActionContext, DispatchOptions } from 'vuex';

export default class RootStore extends StoreModule {
  // static helpers reference (only the RootStore needs to do this)
  public static get(): RootStore { return StoreModule.rootStoreModule as RootStore; }

  // public static get actions(): RootStore { return StoreModule.rootStoreModule as RootStore; }
  // public static get getters(): RootStore { return StoreModule.rootStoreModule as RootStore; }
  // public static get mutations(): RootStore { return StoreModule.rootStoreModule as RootStore; }
  // public static get state(): RootStore { return StoreModule.vuexStore.state; }

  // constants
  public static readonly COMMIT_CHANGE: string = 'commitChange';
  public static readonly DISPATCH_CHANGE: string = 'dispatchChange';
  public static readonly GET_TITLE_WITH_CAPS: string = 'getTitleWithCaps';

  // state property typings
  public title: string;

  // mutations commits, actions dispatches, and getter accessors
  public dispatchChange(payload: string, options?: DispatchOptions) { return this.dispatch(RootStore.DISPATCH_CHANGE, payload, options); }
  public getTitleWithCaps(): string { return this.get(RootStore.GET_TITLE_WITH_CAPS); }

  public state(): RootStore {
    return StoreModule.vuexStore.state;
  }

  // sub-modules (these are used to init the modules...as well for typings)
  public CounterStore: CounterStoreModule = new CounterStoreModule(this);

  constructor() {
    super('', false);

    this.setOptions(
      // this should be familiar...it's exactly what you've already been doing (no magic here)
      {
        state: {
          title: 'Module Example',
        },
        mutations: {
          [RootStore.COMMIT_CHANGE](state: RootStore, payload: string) {
            state.title += payload;
          },
        },
        actions: {
          [RootStore.DISPATCH_CHANGE](context: ActionContext<RootStore, RootStore>, payload: string) {
            context.commit(RootStore.COMMIT_CHANGE, payload);
          },
        },
        getters: {
          [RootStore.GET_TITLE_WITH_CAPS]: (state: RootStore, getters: any): string => {
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
