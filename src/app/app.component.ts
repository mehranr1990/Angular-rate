import { Component, OnInit } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { CoinsPageComponent } from './pages/coins-page/coins-page.component';
import { MenubarModule } from 'primeng/menubar';
import { CoinsService } from './core/services/coins.service';
import { CoinRateService } from './core/services/coin-rate.service';
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
  constructor(private coinsService: CoinsService,private coinRateService:CoinRateService){

  }
  ngOnInit() {
        this.coinsService.getAll();
        this.coinRateService.getAll();
        this.items = [
            {
                label: ' ارز ها ',
                icon: 'pi pi-bitcoin',
                routerLink:'/coins'
                
            },
            {
                label: 'جدول تبدیل ها',
                icon: 'pi pi-table',
                routerLink:'tableRate'
            },
           
            {
                label: 'ماشین حساب',
                icon: 'pi pi-dollar',
                routerLink:'tableRateExchange'
            }
        ]
    }
}
