import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMessageComponent } from './list-message/list-message.component';
import { AddMessageComponent } from './add-message/add-message.component';
import { EditMessageComponent } from './edit-message/edit-message.component';
import { MessageRoutingModule } from './message-routing.module';
import { CommonutlisModule } from '../commonutlis/commonutlis.module';
import { NotificationModule } from '../notification/notification.module'



@NgModule({
  declarations: [ListMessageComponent, AddMessageComponent, EditMessageComponent],
  imports: [
    CommonModule,
    MessageRoutingModule,
    CommonutlisModule,
    NotificationModule
  ],
  exports: [ListMessageComponent]
})
export class MessagesModule { }
