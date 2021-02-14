  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { environment } from 'src/environments/environment';
  

@Injectable({
  providedIn: 'root'
})
export class SvcService {

  constructor(private http: HttpClient) { }
  
  login(){

    // return this.http.post(environment.svcUrl+'/Login', {Login : "Piotr", Password : "Piotr12345"});
  }
}
