import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSvcUserComponent } from './list-svc-user/list-svc-user.component';
import { SvcUserRoutingModule } from './svc-user-routing.module';
import { CommonutlisModule} from '../commonutlis/commonutlis.module'


@NgModule({
  declarations: [ListSvcUserComponent],
  imports: [
    CommonModule,
    SvcUserRoutingModule,
    CommonutlisModule
    
  ],
})
export class SvcUsersModule { }
