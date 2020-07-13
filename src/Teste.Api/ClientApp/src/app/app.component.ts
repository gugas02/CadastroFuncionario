import { Component, OnInit, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { SharedService } from './shared/services/shared.service';
import { HeadTitle } from 'src/infra/constants/system';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  displayDesktop: boolean;

  constructor(
    private readonly titleService: Title,
    private readonly sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.titleService.setTitle(HeadTitle.BACKOFFICE);
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(evt?: any) {
    this.displayDesktop = this.sharedService.desktopMode();
  }
}
