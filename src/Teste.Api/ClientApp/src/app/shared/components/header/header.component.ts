import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  displayDesktop: boolean;
  innerWidth: number;

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly sharedService: SharedService,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.onResize();
  }

  ngOnDestroy() {
    this.spinner.hide();
  }

  @HostListener('window:resize', ['$event'])
  onResize(evt?: any) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 768) {
      this.displayDesktop = false;
      return;
    }
    this.displayDesktop = true;
  }
}
