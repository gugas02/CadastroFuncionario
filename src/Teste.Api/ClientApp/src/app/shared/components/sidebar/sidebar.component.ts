import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  innerWidth: number;

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit() {
    $('#menu-toggle').click(function (evt) {
      evt.preventDefault();
      this.innerWidth = window.innerWidth;

      if (!$('#wrapper').hasClass('toggled')) {
        $('#wrapper').addClass('toggled');
        if (this.innerWidth < 768) {
          $('html').css({ overflowY: 'hidden' });
        }
      } else {

        $('#wrapper').removeClass('toggled');
        if (this.innerWidth < 768) {
          $('html').css({ overflowY: 'auto' });
        }
      }
    });

    $('[data-toggle="collapse"]').click(function (evt) {
      evt.preventDefault();
      $('[data-toggle="collapse"]').parents('.list-group-item').toggleClass('active');
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(evt) {
  }

}
