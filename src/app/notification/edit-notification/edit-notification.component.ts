import { Component, OnInit } from '@angular/core';
import { NotificationService} from '../../services/notification.service';
import { StrategyService } from '../../services/strategy.service';
import { UserService} from "../../services/user.service";
import { Notification } from '../../model/notification';
import { Router, ActivatedRoute } from '@angular/router';
import { Strategy } from 'src/app/model/strategy';
import { SvcUser } from 'src/app/model/svc-user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PickUpUserComponent} from '../pick-up-user/pick-up-user.component';
import { AssignStrategyTextNotificationToReport } from 'src/app/model/assign-strategy-text-notification-to-report';

@Component({
  selector: 'app-edit-notification',
  templateUrl: './edit-notification.component.html',
  styleUrls: ['./edit-notification.component.css']
})
export class EditNotificationComponent implements OnInit {
  
  notificationId : number;
  notification : Notification;
  notificationForm: FormGroup;
  serverURL: String = window.location.href.split(/\/\//)[1].split(/\/|:/)[0]
  strategies : Array<Strategy>;
  curStrategy : Strategy;
  users : Array<any> = new Array();
  email : boolean;
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
   
    this.route.queryParams.subscribe(params => {
      this.notificationId = params.notificationId;
      this.notificationService.getById(this.serverURL, params.notificationId).subscribe(data=>{
        this.notification = data[0];
        this.hardDrive = this.notification.hardDrive;
        this.email = this.notification.email;

          this.strategyService.getAllByNotification(this.serverURL, this.notificationId ).subscribe(data=>{
            this.curStrategy = data[0];
            this.userService.getAllByNotification(this.serverURL, this.notificationId ).subscribe(data=>{
              this.users = data;
              this.notificationForm.controls['subject'].setValue(this.notification.subject);
              this.notificationForm.controls['text'].setValue(this.notification.text);

            })
            this.strategyService.getAll(this.serverURL).subscribe(data=>{
              this.strategies = data;
              let toSelect: Strategy = this.strategies.find(s => s.id == this.curStrategy.id);
              this.notificationForm.controls['strategy'].setValue(toSelect);
            })

          })
        })
    });
    this.notificationForm = this.formBuilder.group({
      strategy :[null, Validators.required],
      subject: [null, Validators.required],
      text: [null, Validators.required],
      email :[null],
      hardDrive :[null],
    });
  }
  submit() {
   
    
    if (this.notificationForm.controls['subject'].valid){
      this.notification.subject = this.notificationForm.controls['subject'].value;
    }
    if (this.notificationForm.controls['text'].valid){
      this.notification.text = this.notificationForm.controls['text'].value;
    }
    if (this.notificationForm.controls['strategy'].valid && (this.email || this.hardDrive)){
      this.notification.email = this.notificationForm.controls['email'].value;
      this.notification.hardDrive = this.notificationForm.controls['hardDrive'].value;
      let assignStrategyTextNotificationToReport: AssignStrategyTextNotificationToReport = new AssignStrategyTextNotificationToReport();
      assignStrategyTextNotificationToReport.notification = this.notification;
      assignStrategyTextNotificationToReport.strategy = this.notificationForm.controls['strategy'].value
      assignStrategyTextNotificationToReport.users = this.users;
      this.notificationService.create(this.serverURL, assignStrategyTextNotificationToReport).subscribe(data=>{
      this.router.navigate(['/report']);
      })
    }else{
      return;
    }
  }
  add(){
    this.router.navigate(['/strategy/add'],{ queryParams: {notificationId: this.notificationId}});
  }
  remove(user){
    this.users = this.users.filter(obj => obj !== user);
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
}
