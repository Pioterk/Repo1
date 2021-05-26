import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { System } from "../model/system";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  constructor(private http: HttpClient) { }
  getSystem(serverURL: String): Observable<System> {
    return this.http.get<System>(environment.apiUrl+serverURL+environment.apiPort+'/system');
  }
  save(serverURL: String, system: System): Observable<any> {
    return this.http.post(environment.apiUrl+serverURL+environment.apiPort+'/system', system);
  }
  savePwd(serverURL: String, system: System): Observable<any> {
    return this.http.post(environment.apiUrl+serverURL+environment.apiPort+'/systempwd', system);
  }
  saveMailUser(serverURL: String, system: System): Observable<any> {
    return this.http.post(environment.apiUrl+serverURL+environment.apiPort+'/systemmailuser', system);
  }

  chceckApiUser(serverURL: String): Observable<System>{
    return this.http.get<System>(environment.apiUrl+serverURL+environment.apiPort+'/chceckApiUser');
  }
  removeApiUser(serverURL: String, system: System): Observable<any>{
    return this.http.post(environment.apiUrl+serverURL+environment.apiPort+'/removeApiUser',system);
  }

  getSvcAddress(serverURL: string): Observable<System> {
    return this.http.get<System>(environment.apiUrl+serverURL+environment.apiPort+'/svcaddress');
    
  }
  getSvcAddressAndCheckApiUser(serverURL: string): Observable<System> {
    return this.http.get<System>(environment.apiUrl+serverURL+environment.apiPort+'/svcaddress');
    
  }
  
  clearMessages(serverURL: String, system: System):Observable<HttpResponse<any>>  {

    return this.http.post(environment.apiUrl+serverURL+environment.apiPort+'/system/clearMessages', system, { observe: 'response' }).pipe(

    );
  }
  testConncetion(serverURL: String, system: System):Observable<HttpResponse<any>>  {
    return this.http.post(environment.apiUrl+serverURL+environment.apiPort+'/system/testconnection', system, { observe: 'response' }).pipe(
      catchError(this.handleTestSvcError)
    );
  }
  testFilePath(serverURL: String, system: System):Observable<HttpResponse<any>>  {
    return this.http.post(environment.apiUrl+serverURL+environment.apiPort+'/system/testfile', system, { observe: 'response' }).pipe(
      catchError(this.handleTestFilePathError)
    );
  }
  
  testEmail(serverURL: String, system: System):Observable<HttpResponse<any>>  {
    return this.http.post(environment.apiUrl+serverURL+environment.apiPort+'/system/testemail', system, { observe: 'response' }).pipe(
      catchError(this.handleTestEmailError)
    );
  }
  updateUsers(serverURL: String, system: System): Observable<any> {
    return this.http.post(environment.apiUrl+serverURL+environment.apiPort+'/system/update/users', system);
  }

  
  updateDataPoints(serverURL: String, system: System): Observable<any> {
    return this.http.post(environment.apiUrl+serverURL+environment.apiPort+'/system/update/datapoints', system);
  }
  
  private handleTestSvcError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
        window.alert("No connection with SVC!");
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
  private handleTestEmailError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
        window.alert("No connection or bad credentials");
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
  private handleTestFilePathError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
        window.alert("Unable to access location");
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
