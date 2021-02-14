import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListGneratedReportComponent } from './list-gnerated-report/list-gnerated-report.component';
import {GenertedReportRoutingModule} from './generted-report-routing.module'


@NgModule({
  declarations: [ListGneratedReportComponent],
  imports: [
    CommonModule,
    GenertedReportRoutingModule
  ]
})
export class GenertedReportsModule { }
