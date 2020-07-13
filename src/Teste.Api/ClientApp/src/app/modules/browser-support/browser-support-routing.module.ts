import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrowserSupportComponent } from './browser-support.component';

const routes: Routes = [
  { path: '', component: BrowserSupportComponent, canActivate: [] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class BrowserSupportRoutingModule { }
