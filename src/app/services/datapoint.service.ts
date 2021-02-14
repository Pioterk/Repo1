import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable} from 'rxjs';
import { SvcUser } from '../model/svc-user';
import { DataPoint } from '../model/data-point';
import { Page } from '../model/page'

@Injectable({
  providedIn: 'root'
})
export class DatapointService {

  constructor(private http: HttpClient) { }

  getAll(serverURL: String): Observable<DataPoint[]> {
    return this.http.get<DataPoint[]>(environment.apiUrl+serverURL+environment.apiPort+'/datapoint');
  }
  getAllPageable(serverURL: String, page: Number, amount: Number): Observable<Page> {
    return this.http.get<Page>(environment.apiUrl+serverURL+environment.apiPort+'/datapoint?page='+page+"&amount="+amount);
  }
  getAllPageableWithParameters(serverURL: String, description : string, name: string, id:number,  page: Number, amount: Number): Observable<Page> {
   
   if (id!=null && id!=undefined){
    return this.http.get<Page>(environment.apiUrl+serverURL+environment.apiPort+'/datapoint?description='+description+'&id='+id+"&name="+name +'&page='+page+"&amount="+amount);
   }else{
     return this.http.get<Page>(environment.apiUrl+serverURL+environment.apiPort+'/datapoint?description='+description+"&name="+name +'&page='+page+"&amount="+amount);
   }
   
   
  }
}
