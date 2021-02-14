import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemComponent } from './system/system.component';
import { systemRoutingModule} from './system-routing.module'
import { CommonutlisModule} from '../commonutlis/commonutlis.module';
import { ListStartegiesComponent } from './list-startegies/list-startegies.component';



@NgModule({
  declarations: [SystemComponent, ListStartegiesComponent],
  imports: [
    CommonModule,
    systemRoutingModule,
    CommonutlisModule
  ],
  entryComponents: [ListStartegiesComponent]
})
export class SystemModule { }
