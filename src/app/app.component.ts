import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoinsPageComponent } from './pages/coins-page/coins-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , CoinsPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular-rate';
}
