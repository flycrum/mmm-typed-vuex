import AppStore from '@/store/AppStore.module';
import { StoreModule } from '../../../../dist/StoreModule';

export default class BaseAppStore extends StoreModule {
  // convenience method to get state and type it to AppStore
  public state(): AppStore {
    return StoreModule.vuexStore.state;
  }
}
