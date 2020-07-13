import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable()
export class BrowserSupportGuard implements CanActivate {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const condition = false;
    if (condition) {
      this.router.navigate(['/browser-support']);
      return;
    }
    return true;
  }

}
