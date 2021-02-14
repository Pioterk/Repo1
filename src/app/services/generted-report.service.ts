import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Report } from '../model/report';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenertedReport } from '../model/generted-report';

@Injectable({
  providedIn: 'root'
})
export class GenertedReportService {

  constructor(private http: HttpClient) { }
  getGeneraredReports(serverURL: String): Observable<GenertedReport[]>{
    return this.http.get<GenertedReport[]>(environment.apiUrl+serverURL+environment.apiPort+'/generatedReports');
  }
  getFile(serverURL: String, id : number) : Observable<BlobPart> {
    const httpOptions = {
      responseType: 'blob' as 'json',
    };
    return this.http.get<BlobPart>(environment.apiUrl+serverURL+environment.apiPort+"/generatedReport/"+id, httpOptions);
  }
}