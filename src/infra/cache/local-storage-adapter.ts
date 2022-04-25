/* eslint-disable @typescript-eslint/ban-types */
import { SetStorage } from '@/data/protocols/cache/set-storage';

export class LocalStorageAdapter implements SetStorage {
  set(key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
