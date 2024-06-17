import { Routes } from '@angular/router';
import { CoinsPageComponent } from './pages/coins-page/coins-page.component';
import { CoinTableRateComponent } from './pages/coin-table-rate/coin-table-rate.component';
import { CoinTableRateExchangeComponent } from './pages/coin-table-rate-exchange/coin-table-rate-exchange.component';

export const routes: Routes = [
    {path:'',component:CoinsPageComponent},
    {path:'coins', component:CoinsPageComponent},
    {path:'tableRate', component:CoinTableRateComponent},
    {path:'tableRateExchange', component:CoinTableRateExchangeComponent},
 ];