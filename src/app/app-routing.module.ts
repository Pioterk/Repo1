import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MaincontainerComponent } from './maincontainer/maincontainer/maincontainer.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { SpecialistGuard} from './specialist.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: MaincontainerComponent, children: [
      { path: '', redirectTo: 'report', pathMatch: 'full' },
      { path: 'user', loadChildren: () => import('./svc-user/svc-users.module').then(m => m.SvcUsersModule),canActivate: [AuthGuard,SpecialistGuard]  },
      { path: 'notification', loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule),canActivate: [AuthGuard, SpecialistGuard]},
      { path: 'report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule),canActivate: [AuthGuard]},
      { path: 'generatedReport', loadChildren: () => import('./generted-reports/generted-reports.module').then(m => m.GenertedReportsModule),canActivate: [AuthGuard]},
      { path: 'message', loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule),canActivate: [AuthGuard]},
      { path: 'system', loadChildren: () => import('./system/system.module').then(m => m.SystemModule),canActivate: [AuthGuard, AdminGuard]},
      { path: 'strategy', loadChildren: () => import('./strategy/strategy.module').then(m => m.StrategyModule),canActivate: [AuthGuard, SpecialistGuard]},
      { path: 'datapoint', loadChildren: () => import('./datapoint/datapoint.module').then(m => m.DatapointModule),canActivate: [AuthGuard, SpecialistGuard]},
    ]},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
