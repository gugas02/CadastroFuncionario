import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GridFilterPipe } from './pipes/grid-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedService } from './services/shared.service'; 

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    GridFilterPipe,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    RouterModule,
    GridFilterPipe,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    SharedService
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class SharedModule { }
