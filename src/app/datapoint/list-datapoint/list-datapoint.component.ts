import { Component, OnInit, ViewChild,HostListener } from '@angular/core';
import { DatapointService } from '../../services/datapoint.service';
import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DataPoint } from 'src/app/model/data-point';

@Component({
  selector: 'app-list-datapoint',
  templateUrl: './list-datapoint.component.html',
  styleUrls: ['./list-datapoint.component.css']
})
export class ListDatapointComponent implements OnInit {
  searchText: string = '';
  id:number;
  name: string;
  description: string;
  datapoints: Array<DataPoint>;
  notsorteddatapoints: Array<DataPoint>;
  serverURL: String = window.location.href.split(/\/\//)[1].split(/\/|:/)[0];
  administrator : Boolean = false;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [1, 5, 10, 50, 100, 150];
  pageEvent: PageEvent;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private datapointService: DatapointService,
    public router: Router,) { }
    @HostListener('input') oninput() {
      this.searchItems();
  }
  ngOnInit(): void {
    this.datapointService.getAll(this.serverURL)
    .subscribe(data => {
      this.datapoints = data;
      this.notsorteddatapoints = data;
      this.length = data.length;
    });
  }
  
  sortData(sort: Sort) {
    console.log("sort");
    if (!sort.active || sort.direction === '') {
      this.datapoints = this.notsorteddatapoints;
      return;
    }
    this.datapoints = this.notsorteddatapoints.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
  
        case 'Id': return this.compare(a.Id, b.Id, isAsc);
        case 'Name': return this.compare(a.Name, b.Name, isAsc);
        case 'Description': return this.compare(a.Description, b.Description, isAsc);
        case 'BindingType': return this.compare(a.BindingType, b.BindingType, isAsc);
        case 'ObjectType': return this.compare(a.ObjectType, b.ObjectType, isAsc);
        case 'Connection': return this.compare(a.Connection, b.Connection, isAsc);
        case 'ConnectionDescription': return this.compare(a.ConnectionDescription, b.ConnectionDescription, isAsc);
        case 'Device': return this.compare(a.Device, b.Device, isAsc);
        case 'DeviceDescription': return this.compare(a.DeviceDescription, b.DeviceDescription, isAsc);
        case 'Unit': return this.compare(a.Unit, b.Unit, isAsc);
        default: return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1)*(a === null ? -1 : 1);
  }
  onPaginateChange(event){
    this.datapoints = this.notsorteddatapoints.slice(event.pageIndex*event.pageSize,(event.pageIndex+1)*event.pageSize); 
  }
  idChange(event){
    if (this.id !=null){
      this.datapoints = this.notsorteddatapoints.filter(obj =>obj.Id!=null && this.id!=null && obj.Id == this.id); 
  
    } else{
      this.datapoints = this.notsorteddatapoints;
    }
   
  }
  nameChange(event){
    this.datapoints = this.notsorteddatapoints.filter(obj =>{

    
       if (this.description!=null){
        return obj.Name!=null && obj.Name.toLowerCase().includes(this.name.toLowerCase()) && obj.Description!=null && obj.Description.toLowerCase().includes(this.description.toLowerCase()); 
      } else {
        return obj.Name!=null && obj.Name.toLowerCase().includes(this.name.toLowerCase());
      }
    
    });
  }
  descriptionChange(event){
       this.datapoints = this.notsorteddatapoints.filter(obj =>obj.Description!=null && obj.Description.toLowerCase().includes(this.description.toLowerCase())); 
  
  }
  clearDescription(){
    this.description='';
    this.datapoints = this.notsorteddatapoints;
  }
  clearName(){
    this.name='';
    this.datapoints = this.notsorteddatapoints;
  }
  clearId(){
    this.id=null;
    this.datapoints = this.notsorteddatapoints;
  }
  
  searchItems() {

}
  test(){
    this.datapoints = this.notsorteddatapoints.filter(obj =>obj.Description!=null && obj.Description.toLowerCase().includes(this.description.toLowerCase())); 
    // for (let datapoint of this.notsorteddatapoints){
    //   console.log(datapoint.Description);
    // }
    // if ("Piotr".includes("o")){
    //   console.log("dupa")
    // }

  }
}
