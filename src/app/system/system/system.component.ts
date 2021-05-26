import { Component, OnInit } from '@angular/core';
import { System } from '../../model/system';
import { SystemService} from '../../services/system.service';
import { MatDialog } from '@angular/material/dialog';
import { StrategyService} from '../../services/strategy.service';
import { ListStartegiesComponent} from '../list-startegies/list-startegies.component'
import { WsMessage } from 'src/app/model/ws-message';
import { WebsocketService} from '../../services/websocket.service';
import { PickUpUserComponent} from '../../commonutlis/pick-up-user/pick-up-user.component';
import { UserService} from "../../services/user.service";
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit {
  address : string;
  system: System;
  updateDataPointsStatus: WsMessage;
  updateUserStatus: WsMessage;
  userJobId:number;
  datapointJobId:number;
  mailPassword: string;
  mailUserName: string;
  serverURL: String = window.location.href.split(/\/\//)[1].split(/\/|:/)[0];
  users : Array<any> = new Array();
  constructor(
    private strategyService :StrategyService,
    private userService : UserService,
    public dialog: MatDialog,
    private systemService : SystemService,
    public websocketService: WebsocketService,
    public router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.system = new System();
    this.systemService.getSystem(this.serverURL).subscribe(data=>{
      this.system = data;

    })
  }
  
  updateDataPoints(){
 
    this.datapointJobId = Math.floor(Math.random() * 100);
    let system : System = new System();
    system.jobId = this.datapointJobId;
    this.websocketService.messageAsObservable().subscribe(data=>{
      if (data.jobId==this.datapointJobId){
        this.updateDataPointsStatus = data; 
      }
    })

    this.systemService.updateDataPoints(this.serverURL, system).subscribe(data=>{
  
    })
  }
  updateUsers(){
    this.userJobId = Math.floor(Math.random() * 100);
    let system : System = new System();
    system.jobId = this.userJobId;
    this.websocketService.messageAsObservable().subscribe(data=>{
      if (data.jobId==this.userJobId){
        this.updateUserStatus = data; 
      }
    })

    this.systemService.updateUsers(this.serverURL, system).subscribe(data=>{

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
 
  updatePassword(){
    let system:System = new System();
    system.mailPassword = this.mailPassword;
    this.systemService.savePwd(this.serverURL, system).subscribe(data=>{
    });
  }
  updateMailUser(){
    let system:System = new System();
    system.mailUserName = this.system.mailUserName;
    this.systemService.saveMailUser(this.serverURL, system).subscribe(data=>{
    });
  }
  
 
  removeApiUser(){
    this.systemService.removeApiUser(this.serverURL, this.system).subscribe(data=>{
      this.authService.logout();
    })
    
  }


  addUser(){
    this.userService.getAll(this.serverURL)
    .subscribe(result => {
      this.dialog.open(PickUpUserComponent, {
        width: '500px',
        height: '600px',
        data: result
      }).afterClosed().subscribe(result => {
        if (result!=undefined){
          console.log(result);
          let existingUsers : Array<any> = this.users.filter(obj => obj.id == result.id);
     
          if (existingUsers.length==0){
            this.users.push(result);
          }
        
        }

        
      });
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
  clear(){
    this.systemService.clearMessages(this.serverURL, this.system).subscribe(data=>{
      this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() => 
      this.router.navigate(["system"])); 
    })
    


  }
}
