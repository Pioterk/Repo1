import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notification } from "../model/notification";
import { Strategy } from '../model/strategy';
import { AssignStrategyTextNotificationToReport } from '../model/assign-strategy-text-notification-to-report';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getById(serverURL: String, notificationId : number): Observable<Notification> {
    // console.log(environment.apiUrl+serverURL+environment.apiPort+'/notification?id='+notificationId);
    return this.http.get<Notification>(environment.apiUrl+serverURL+environment.apiPort+'/notification?id='+notificationId);
  }
  getAll(serverURL: String): Observable<Notification[]> {
    return this.http.get<Notification[]>(environment.apiUrl+serverURL+environment.apiPort+'/notification');
  }
  getAllActive(serverURL: String): Observable<Notification[]> {
    return this.http.get<Notification[]>(environment.apiUrl+serverURL+environment.apiPort+'/notification?active=1');
  }
  save(serverURL: String, notification: Notification): Observable<any> {
    return this.http.post(environment.apiUrl+serverURL+environment.apiPort+'/notification', notification);
  }
  create(serverURL: String, assignStrategyTextNotificationToReport: AssignStrategyTextNotificationToReport): Observable<any> {
    return this.http.post(environment.apiUrl+serverURL+environment.apiPort+'/notification', assignStrategyTextNotificationToReport);
  }
  remove(serverURL: String, notification: Notification): Observable<any> {
    return this.http.post(environment.apiUrl+serverURL+environment.apiPort+'/notification/remove', notification);
  }
  getAllByReport(serverURL: String, reportId : number): Observable<Notification[]> {
    return this.http.get<Notification[]>(environment.apiUrl+serverURL+environment.apiPort+'/notification?reportId='+reportId);
  }

  getAllActiveByReport(serverURL: String, reportId : number): Observable<Notification[]> {
    return this.http.get<Notification[]>(environment.apiUrl+serverURL+environment.apiPort+'/notification?reportId='+reportId+'&active=1');
  }

  assignStrategyTextNotificationToRport(serverURL: String, notificationId:number, strategy: Strategy, text : String, reportId): Observable<any> {
    return this.http.post(environment.apiUrl+serverURL+environment.apiPort+'/notification', {notificationId : notificationId, strategy : strategy, text : text, reportId : reportId});
  }



}
