import { ActionContext } from 'vuex';
import { StoreModule } from '../../../../dist/StoreModule';
import RootStore from '@/store/RootStore.module';
import BaseAppStore from '@/store/BaseAppStore.module';

export default class CounterStoreModule extends BaseAppStore {
  // state property typings
  public get count(): number { return this.state().CounterStore.count; }
  public set count(value: number) {}

  // typed mutations commits, actions dispatches, and getter accessors
  public commitDecrement(payload: number) { return this.commit('commitDecrement', payload); }
  public commitIncrement(payload: number) { return this.commit('commitIncrement', payload); }
  public dispatchDecrement(payload: number) { return this.dispatch('dispatchDecrement', payload); }
  public getCountX10(): number { return this.get('getCountX10'); }

  constructor(parentModule: StoreModule) {
    super('CounterStore', parentModule);

    this.setOptions(
      // this should be familiar...it's what you've already been doing (no magic here)
      {
        namespaced: true,
        state: {
          count: 0,
        },
        mutations: {
          commitIncrement(state: CounterStoreModule, payload: number) {
            state.count -= payload;
          },
          commitDecrement(state: CounterStoreModule, payload: number) {
            state.count += payload;
          },
        },
        actions: {
          dispatchDecrement: (context: ActionContext<CounterStoreModule, RootStore>, payload: number) => {
            this.commitDecrement(payload);
            // dispatch to another module
            RootStore.get().dispatchChange('-');
          },
        },
        getters: {
          getCountX10: (state: CounterStoreModule, getters: any): number => {
            return state.count * 10;
          },
        },
      },
    );
  }
}


