import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-teste',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule],
  templateUrl: './teste.component.html',
  styleUrl: './teste.component.scss'
})
export class TesteComponent {

  items = [
    { name: 'Item 1', visible: true },
    { name: 'Item 2', visible: false },
    { name: 'Item 3', visible: true },
    { name: 'Item 4', visible: false }
  ];


  
  public get itemsTrue() : {name: string, visible: boolean}[] {
    return this.items.filter(item => item.visible)
  }
  

}
