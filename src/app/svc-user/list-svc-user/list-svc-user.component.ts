
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SvcUser } from '../../model/svc-user';
import { Router } from '@angular/router';
import { MatSort} from '@angular/material/sort';
import { Sort} from '@angular/material/sort';
import { PageEvent} from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { SystemService} from '../../services/system.service';
import { System } from 'src/app/model/system';
import { WsMessage } from 'src/app/model/ws-message';
import { WebsocketService } from '../../services/websocket.service';
import { TeamService } from '../../services/team.service';
import { Role } from 'src/app/model/role';
import { RoleDialogComponent } from '../role-dialog/role-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService} from '../../auth.service';

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
  needToBeConfigured: Boolean = false;
  updateUserStatus: WsMessage;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [1, 5, 10, 50];
  pageEvent: PageEvent;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  notificationId : number;

  constructor(
    private userService: UserService,
    private systemService: SystemService,
    private router: Router,
    private route: ActivatedRoute,
    private websocketService: WebsocketService,
    private teamService : TeamService,
    private dialog: MatDialog,
    private authService: AuthService

    ) { }


  ngOnInit() {  
    this.administrator = this.authService.hasRole("Administrator");
    this.route.queryParams
    .subscribe(params => {
      this.notificationId = params.notificationId;
      this.needToBeConfigured = params.needToBeConfigured;
    });



  if (this.notificationId!=null){
    this.userService.getAllByNotification(this.serverURL, this.notificationId)
    .subscribe(data => {
      for (let svcUser of data){
        let role : Role = new Role();  
        svcUser.role = role;
        this.teamService.getAllActiveByUser(this.serverURL,svcUser.id).subscribe(data=>{
         
          for (let team  of data){
              if (team.teamName == "Administrator"){
                role.administrator = true;
              }
              if (team.teamName == "Specialist"){
                role.specialist = true;
              }
              if (team.teamName == "Operator"){
                role.operator = true;
              }
          }
        })
      }
      this.svcUsers = data.slice(0,this.pageSize);
      this.notsortedSvcUsers = data;
      this.length = data.length;
    });
  } else {
    this.userService.getAll(this.serverURL)
    .subscribe(data => {
  

      for (let svcUser of data){
        let role : Role = new Role();  
        svcUser.role = role;
        this.teamService.getAllActiveByUser(this.serverURL,svcUser.id).subscribe(data=>{
         
          for (let team  of data){
              if (team.teamName == "Administrator"){
                role.administrator = true;
              }
              if (team.teamName == "Specialist"){
                role.specialist = true;
              }
              if (team.teamName == "Operator"){
                role.operator = true;
              }
          }
        })
      }
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
        case 'UserName': return this.compare(a.UserName, b.UserName, isAsc);
        case 'Email': return this.compare(a.Email, b.Email, isAsc);
        case 'PhoneNumber': return this.compare(a.PhoneNumber, b.PhoneNumber, isAsc);
        case 'LastActivity': return this.compare(a.LastActivity, b.LastActivity, isAsc);
          default: return 0;
      }
    });
  }
  edit (user : SvcUser){
    console.log(user);
    this.dialog.open(RoleDialogComponent, {
      width: '700px',
      height: '200px',
      data: user
    }).afterClosed().subscribe(result => {
     
     
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1)*(a === null ? -1 : 1);
  }
  onPaginateChange(event){
    this.svcUsers = this.notsortedSvcUsers.slice(event.pageIndex*event.pageSize,(event.pageIndex+1)*event.pageSize); 
  }

}
