import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, provideRouter } from '@angular/router';
import { CoinsPageComponent } from './pages/coins-page/coins-page.component';
import { MenubarModule } from 'primeng/menubar';
import { CoinsService } from './core/services/coins.service';
import { CoinRateService } from './core/services/coin-rate.service';
import { AuthService } from './core/services/Auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoinsPageComponent, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  //   providers:[{provide:ApiService,useFactory:HttpClientCreator,deps:[HttpClient]}]
})
export class AppComponent implements OnInit {
  title = 'Angular-rate';
  items: any;
  // isLogin: boolean = false;
  constructor(
    public readonly authService:AuthService,
    private coinsService: CoinsService,
    private coinRateService: CoinRateService,
    private router: Router
  ) {}
  ngOnInit() {
    this.authService.jwtChecked()
    this.coinsService.getAll().subscribe({
      next: (resp) => {
        
      },
      error: (err) => {
        // this.isLogin=false
        this.router.navigate(['/login']);
      },
    });
    this.coinRateService.getAll().subscribe({
      next: (resp) => {
        
      },
      error: (err) => {
        this.router.navigate(['/login']);
      },
    });
    // this.coinsService.isLogin.subscribe({
    //   next: (resp) => {
    //     console.log(resp);

    //     // this.isLogin = resp;
    //   },
    // });
    this.items = [
      {
        label: ' ارز ها ',
        icon: 'pi pi-bitcoin',
        routerLink: '/coins',
      },
      {
        label: 'جدول تبدیل ها',
        icon: 'pi pi-table',
        routerLink: 'tableRate',
      },

      {
        label: 'ماشین حساب',
        icon: 'pi pi-dollar',
        routerLink: 'tableRateExchange',
      },
    ];
  }
}
