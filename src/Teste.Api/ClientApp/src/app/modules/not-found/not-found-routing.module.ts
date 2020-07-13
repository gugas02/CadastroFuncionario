import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found.component';

const routes: Routes = [
  { path: '', component: NotFoundComponent, canActivate: [] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class NotFoundRoutingModule { }
