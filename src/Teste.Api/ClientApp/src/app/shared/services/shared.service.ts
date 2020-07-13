import { Injectable, EventEmitter, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AppStorageService } from 'src/infra/services/app-storage.service';

@Injectable()
export class SharedService {

  debounce: Function;
  static emitters: { [eventName: string]: EventEmitter<any> } = {};

  constructor(
    private readonly http: HttpClient,
    private readonly storageService: AppStorageService,
    private readonly router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.debounce = this.debounceEvent();
  }

  static getEmitter(eventName: string): EventEmitter<any> {
    if (!this.emitters[eventName]) {
      this.emitters[eventName] = new EventEmitter<any>();
    }

    return this.emitters[eventName];
  }

  clearSession() {
    this.storageService.localDispose();
    this.storageService.sessionDispose();
  }

  onSubmitEnterKey(evt: any, callback: Function): void {
    if (evt.which === 13 || evt.keyCode === 13 ||
      evt.key === 'Enter' || evt.code === 'Enter') {
      callback();
    }
  }

  debounceEvent(time: any = null): any {
    return (fn: Function, wait: number = 1000) => {
      clearTimeout(time);
      time = setTimeout(() => fn(), wait);
    };
  }

  desktopMode(width: number = 767): boolean {
    if (window.innerWidth > width) {
      return true;
    }
    return false;
  }

  getElementBoundaries(element: any): any {
    return element.getBoundingClientRect();
  }

  toggleMenuBurger(element: any): void {
    if (element.classList.contains('icon-menu-burger')) {
      element.classList.remove('icon-menu-burger');
      element.classList.add('icon-close');
      SharedService.getEmitter('openSidebar').emit(true);
      return;
    }
    element.classList.add('icon-menu-burger');
    element.classList.remove('icon-close');
    SharedService.getEmitter('openSidebar').emit(false);
  }

  goBack(): void {
    window.history.back();
  }

  queryString(params: object): string {
    var str = [];
    for (var param in params) {
      if (params.hasOwnProperty(param)) {
        str.push(`${encodeURIComponent(param)}=${encodeURIComponent(params[param])}`);
      }
    }
    return str.join('&');
  }
}
