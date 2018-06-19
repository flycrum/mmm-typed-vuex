import { StoreModule } from '../../../../dist/StoreModule';
import RootStore from '@/store/RootStore.module';

export default class BaseAppStore extends StoreModule {
  // convenience method to get state and type it to AppStore
  public state(): RootStore {
    return StoreModule.vuexStore.state;
  }

  // constructor() {
  //   super('', false);
  // }
}
