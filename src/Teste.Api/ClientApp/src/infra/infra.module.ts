import { TokenInterceptor } from './interceptors/token.interceptor';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppStorageService } from './services/app-storage.service';
import { MessageService } from './services/message.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    AppStorageService,
    MessageService
  ],
})
export class InfraModule { }
