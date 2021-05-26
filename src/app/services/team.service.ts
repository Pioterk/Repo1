import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Team } from '../model/team';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }
  getTeamById(serverURL: String, teamId : number): Observable<Team> {
    return this.http.get<Team>(environment.apiUrl+serverURL+environment.apiPort+'/team?id='+teamId);
  }
  getAllActiveByUser(serverURL: String, userId:number): Observable<Team[]> {
    return this.http.get<Team[]>(environment.apiUrl+serverURL+environment.apiPort+'/team?svcUserId='+userId+'&activeTeam=1&activeUser=1&activeUserTeam=1');
  }
  assignUserToTeam(serverURL: String, userId:number, teamId:number): Observable<any> {
    return this.http.post(environment.apiUrl+serverURL+environment.apiPort+'/team/assign-to-user', {teamId : teamId, userId : userId});
  }
  removeUserFromTeam(serverURL: String, userId:number, teamId:number): Observable<any> {
    return this.http.post(environment.apiUrl+serverURL+environment.apiPort+'/team/remove-from-user', {teamId : teamId, userId : userId});
  }
}
