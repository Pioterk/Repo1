import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListGneratedReportComponent} from './list-gnerated-report/list-gnerated-report.component';


const routes: Routes = [
  { path: '', component: ListGneratedReportComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenertedReportRoutingModule { }