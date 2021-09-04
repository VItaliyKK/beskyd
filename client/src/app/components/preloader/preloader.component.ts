import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preloader',
  template: `
    <div class="loader"></div>
  `,
  styles: [`
    .loader {
      display: block;
      width: 20px;
      height: 20px;
      margin: 0 auto;
      border-radius: 50%;
      border: 2px solid #ccc;
      border-top-color: #000;
      animation: loader .6s linear infinite;
    }
    @keyframes loader {
      to {transform: rotate(360deg);}
    }
  `]
})
export class PreloaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
