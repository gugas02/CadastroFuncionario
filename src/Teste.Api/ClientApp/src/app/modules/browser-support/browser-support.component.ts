import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-browser-support',
  templateUrl: './browser-support.component.html'
})
export class BrowserSupportComponent implements OnInit {

  photoTaken: any;

  constructor(private readonly titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Browser Support - Back Office');
  }

}
