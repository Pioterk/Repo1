import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { DatapointService } from '../../services/datapoint.service';
import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-pageable-list',
  templateUrl: './pageable-list.component.html',
  styleUrls: ['./pageable-list.component.css']
})
export class PageableListComponent implements OnInit {
  @ViewChild('report', { static: false }) report: ElementRef;
  serverURL: String = window.location.href.split(/\/\//)[1].split(/\/|:/)[0];
  administrator : Boolean = false;
  datapoints : Array<any>;
  notsorteddatapoints : Array<any>;
  id:number;
  name: string='';
  description: string='';
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  length = 100;
  pageSize = 100;
  currentPage = 0;
  pageSizeOptions: number[] = [10, 50, 100, 200, 300 , 400, 500];
  constructor(
    private datapointService: DatapointService,
  ) { }

  ngOnInit(): void {
    this.datapointService.getAllPageable(this.serverURL, this.currentPage, this.pageSize).subscribe(data=>{
      this.datapoints = data.content;
      this.notsorteddatapoints = data.content;
      this.length = data.totalElements;
    })
  }
  sortData(sort: Sort) {

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
        default: return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1)*(a === null ? -1 : 1);
  }
  onPaginateChange(event){
    this.datapointService.getAllPageableWithParameters(this.serverURL,this.description, this.name, this.id, event.pageIndex, event.pageSize)
     .subscribe(data => {
      this.datapoints = data.content;
      this.notsorteddatapoints = data.content;
      this.length = data.totalElements;
    });
  }
  search(){
    this.datapointService.getAllPageableWithParameters(this.serverURL,this.description, this.name, this.id, this.currentPage, this.pageSize)
    .subscribe(data => {
      this.datapoints = data.content;
      this.notsorteddatapoints = data.content;
      this.length = data.totalElements;
    });
  }
  clearDescription(){
    this.description='';
    this.search()
  }
  clearName(){
    this.name='';
    this.search()
  }
  clearId(){
    this.id=null;
    this.search()
  }
  exportToExcel() {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.report.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

    if (this.name!=''){
      xlsx.writeFile(wb, 'report '+this.name+'.xlsx');
    } else if (this.description!=''){
      xlsx.writeFile(wb, 'report '+this.description +'.xlsx');
    } else{
      xlsx.writeFile(wb, 'report'+'.xlsx');
    }

  
   }
}
