import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSvcUserComponent} from './list-svc-user/list-svc-user.component';

const routes: Routes = [
  { path: '', component: ListSvcUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SvcUserRoutingModule { }