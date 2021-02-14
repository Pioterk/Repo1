
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SvcUser } from '../../model/svc-user';
import { Router } from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {Sort} from '@angular/material/sort';
import {PageEvent} from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-svc-user',
  templateUrl: './list-svc-user.component.html',
  styleUrls: ['./list-svc-user.component.css']
})
export class ListSvcUserComponent implements OnInit {
  svcUsers: Array<any>;
  notsortedSvcUsers: Array<any>;
  serverURL: String = window.location.href.split(/\/\//)[1].split(/\/|:/)[0];
  administrator : Boolean = false;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [1, 5, 10, 50];
  pageEvent: PageEvent;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  notificationId : number;

  constructor(
    private userService: UserService,
    public router: Router,
    public route: ActivatedRoute,
    ) { }


  ngOnInit() {  
    this.route.queryParams
    .subscribe(params => {
      this.notificationId = params.notificationId;
   
    });

  if (this.notificationId!=null){
    this.userService.getAllByNotification(this.serverURL, this.notificationId)
    .subscribe(data => {
      this.svcUsers = data.slice(0,this.pageSize);
      this.notsortedSvcUsers = data;
      this.length = data.length;
    });
  } else {
    this.userService.getAll(this.serverURL)
    .subscribe(data => {
      this.svcUsers = data.slice(0,this.pageSize);
      this.notsortedSvcUsers = data;
      this.length = data.length;
    });
}

  } 
  
  sortData(sort: Sort) {
    console.log("sort");
    if (!sort.active || sort.direction === '') {
      this.svcUsers = this.notsortedSvcUsers;
      return;
    }
    this.svcUsers = this.notsortedSvcUsers.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
  
        case 'Name': return this.compare(a.Name, b.Name, isAsc);
        case 'Email': return this.compare(a.Email, b.Email, isAsc);
        case 'PhoneNumber': return this.compare(a.PhoneNumber, b.PhoneNumber, isAsc);
        case 'LastActivity': return this.compare(a.LastActivity, b.LastActivity, isAsc);
          default: return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1)*(a === null ? -1 : 1);
  }
  onPaginateChange(event){
    this.svcUsers = this.notsortedSvcUsers.slice(event.pageIndex*event.pageSize,(event.pageIndex+1)*event.pageSize); 
  }

}
