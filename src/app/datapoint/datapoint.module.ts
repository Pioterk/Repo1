import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatapointRoutingModule} from './datapoint-routing.module'
import { CommonutlisModule} from '../commonutlis/commonutlis.module';
import { PageableListComponent } from './pageable-list/pageable-list.component'


@NgModule({
  declarations: [PageableListComponent],
  imports: [
    CommonModule,
    DatapointRoutingModule,
    CommonutlisModule
    
  ]
})
export class DatapointModule { }
