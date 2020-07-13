import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit {

  constructor(private readonly titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Página não encontrada - Back Office');
  }

}
