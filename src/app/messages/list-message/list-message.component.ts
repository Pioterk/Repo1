import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MessageService } from '../../services/messages.service';
import { NotificationService} from '../../services/notification.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Notification} from '../../model/notification';
import { Report } from 'src/app/model/report';
import { ReportService} from '../../services/report.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.component.html',
  styleUrls: ['./list-message.component.css']
})
export class ListMessageComponent implements OnInit {
  notification: Notification;
  messages: Array<any>;
  notsortedMessages: Array<any>;
  serverURL: String = window.location.href.split(/\/\//)[1].split(/\/|:/)[0];
  administrator : Boolean = false;
  notificationId : number;
  reportId :number;
  report : Report;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [1, 5, 10, 50];
  pageEvent: PageEvent;
  serverFullUrl : string;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private messageService: MessageService,
    private notificationService: NotificationService,
    public router: Router,
    public route: ActivatedRoute,
    public reportService : ReportService,
  ) { }

  ngOnInit(): void {
    this.serverFullUrl = environment.apiUrl+this.serverURL+environment.apiPort;
    this.route.queryParams
      .subscribe(params => {
        this.notificationId = params.notificationId;
        this.reportId = params.reportId;
          this.reportService.getReportsById(this.serverURL, this.reportId).subscribe(data=>{
            this.report = data[0];
          
          })

      });

 
    if (this.notificationId!=null){
      this.notificationService.getById(this.serverURL, this.notificationId).subscribe(data=>{
        this.notification = data;
      
      })
      this.messageService.getAllActiveByNotification(this.serverURL, this.notificationId)
      .subscribe(data => {
        this.messages = data.slice(0,this.pageSize);
        this.notsortedMessages = data;
        this.length = data.length;
        console.log(data);
      });
    }  
    if (this.reportId!=null){
      this.messageService.getAllActiveByReport(this.serverURL, this.reportId)
      .subscribe(data => {
        for (let message of data){
          message.errorCode = this.convertToBin(message.errorCode);
      }
        this.messages = data.slice(0,this.pageSize);
        this.notsortedMessages = data;
        this.length = data.length;
        console.log(data);
      });
    }
 
}
sortData(sort: Sort) {
  
  if (!sort.active || sort.direction === '') {
    this.messages = this.notsortedMessages;
    return;
  }
  this.messages = this.notsortedMessages.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {

      case 'creationDate': return this.compare(a.creationDate, b.creationDate, isAsc);
      case 'name': return this.compare(a.userName, b.userName, isAsc);
      case 'sentDate': return this.compare(a.sentDate, b.sentDate, isAsc);
      case 'text': return this.compare(a.text, b.text, isAsc);
      case 'subject': return this.compare(a.subject, b.subject, isAsc);
      case 'email': return this.compare(a.email, b.email, isAsc);
      case 'triesWEndedWithError': return this.compare(a.triesWEndedWithError, b.triesWEndedWithError, isAsc);
        default: return 0;
    }
 
  });
}
compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1)*(a === null ? -1 : 1);
}
onPaginateChange(event){
  this.messages = this.notsortedMessages.slice(event.pageIndex*event.pageSize,(event.pageIndex+1)*event.pageSize); 
}

convertToBin(num : number) : string{
  var n = num.toString(2);
  return "00000000".substr(n.length) + n;
}
}
