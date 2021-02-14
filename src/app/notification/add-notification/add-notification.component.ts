import { Component, Input, OnInit } from '@angular/core';
import { StrategyService } from '../../services/strategy.service';
import { NotificationService} from '../../services/notification.service';
import { Notification } from '../../model/notification';
import { Strategy } from 'src/app/model/strategy';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Report } from 'src/app/model/report';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService} from "../../services/user.service";
import { MatDialog } from '@angular/material/dialog';
import { AssignStrategyTextNotificationToReport } from 'src/app/model/assign-strategy-text-notification-to-report';
import { PickUpUserComponent} from '../pick-up-user/pick-up-user.component';


@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.css']
})
export class AddNotificationComponent implements OnInit {

  selectedStrategy : Strategy;
  strategies : Array<any>;
  serverURL: String = window.location.href.split(/\/\//)[1].split(/\/|:/)[0]
  notificationForm: FormGroup;
  reportId: number;
  users : Array<any> = new Array();
  email :boolean = true;
  hardDrive : boolean;
  constructor(
    private formBuilder: FormBuilder,
    private userService : UserService,
    private strategyService : StrategyService,
    private notificationService : NotificationService,
    public router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
    ) { }

  
  ngOnInit(): void {
    this.notificationForm = this.formBuilder.group({
      strategy :[null, Validators.required],
      subject: [null, Validators.required],
      text: [null, Validators.required],
      email :[null],
      hardDrive :[null],


    });
    this.route.queryParams
    .subscribe(params => {
      this.reportId = params.reportId;
    });
      this.strategyService.getAll(this.serverURL).subscribe(data=>{
      this.strategies = data;
      })
   

  }
  submit() {
   
      let notification : Notification = new Notification();
      if (this.notificationForm.controls['subject'].valid){
        notification.subject = this.notificationForm.controls['subject'].value;
      }
      if (this.notificationForm.controls['text'].valid){
        notification.text = this.notificationForm.controls['text'].value;
      }
      console.log(this.notificationForm.controls['strategy'].valid);
      if (this.notificationForm.controls['strategy'].valid && (this.email || this.hardDrive)){


      notification.email = this.notificationForm.controls['email'].value;
      notification.hardDrive = this.notificationForm.controls['hardDrive'].value;
    
      let assignStrategyTextNotificationToReport: AssignStrategyTextNotificationToReport = new AssignStrategyTextNotificationToReport();
      assignStrategyTextNotificationToReport.notification = notification;
      assignStrategyTextNotificationToReport.strategy = this.notificationForm.controls['strategy'].value
      assignStrategyTextNotificationToReport.reportId = this.reportId;
      assignStrategyTextNotificationToReport.users = this.users;


      this.notificationService.create(this.serverURL, assignStrategyTextNotificationToReport).subscribe(data=>{
        console.log("assssssssssasas")
        this.router.navigate(['/report']);
      })
    } else{
      return;
    }
  
    
    }
  add(){
  
    this.router.navigate(['/strategy/add'],{ queryParams: { reportId: this.reportId}});
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
        
          let existingUsers : Array<any> = this.users.filter(obj => obj.id == result.id);
     
          if (existingUsers.length==0){
            this.users.push(result);
          }
        
        }

        
      });
    });
  }
  create(user){

  }
  remove(user){

    this.users = this.users.filter(obj => obj !== user);
  }
}
