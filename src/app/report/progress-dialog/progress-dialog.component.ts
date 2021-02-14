import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Message } from '../../model/message';
import { environment } from 'src/environments/environment';
import { Report } from 'src/app/model/report';
import { WebsocketService} from '../../services/websocket.service';
import { WsMessage } from 'src/app/model/ws-message';

@Component({
  selector: 'app-progress-dialog',
  templateUrl: './progress-dialog.component.html',
  styleUrls: ['./progress-dialog.component.css']
})
export class ProgressDialogComponent implements OnInit {
  serverFullUrl : string;
  serverURL: String = window.location.href.split(/\/\//)[1].split(/\/|:/)[0];
  status: WsMessage;

  constructor(  public dialogRef: MatDialogRef<ProgressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public report: Report,
    public websocketService: WebsocketService) { }

  ngOnInit(): void {
    this.serverFullUrl = environment.apiUrl+this.serverURL+environment.apiPort;
    this.websocketService.messageAsObservable().subscribe(data=>{
      this.status = data;

    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getReport(){
   
  }
 

}
