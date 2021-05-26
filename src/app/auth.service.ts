import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { LoginResponse } from './model/login-response';
import { throwError } from 'rxjs';

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
      return this.http.post<LoginResponse>(environment.apiUrl+ this.serverURL +environment.apiPort + this.API_URL, dto).pipe(
     
        catchError(this.handleLoginError)
      );
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
  private handleLoginError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      // console.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error}`);
        window.alert("No connection with SVC or bad credentials!");
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
