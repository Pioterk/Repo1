import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Message } from '../../model/message';
import { environment } from 'src/environments/environment';
import { GenertedReportService } from '../../services/generted-report.service'
import { GenertedReport } from 'src/app/model/generted-report';
import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { MessageWraper } from 'src/app/model/message-wraper';
import { MessageService} from '../../services/messages.service';
@Component({
  selector: 'app-list-messages',
  templateUrl: './list-messages.component.html',
  styleUrls: ['./list-messages.component.css']
})
export class ListMessagesComponent implements OnInit {
  serverFullUrl : string;
  blob;
  length = 100;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [1, 5, 10, 50];
  pageEvent: PageEvent;
  notsortedMessages: Array<any>;
  messages: Array<any>;
  serverURL: String = window.location.href.split(/\/\//)[1].split(/\/|:/)[0]
  constructor(  public dialogRef: MatDialogRef<ListMessagesComponent>,
    @Inject(MAT_DIALOG_DATA) public mw: MessageWraper,
    public genertedReportService : GenertedReportService,
    private messageService : MessageService,) { }

  ngOnInit(): void {
    this.serverFullUrl = environment.apiUrl+this.serverURL+environment.apiPort;
    this.messages =  this.mw.messages;
    this.notsortedMessages = this.mw.messages;
    this.length = this.mw.messages.length;
  }
  onNoClick(): void {
    this.dialogRef.close();
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
    if (this.mw.notification!=null){
      this.messageService.getAllActiveByNotificationPageable(this.serverURL, this.mw.notification.id, event.pageIndex, event.pageSize)
      .subscribe(data => {
        this.messages = data.content.slice(0,this.pageSize);
        this.notsortedMessages = data.content;
        this.length = data.totalElements;
      })
    }

  
  }

    

}
