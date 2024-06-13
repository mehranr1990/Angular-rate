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
                icon: 'pi pi-bitcoin',
                routerLink:'/coins'
                
            },
            {
                label: 'COINS RATE',
                icon: 'pi pi-table',
                routerLink:'tableRate'
            },
           
            {
                label: 'RATE EXCHANGE',
                icon: 'pi pi-dollar',
                routerLink:'tableRateExchange'
            }
        ]
    }
}
