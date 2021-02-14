import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Message } from '../../model/message';
import { environment } from 'src/environments/environment';
import { GenertedReportService } from '../../services/generted-report.service'
import { GenertedReport } from 'src/app/model/generted-report';

@Component({
  selector: 'app-list-messages',
  templateUrl: './list-messages.component.html',
  styleUrls: ['./list-messages.component.css']
})
export class ListMessagesComponent implements OnInit {
  serverFullUrl : string;
  blob;
  serverURL: String = window.location.href.split(/\/\//)[1].split(/\/|:/)[0]
  constructor(  public dialogRef: MatDialogRef<ListMessagesComponent>,
    @Inject(MAT_DIALOG_DATA) public messages: Message[],
    public genertedReportService : GenertedReportService) { }

  ngOnInit(): void {
    this.serverFullUrl = environment.apiUrl+this.serverURL+environment.apiPort;
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
 

}
