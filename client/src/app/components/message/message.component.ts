import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  template: `
    <div [ngClass]="[type, classes]" class="p10">{{ message }}</div>
  `,
  styles: [`
    .success, .remind, .warning{
      border-radius: var(--border-radius);
    }
    .success{
      background-color: rgb(10 199 101 / 25%);
      border: 1px solid rgb(10 199 101 / 25%);
      color: rgb(10 199 101 / 100%);
    }
    .remind{
      background-color: rgb(255 181 0 / 25%);
      border: 1px solid rgb(255 181 0 / 25%);
      color: rgb(255 186 0 / 100%);
    }
    .warning{
      background-color: rgb(255 18 0 / 25%);
      border: 1px solid rgb(255 18 0 / 25%);
      color: rgb(255 18 0 / 100%);
    }
  `]
})
export class MessageComponent implements OnInit {
  @Input() message: string
  @Input() type: 'success' | 'warning' | 'failed'
  @Input() classes?: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
