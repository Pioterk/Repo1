import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMessageComponent} from './list-message/list-message.component';
import { AddMessageComponent } from './add-message/add-message.component';
import { EditMessageComponent } from './edit-message/edit-message.component';

const routes: Routes = [
  { path: '', component: ListMessageComponent },
  { path: 'add', component: AddMessageComponent },
  { path: 'edit', component: EditMessageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }