import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-marvel',
  templateUrl: './marvel.component.html',
  styles: [
    `
      .full-page {
        height: 100vh;
      }
    `
  ]
})
export class MarvelComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
