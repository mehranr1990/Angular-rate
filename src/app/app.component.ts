import { Component, OnInit } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { CoinsPageComponent } from './pages/coins-page/coins-page.component';
import { MenubarModule } from 'primeng/menubar';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , CoinsPageComponent,MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Angular-rate';
  items: any;
    ngOnInit() {
        this.items = [
            {
                label: 'COINS',
                icon: 'pi pi-home',
                routerLink:'/coins'
                
            },
            {
                label: 'Features',
                icon: 'pi pi-star',
                routerLink:'tableRate'
            },
           
            {
                label: 'Contact',
                icon: 'pi pi-envelope',
                routerLink:'tableRateExchange'
            }
        ]
    }
}
