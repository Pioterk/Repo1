import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNotificationComponent } from './add-notification/add-notification.component';
import { EditNotificationComponent } from './edit-notification/edit-notification.component';



const routes: Routes = [
    { path: 'add', component: AddNotificationComponent },
    { path: 'edit', component: EditNotificationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})
export class NotificationRoutingModule { }