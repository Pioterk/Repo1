import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListReportComponent} from './list-report/list-report.component';
import { AddReportComponent } from './add-report/add-report.component';
import { EditReportComponent } from './edit-report/edit-report.component';

const routes: Routes = [
  { path: '', component: ListReportComponent },
  { path: 'add', component: AddReportComponent },
  { path: 'edit', component: EditReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class reportRoutingModule { }