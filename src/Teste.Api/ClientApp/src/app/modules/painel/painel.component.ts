import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html'
})
export class PainelComponent implements OnInit {

  constructor(private readonly titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Painel - Back Office');
  }

}
