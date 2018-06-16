import { StoreModule } from 'mmm-typed-vuex';
import { ActionContext, CommitOptions, DispatchOptions } from 'vuex';

export default class RootStoreModule extends StoreModule {
  // static helpers reference (only the RootStoreModule needs to do this)
  public static get actions(): RootStoreModule { return StoreModule.rootStoreModule as RootStoreModule; }
  public static get getters(): RootStoreModule { return StoreModule.rootStoreModule as RootStoreModule; }
  public static get mutations(): RootStoreModule { return StoreModule.rootStoreModule as RootStoreModule; }
  public static get state(): RootStoreModule { return StoreModule.vuexStore.state; }

  public static readonly COMMIT_INCREMENT: string = 'commitIncrement';
  public static readonly COMMIT_DECREMENT: string = 'commitDecrement';
  public static readonly DISPATCH_DECREMENT: string = 'dispatchDecrement';
  public static readonly GET_COUNTX10: string = 'getCountX10';

  // state property typings (these are not used to set or get values...only for typings)
  public count: number;

  // typed mutations commits, actions dispatches, and getter accessors
  public commitIncrement(payload: number, options?: CommitOptions) { return this.commit(RootStoreModule.COMMIT_INCREMENT, payload, options); }
  public dispatchDecrement(payload: number, options?: DispatchOptions) { return this.dispatch(RootStoreModule.DISPATCH_DECREMENT, payload, options); }
  public getCountX10(): number { return this.get(RootStoreModule.GET_COUNTX10); }

  constructor() {
    super('', false);

    this.setOptions(
      // this should be familiar to you...it's exactly what you've already been doing (no magic here)
      {
        state: {
          count: 0,
        },
        mutations: {
          [RootStoreModule.COMMIT_DECREMENT](state: RootStoreModule, payload: number) {
            state.count -= payload;
          },
          [RootStoreModule.COMMIT_INCREMENT](state: RootStoreModule, payload: number) {
            state.count += payload;
          },
        },
        actions: {
          [RootStoreModule.DISPATCH_DECREMENT](context: ActionContext<RootStoreModule, RootStoreModule>, payload: number) {
            context.commit(RootStoreModule.COMMIT_DECREMENT, payload);
          },
        },
        getters: {
          [RootStoreModule.GET_COUNTX10]: (state: RootStoreModule, getters: any): number => {
            return state.count * 10;
          },
        },
      },
    );
  }
}
