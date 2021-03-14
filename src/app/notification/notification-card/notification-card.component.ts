import { Component, OnInit, Input } from '@angular/core';
import { Strategy } from 'src/app/model/strategy';
import { StrategyService} from '../../services/strategy.service';
import { UserService } from '../../services/user.service';
import { Notification} from '../../model/notification';
import { SvcUser } from 'src/app/model/svc-user';
import { NotificationService} from '../../services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService} from '../../services/messages.service';
import { ListMessagesComponent} from '../list-messages/list-messages.component'
import { Message } from 'src/app/model/message';
import { MessageWraper } from 'src/app/model/message-wraper';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.css']
})
export class NotificationCardComponent implements OnInit {
  checked = true;
  usersLeft : number = 0;
  indeterminate = false;
  serverURL: String = window.location.href.split(/\/\//)[1].split(/\/|:/)[0]
  constructor(
    public router: Router,
    private strategyService :StrategyService,
    private userService :UserService,
    private notificationService : NotificationService,
    public dialog: MatDialog,
    private messageService : MessageService,

  ) { }
  @Input() notification: Notification;

  strategies : Array<Strategy>;
  users: Array<SvcUser>;

  ngOnInit(): void {

    this.strategyService.getAllByNotification(this.serverURL, this.notification.id).subscribe(data =>{
      this.strategies = data;
    });
    this.userService.getAllByNotification(this.serverURL, this.notification.id).subscribe(data =>{
      this.users = data;
      if (data.length>3){
        this.usersLeft = data.length-3
      }
      });

  
  }
  drop(){
    this.notificationService.remove(this.serverURL, this.notification).subscribe(data=>{
      this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() => 
      this.router.navigate(["report"])); 
    })
  }
  edit(notification: Notification){
    if (notification!=null){
      this.router.navigate(['/notification/edit'],{ queryParams: { notificationId: this.notification.id}});
    }
    }
  showMessages(){
    this.messageService.getAllActiveByNotificationPageable(this.serverURL, this.notification.id, 0,50)
    .subscribe(result => {
      let messages : Array<Message> = result.content;
      for (let message of messages){
          message.errorCode = this.convertToBin(message.errorCode);
      }
      let  mw :MessageWraper = new MessageWraper();
      mw.messages = messages;
      mw.notification = this.notification;
      this.dialog.open(ListMessagesComponent, {
        width: '1000px',
        height: '1200px',
        data: mw
      }).afterClosed().subscribe(result => {
       
       
      });
    });
  }


convertToBin(num : number) : string{
  var n = num.toString(2);
  return "00000000".substr(n.length) + n;
}



}
