import { Routes } from '@angular/router';
import { CoinsPageComponent } from './pages/coins-page/coins-page.component';
import { CoinTableRateComponent } from './pages/coin-table-rate/coin-table-rate.component';
import { CoinTableRateExchangeComponent } from './pages/coin-table-rate-exchange/coin-table-rate-exchange.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService } from './core/services/auth-guard.service';

export const routes: Routes = [
    {path:'',canActivate:[AuthGuardService],component:CoinsPageComponent},
    {path:'coins', canActivate:[AuthGuardService], component:CoinsPageComponent},
    {path:'tableRate',canActivate:[AuthGuardService], component:CoinTableRateComponent},
    {path:'tableRateExchange', canActivate:[AuthGuardService],component:CoinTableRateExchangeComponent},
    {path:'login', component:LoginComponent},
 ];