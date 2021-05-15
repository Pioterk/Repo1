import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListNotificationComponent } from './list-notification/list-notification.component';
import { AddNotificationComponent } from './add-notification/add-notification.component';
import { EditNotificationComponent } from './edit-notification/edit-notification.component';
import { NotificationRoutingModule } from './notification-routing.module'
import { NotificationCardComponent } from './notification-card/notification-card.component';
import { CommonutlisModule} from '../commonutlis/commonutlis.module';
import { ListMessagesComponent } from './list-messages/list-messages.component';


@NgModule({
  declarations: [ListNotificationComponent, AddNotificationComponent, EditNotificationComponent, NotificationCardComponent, ListMessagesComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    CommonutlisModule,

 

  ],
  exports: [NotificationCardComponent],
  entryComponents: [ListMessagesComponent ],
  
})
export class NotificationModule { }
