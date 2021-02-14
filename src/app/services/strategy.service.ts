import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Strategy } from "../model/strategy";

@Injectable({
  providedIn: 'root'
})
export class StrategyService {
  constructor(private http: HttpClient) { }
  getById(serverURL: String, strategyId : number): Observable<Strategy> {
    return this.http.get<Strategy>(environment.apiUrl+serverURL+environment.apiPort+'/strategy?id='+strategyId);
  }
  getAll(serverURL: String): Observable<Strategy[]> {
    return this.http.get<Strategy[]>(environment.apiUrl+serverURL+environment.apiPort+'/strategy');
  }
  save(serverURL: String, strategy: Strategy): Observable<any> {
    console.log(strategy);
    return this.http.post(environment.apiUrl+serverURL+environment.apiPort+'/strategy', strategy);
  }
  remove(serverURL: String, strategy: Strategy): Observable<any> {
    return this.http.post(environment.apiUrl+serverURL+environment.apiPort+'/strategy/remove', strategy);
  }
  getAllByNotification(serverURL: String, notificationId : number): Observable<Strategy[]> {
    return this.http.get<Strategy[]>(environment.apiUrl+serverURL+environment.apiPort+'/strategy?notificationId='+notificationId);
  }
  assignStrategyToNotification(serverURL: String, strategyId:number, notificationId:number): Observable<any> {
    return this.http.post(environment.apiUrl+serverURL+environment.apiPort+'/strategy/assign-to-notification', {notificationId : notificationId, strategyId : strategyId});
  }
  removeStrategyFromNotification(serverURL: String, strategyId:number, notificationId:number): Observable<any> {
    return this.http.post(environment.apiUrl+serverURL+environment.apiPort+'/strategy/remove-from-notification', {notificationId : notificationId, strategyId : strategyId});
  }
}
