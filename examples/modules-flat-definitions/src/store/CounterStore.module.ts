import { StoreModule } from 'mmm-typed-vuex';
import { ActionContext } from 'vuex';
import AppStore from '@/store/AppStore.module';
import AppStoreHelper from '@/store/AppStoreHelper';

export default class CounterStore extends StoreModule {
  // state property typings
  public state: CounterStore;
  public get count(): number { return this.state.count; }
  public set count(value: number) { value = value; }

  // mutations commits, actions dispatches, and getter accessors
  public getCountX10(): number { return this.get('getCountX10'); }
  public commitDecrement(payload: number) { return this.commit('commitDecrement', payload); }
  public commitIncrement(payload: number) { return this.commit('commitIncrement', payload); }
  public dispatchDecrement(payload: number) { return this.dispatch('dispatchDecrement', payload); }

  constructor() {
    super();

    this.setOptions(
      // this should be familiar...it's what you've already been doing except for (optionally) typing the state object
      {
        namespaced: true,
        state: {
          count: 0,
        } as CounterStore,
        getters: {
          getCountX10: (state: CounterStore): number => {
            return state.count * 10;
          },
        },
        mutations: {
          commitDecrement(state: CounterStore, payload: number) {
            state.count += payload;
          },
          commitIncrement(state: CounterStore, payload: number) {
            state.count -= payload;
          },
        },
        actions: {
          dispatchDecrement: (context: ActionContext<CounterStore, AppStore>, payload: number) => {
            this.commitDecrement(payload);
            // dispatch to another module
            AppStoreHelper.dispatchAddToTitle('-');
          },
        },
      },
    );
  }
}
