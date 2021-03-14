import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from 'src/app/model/report';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { NotificationService} from '../../services/notification.service';
import { WebsocketService} from '../../services/websocket.service';
import { WsMessage } from 'src/app/model/ws-message';
import { MatDialog } from '@angular/material/dialog';
import { ProgressDialogComponent} from '../progress-dialog/progress-dialog.component'
import { System } from 'src/app/model/system';
@Component({
  selector: 'app-list-report',
  templateUrl: './list-report.component.html',
  styleUrls: ['./list-report.component.css']
})
export class ListReportComponent implements OnInit {
  panelOpenState = false;
  administrator: Boolean = true;
  selectedFiles?: FileList;
  currentFile?: File;
  greeting: any;
  name: string;
  progress = 0;
  blob;
  message = '';
  fileInfos?: Observable<any>;
  serverURL: string = window.location.href.split(/\/\//)[1].split(/\/|:/)[0]
  serverFullUrl : String ;
  reports : Array<Report>;
  status: WsMessage;;
  system : System;
  constructor(private reportServicse : ReportService,
    private notificationService : NotificationService,
    public router: Router,
    public dialog: MatDialog,
    public websocketService : WebsocketService) { }

  ngOnInit(): void {

    this.serverFullUrl = environment.apiUrl+this.serverURL+environment.apiPort;
    this.reportServicse.getReports(this.serverURL).subscribe(data=>{
    this.reports = data;


    for (let report of this.reports){
      this.notificationService.getAllByReport(this.serverURL, report.id).subscribe(data=>{
        report.notifications = data;
      
      })
    }
   });
  
    }
    selectFile(event: any): void {
      this.selectedFiles = event.target.files;
      this.upload();
    }
    upload(): void {
      this.progress = 0;
    
      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);
        if (file) {
          this.currentFile = file;
          this.reportServicse.upload(this.serverURL, this.currentFile).subscribe(
            (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) {
                this.message = event.body.message;
                this.reportServicse.getReports(this.serverURL).subscribe(data=>{
                  this.reports = data;
                });
              }
            },
            (err: any) => {
              console.log(err);
              this.progress = 0;
    
              if (err.error && err.error.message) {
                this.message = err.error.message;
              } else {
                this.message = 'Could not upload the file!';
              }
    
              this.currentFile = undefined;
            });
        }
    
        this.selectedFiles = undefined;
      }
    }
      getReport(report : Report){
        this.reportServicse.getFile(this.serverURL, report.id).subscribe(data => {
          this.blob = new Blob([data], {type: 'application/vnd.ms-excel'});
          var downloadURL = window.URL.createObjectURL(data);
          var link = document.createElement('a');
          link.href = downloadURL;
          link.download = report.name.toString();
          link.click();
        });
      }
    generateReport(report : Report){
       
        this.dialog.open(ProgressDialogComponent, {
          width: '1000px',
          height: '200px',
          data: report
        }).afterClosed().subscribe(result => {
         
         
        });
      
      this.reportServicse.generateTest(this.serverURL, report.id, Math.floor(Math.random() * 100)).subscribe(data => {
        this.blob = new Blob([data], {type: 'application/vnd.ms-excel'});
        var downloadURL = window.URL.createObjectURL(data);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = report.name.toString();
        link.click();
      });

    }
  
    edit(report : Report){

    }
    remove(report : Report){
      this.reportServicse.delete(this.serverURL, report).subscribe(data=>{
        this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() => 
        this.router.navigate(["report"])); 
      })
    }
    list(report : Report) {
      this.router.navigate(['/message/'],{ queryParams: { reportId: report.id}});
    }
    doTest(){

    }
  
   
    connect(){
 
    }
  
    disconnect(){
      this.websocketService.disconnect();
    }
  
    sendMessage(){
      this.websocketService.send(this.name);
    }
  
    handleMessage(message){
      this.greeting = message;
    }
  }
  