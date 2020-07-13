import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { BrowserSupportComponent } from './browser-support.component';
import { BrowserSupportRoutingModule } from './browser-support-routing.module';
import { BrowserSupportGuard } from './guards/browser-support.guard';

@NgModule({
  declarations: [BrowserSupportComponent],
  imports: [
    CommonModule,
    BrowserSupportRoutingModule
  ],
  providers: [BrowserSupportGuard]
})
export class BrowserSupportModule { }
