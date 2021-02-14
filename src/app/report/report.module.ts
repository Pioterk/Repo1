import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { ListReportComponent } from './list-report/list-report.component';
import { AddReportComponent } from './add-report/add-report.component';
import { EditReportComponent } from './edit-report/edit-report.component';
import { reportRoutingModule } from './report-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonutlisModule} from '../commonutlis/commonutlis.module';
import { NotificationModule} from '../notification/notification.module';
import { ProgressDialogComponent } from './progress-dialog/progress-dialog.component';


@NgModule({
  declarations: [ListReportComponent, AddReportComponent, EditReportComponent, ProgressDialogComponent],
  imports: [
    CommonModule,
    reportRoutingModule,
    FontAwesomeModule,
    CommonutlisModule,
    NotificationModule,


  ],
  providers: [ProgressDialogComponent]
})
export class ReportModule { }
