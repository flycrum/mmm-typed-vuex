import { StoreModule } from 'mmm-typed-vuex';
import { ActionContext, CommitOptions, DispatchOptions } from 'vuex';

export default class RootStore extends StoreModule {
  // static helpers reference (only the RootStore needs to do this)
  public static get actions(): RootStore { return StoreModule.rootStoreModule as RootStore; }
  public static get getters(): RootStore { return StoreModule.rootStoreModule as RootStore; }
  public static get mutations(): RootStore { return StoreModule.rootStoreModule as RootStore; }
  public static get state(): RootStore { return StoreModule.vuexStore.state; }

  public static readonly COMMIT_INCREMENT: string = 'commitIncrement';
  public static readonly COMMIT_DECREMENT: string = 'commitDecrement';
  public static readonly DISPATCH_DECREMENT: string = 'dispatchDecrement';
  public static readonly GET_COUNTX10: string = 'getCountX10';

  // state property typings (these are not used to set or get values...only for typings)
  public count: number;

  // typed mutations commits, actions dispatches, and getter accessors
  public commitIncrement(payload: number, options?: CommitOptions) { return this.commit(RootStore.COMMIT_INCREMENT, payload, options); }
  public dispatchDecrement(payload: number, options?: DispatchOptions) { return this.dispatch(RootStore.DISPATCH_DECREMENT, payload, options); }
  public getCountX10(): number { return this.get(RootStore.GET_COUNTX10); }

  constructor() {
    super('', false);

    this.setOptions(
      // this should be familiar to you...it's exactly what you've already been doing (no magic here)
      {
        state: {
          count: 0,
        },
        mutations: {
          [RootStore.COMMIT_DECREMENT](state: RootStore, payload: number) {
            state.count -= payload;
          },
          [RootStore.COMMIT_INCREMENT](state: RootStore, payload: number) {
            state.count += payload;
          },
        },
        actions: {
          [RootStore.DISPATCH_DECREMENT](context: ActionContext<RootStore, RootStore>, payload: number) {
            context.commit(RootStore.COMMIT_DECREMENT, payload);
          },
        },
        getters: {
          [RootStore.GET_COUNTX10]: (state: RootStore, getters: any): number => {
            return state.count * 10;
          },
        },
      },
    );
  }
}
