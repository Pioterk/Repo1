import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from "../model/message";
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http: HttpClient) { }

  getById(serverURL: String, messageId : number): Observable<Message> {
    return this.http.get<Message>(environment.apiUrl+serverURL+environment.apiPort+'/message?id='+messageId);
  }
  getAll(serverURL: String): Observable<Message[]> {
    return this.http.get<Message[]>(environment.apiUrl+serverURL+environment.apiPort+'/message');
  }

  getAllActiveByNotification(serverURL: String, notificationId : number): Observable<Message[]> {
    return this.http.get<Message[]>(environment.apiUrl+serverURL+environment.apiPort+'/message?notificationId='+notificationId);
  }
  getAllActiveByReport(serverURL: String, reportId : number): Observable<Message[]> {
    return this.http.get<Message[]>(environment.apiUrl+serverURL+environment.apiPort+'/message?reportId='+reportId);
  }

}
