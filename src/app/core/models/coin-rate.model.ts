import { Coin } from "./coin.model";

export interface CoinRate {
    id:string
    fromCoin:Coin
    toCoin:Coin
    rate:number
    israte:boolean
}
