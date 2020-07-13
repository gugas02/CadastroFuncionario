import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrowserSupportGuard } from './modules/browser-support/guards/browser-support.guard';
const routes: Routes = [
  { path: '', redirectTo: 'painel', pathMatch: 'full' },
  {
    path: 'painel',
    loadChildren: () => import('./modules/painel/painel.module').then(mod => mod.PainelModule),
    canActivate: [BrowserSupportGuard]
  },
  {
    path: 'browser-support',
    loadChildren: () => import('./modules/browser-support/browser-support.module').then(mod => mod.BrowserSupportModule),
    canActivate: []
  },
  {
    path: '**',
    loadChildren: () => import('./modules/not-found/not-found.module').then(mod => mod.NotFoundModule),
    canActivate: []
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // useHash: true,
      scrollPositionRestoration: 'enabled'
    })
  ]
})
export class AppRoutingModule { }
