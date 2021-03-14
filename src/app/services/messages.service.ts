import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from "../model/message";
import { Page} from "../model/page";
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http: HttpClient) { }

  getByIdPageable(serverURL: String, messageId : number, page: Number, amount: Number): Observable<Page> {
    return this.http.get<Page>(environment.apiUrl+serverURL+environment.apiPort+'/message?id='+messageId+'&page='+page+"&amount="+amount);
  }
  getAllPageable(serverURL: String, page: Number, amount: Number): Observable<Page> {
    return this.http.get<Page>(environment.apiUrl+serverURL+environment.apiPort+'/message?page='+page+"&amount="+amount);
  }

  getAllActiveByNotificationPageable(serverURL: String, notificationId : number, page: Number, amount: Number): Observable<Page> {
    return this.http.get<Page>(environment.apiUrl+serverURL+environment.apiPort+'/message?notificationId='+notificationId+'&page='+page+"&amount="+amount);
  }
  getAllActiveByReportPageable(serverURL: String, reportId : number, page: Number, amount: Number): Observable<Page> {
    return this.http.get<Page>(environment.apiUrl+serverURL+environment.apiPort+'/message?reportId='+reportId+'&page='+page+"&amount="+amount);
  }



}
