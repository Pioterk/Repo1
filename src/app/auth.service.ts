import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { LoginResponse } from './model/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverURL: String = window.location.href.split(/\/\//)[1].split(/\/|:/)[0];

  private readonly API_URL = '/auth';

  constructor(private http: HttpClient,
    private jwtService: JwtHelperService,
    private router: Router) { }

    login(dto: { login: string, password: string, address: string}) {
  
      return this.http.post<LoginResponse>(environment.apiUrl+ this.serverURL +environment.apiPort + this.API_URL, dto)
    }
  logout(){
    localStorage.removeItem('id_token');
    localStorage.removeItem('currenUser');
    
    this.router.navigate([this.API_URL]);
  }

  isLoggedIn(): boolean {
    return !this.jwtService.isTokenExpired();
  }

  hasRole(role :string) {
    let token : string = localStorage.getItem('id_token') || '{}';
    return this.jwtService.decodeToken(token).authorities.find((el: { authority: string; }) => el.authority === role);
  }

}
