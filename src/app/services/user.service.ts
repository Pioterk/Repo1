import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SvcUser } from '../model/svc-user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getAll(serverURL: String): Observable<SvcUser[]> {
    return this.http.get<SvcUser[]>(environment.apiUrl+serverURL+environment.apiPort+'/user');
  }
  getAllByNotification(serverURL: String, notificationId:number): Observable<SvcUser[]> {
    return this.http.get<SvcUser[]>(environment.apiUrl+serverURL+environment.apiPort+'/user?notificationId='+notificationId);
  }
  getAllWithEmail(serverURL: String): Observable<SvcUser[]> {
    return this.http.get<SvcUser[]>(environment.apiUrl+serverURL+environment.apiPort+'/user?email=true');
  }
  assignUserToTeam(serverURL: String, userId:number, administrator: boolean, specialist : boolean, operator : boolean): Observable<any> {
    console.log(environment.apiUrl+serverURL+environment.apiPort+'/user/assign-to-team', {svcUserId : userId, administrator : administrator, specialist : specialist, operator : operator })
    return this.http.post(environment.apiUrl+serverURL+environment.apiPort+'/user/assign-to-team', {svcUserId : userId, administrator : administrator, specialist : specialist, operator : operator });
  }
  
}
