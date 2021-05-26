import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Report } from '../model/report';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }
  
  getReports(serverURL: String): Observable<Report[]>{
    return this.http.get<Report[]>(environment.apiUrl+serverURL+environment.apiPort+'/reports');
  }
  
  getReportsById(serverURL: String, reportId : number): Observable<Report>{
    return this.http.get<Report>(environment.apiUrl+serverURL+environment.apiPort+'/reports?id='+reportId);
  }
  
  upload(serverURL: String, file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', environment.apiUrl+serverURL+environment.apiPort+'/reports', formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  
  getReport(serverURL: String, id : number):Observable<any>  {
    return this.http.get(environment.apiUrl+serverURL+environment.apiPort+"/report/"+id);
  }
  
  delete(serverURL: String, report : Report){
    return this.http.post(environment.apiUrl+serverURL+environment.apiPort+'/reports/remove', report);
  }
 
  getFile(serverURL: String, id : number) : Observable<BlobPart> {
  const httpOptions = {
    responseType: 'blob' as 'json',
  };
  return this.http.get<BlobPart>(environment.apiUrl+serverURL+environment.apiPort+"/report/"+id, httpOptions);
  }
  
  generateTest(serverURL: String, id : number, jobId : number) : Observable<BlobPart> {
  const httpOptions = {
    responseType: 'blob' as 'json',
  };
  return this.http.get<BlobPart>(environment.apiUrl+serverURL+environment.apiPort+"/reports/generate/"+id+"?jobId="+jobId, httpOptions);
  } 

}
