import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export function HttpClientCreator(http: HttpClient) {
  return new ApiService(http);
}


@Injectable({
  providedIn: 'root'})
export class ApiService {
  constructor(private http: HttpClient) {}
  baseURL: string = 'http://192.168.103.13:6575/';
  
  
  get<T>(endPoint: string) {
    return this.http.get(this.baseURL + endPoint)
  }

  post<T>(endPoint: string, body: any) {
    return this.http.post(this.baseURL + endPoint, body)
  }

  put<T>(endPoint:string, body:any){
    return this.http.put(this.baseURL + endPoint,body)
  }
  
  delete<T>(endPoint:string){
    return this.http.delete(this.baseURL + endPoint)
  }
  

  // getCoinRateData(endPoint: string) {
  //   this.http.get(this.baseURL + endPoint).subscribe()
  // }

  // saveCoinRateData(endPoint: string, body: CoinRate) {
  //   this.http.post(this.baseURL + endPoint, body).subscribe()
  // }
}
