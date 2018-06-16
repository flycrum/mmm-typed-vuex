import { StoreModule } from '../../../../dist/StoreModule';
import CounterStoreModule from '@/store/CounterStore.module';
import { ActionContext, DispatchOptions } from 'vuex';

export default class RootStoreModule extends StoreModule {
  // static helpers reference (only the RootStoreModule needs to do this)
  public static get actions(): RootStoreModule { return StoreModule.rootStoreModule as RootStoreModule; }
  public static get getters(): RootStoreModule { return StoreModule.rootStoreModule as RootStoreModule; }
  public static get mutations(): RootStoreModule { return StoreModule.rootStoreModule as RootStoreModule; }
  public static get state(): RootStoreModule { return StoreModule.vuexStore.state; }

  // constants
  public static readonly COMMIT_CHANGE: string = 'commitChange';
  public static readonly DISPATCH_CHANGE: string = 'dispatchChange';
  public static readonly GET_TITLE_WITH_CAPS: string = 'getTitleWithCaps';

  // state property typings (these are not used to set or get values...only for typings)
  public title: string;

  // mutations commits, actions dispatches, and getter accessors
  public dispatchChange(payload: string, options?: DispatchOptions) { return this.dispatch(RootStoreModule.DISPATCH_CHANGE, payload, options); }
  public getTitleWithCaps(): string { return this.get(RootStoreModule.GET_TITLE_WITH_CAPS); }

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
          [RootStoreModule.COMMIT_CHANGE](state: RootStoreModule, payload: string) {
            state.title += payload;
          },
        },
        actions: {
          [RootStoreModule.DISPATCH_CHANGE](context: ActionContext<RootStoreModule, RootStoreModule>, payload: string) {
            context.commit(RootStoreModule.COMMIT_CHANGE, payload);
          },
        },
        getters: {
          [RootStoreModule.GET_TITLE_WITH_CAPS]: (state: RootStoreModule, getters: any): string => {
            return state.title.toUpperCase();
          },
        },
        modules: {
          [this.CounterStore.moduleNamespace]: this.CounterStore,
        },
      },
    );
  }
}
