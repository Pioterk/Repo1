import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSvcUserComponent } from './list-svc-user/list-svc-user.component';
import { SvcUserRoutingModule } from './svc-user-routing.module';
import { CommonutlisModule} from '../commonutlis/commonutlis.module';
import { RoleDialogComponent } from './role-dialog/role-dialog.component'


@NgModule({
  declarations: [ListSvcUserComponent, RoleDialogComponent],
  imports: [
    CommonModule,
    SvcUserRoutingModule,
    CommonutlisModule
    
  ],
  providers: [RoleDialogComponent]
})
export class SvcUsersModule { }
