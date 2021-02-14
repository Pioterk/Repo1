import { Component, OnInit } from '@angular/core';
import { System } from '../../model/system';
import { SystemService} from '../../services/system.service';
import { MatDialog } from '@angular/material/dialog';
import { StrategyService} from '../../services/strategy.service';
import { ListStartegiesComponent} from '../list-startegies/list-startegies.component'
import { WsMessage } from 'src/app/model/ws-message';
import { WebsocketService} from '../../services/websocket.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit {
  address : string;
  system: System;
  updateDataPointsStatus: WsMessage;
  serverURL: String = window.location.href.split(/\/\//)[1].split(/\/|:/)[0]
  constructor(
    private strategyService :StrategyService,
    public dialog: MatDialog,
    private systemService : SystemService,
    public websocketService: WebsocketService,
  ) { }

  ngOnInit(): void {
    this.systemService.getSystem(this.serverURL).subscribe(data=>{
      this.system = data;
    })
   

  }
  
  updateDataPoints(){
    
    this.system.jobId = Math.floor(Math.random() * 100);
    this.websocketService.messageAsObservable().subscribe(data=>{
      if (data.jobId==this.system.jobId){
        this.updateDataPointsStatus = data; 
        console.log(data);
      }
    })

    this.systemService.updateDataPoints(this.serverURL, this.system).subscribe(data=>{
  
    })
  }
  updateUsers(){
    this.systemService.updateUsers(this.serverURL, this.system).subscribe(data=>{

    })
  }
  testEmail(){
    this.systemService.testEmail(this.serverURL, this.system).subscribe(data=>{
      if (data.status==200){
        window.alert("Test email have been sent correctly!");
      }else {
     
      }
    })
  }
  clearMessages(){
    this.systemService.clearMessages(this.serverURL, this.system).subscribe(data=>{
      if (data.status==200){
        window.alert("Messages cleared!");
      }else {    
      }
    })
  }
  testComunication(){
    this.systemService.testConncetion(this.serverURL, this.system).subscribe(data=>{
      if (data.status==200){
        window.alert("Conncection ok!");
      }else {    
      }
    })
  }
  testFilePath(){
    this.systemService.testFilePath(this.serverURL, this.system).subscribe(data=>{
      if (data.status==200){
        window.alert("File path ok!");
      }else {
     
      }
    })
  }
 
  update(){
    this.systemService.save(this.serverURL,this.system).subscribe(data=>{

    });
  }
  showStrategies(){
    this.strategyService.getAll(this.serverURL)
    .subscribe(result => {
      this.dialog.open(ListStartegiesComponent, {
        width: '800px',
        height: '800px',
        data: result
      }).afterClosed().subscribe(result => {
       
       
      });
    });
  }


}
