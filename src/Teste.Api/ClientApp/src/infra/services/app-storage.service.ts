import { Injectable, Inject } from '@angular/core';
import { SESSION_STORAGE, LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable()
export class AppStorageService {

  constructor(
    @Inject(SESSION_STORAGE) private session: StorageService,
    @Inject(LOCAL_STORAGE) private local: StorageService
  ) { }

  sessionSetItem(key: string, value: any): void {
    if (this.session.has(key) === true) {
      this.session.remove(key);
    }
    this.session.set(key, value);
  }

  sessionGetItem(key: string): any {
    return this.session.get(key);
  }

  sessionHasItem(key: string): boolean {
    return this.session.has(key);
  }

  sessionDeleteItem(key: string): void {
    this.session.remove(key);
  }

  sessionDispose(): void {
    this.session.clear();
  }

  localSetItem(key: string, value: any): void {
    if (this.local.has(key) === true) {
      this.local.remove(key);
    }
    this.local.set(key, value);
  }

  localGetItem(key: string): any {
    return this.local.get(key);
  }

  localHasItem(key: string): boolean {
    return this.local.has(key);
  }

  localDeleteItem(key: string): void {
    this.local.remove(key);
  }

  localDispose(): void {
    this.local.clear();
  }

}
