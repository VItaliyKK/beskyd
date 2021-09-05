import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div> Page or instance not found! </div>
  `,
  styles: [`
    div{
      width: 100%;
      height: calc(100vh - 200px);
      display: grid;
      place-content: center;
    }
  `]
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
