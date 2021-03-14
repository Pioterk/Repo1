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
import { GenertedReportService } from '../../services/generted-report.service'
import { GenertedReport } from 'src/app/model/generted-report';

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.component.html',
  styleUrls: ['./list-message.component.css']
})
export class ListMessageComponent implements OnInit {
  blob;
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
  currentPage = 0;
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
    public genertedReportService : GenertedReportService
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
      this.messageService.getAllActiveByNotificationPageable(this.serverURL, this.notificationId, this.currentPage, this.pageSize)
      .subscribe(data => {
        this.messages = data.content.slice(0,this.pageSize);
        this.notsortedMessages = data.content;
        this.length = data.totalElements;
      });
    }  
    if (this.reportId!=null){
      this.messageService.getAllActiveByReportPageable(this.serverURL, this.reportId,this.currentPage, this.pageSize)
      .subscribe(data => {
        this.messages = data.content.slice(0,this.pageSize);
        this.notsortedMessages = data.content;
        this.length = data.totalElements;
        for (let message of this.messages){
          message.errorCode = this.convertToBin(message.errorCode);
      }
   
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
  if (this.notificationId!=null){
    this.messageService.getAllActiveByNotificationPageable(this.serverURL, this.notificationId, event.pageIndex, event.pageSize)
    .subscribe(data => {
      this.messages = data.content.slice(0,this.pageSize);
      this.notsortedMessages = data.content;
      this.length = data.totalElements;
    })
  }
  if (this.reportId!=null){
    this.messageService.getAllActiveByReportPageable(this.serverURL, this.reportId, event.pageIndex, event.pageSize)
    .subscribe(data => {
      for (let message of data.content){
        message.errorCode = this.convertToBin(message.errorCode);
    }
      this.messages = data.content.slice(0,this.pageSize);
      this.notsortedMessages = data.content;
      this.length = data.totalElements;
    });
  }

}

convertToBin(num : number) : string{
  var n = num.toString(2);
  return "00000000".substr(n.length) + n;
}
getReport(genertedReport : GenertedReport){
  this.genertedReportService.getFile(this.serverURL, genertedReport.id).subscribe(data => {
    this.blob = new Blob([data], {type: 'application/vnd.ms-excel'});
    var downloadURL = window.URL.createObjectURL(data);
    var link = document.createElement('a');
    link.href = downloadURL;
    link.download = genertedReport.name.toString();
    link.click();
  });
}
}
