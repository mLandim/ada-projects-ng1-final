import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TesteComponent } from './teste/teste.component'
import { ComponentePaiComponent } from './componente-pai/componente-pai.component' 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TesteComponent, ComponentePaiComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ada - projeto-1';
}
