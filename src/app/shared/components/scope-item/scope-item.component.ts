import { CommonModule } from '@angular/common';
import { Component, effect, input, Input } from '@angular/core';

@Component({
  selector: 'app-scope-item',
  imports: [CommonModule],
  templateUrl: './scope-item.component.html',
  styleUrls: ['./scope-item.component.css']
})
export class ScopeItemComponent {
  color = input('');
  title = input('');
  value = input(0);
  constructor() {
    effect(() => {
      console.log(this.value());
      console.log(this.color());
    })
  }
}
