import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDatapointComponent } from './list-datapoint/list-datapoint.component';
import { DatapointRoutingModule} from './datapoint-routing.module'
import { CommonutlisModule} from '../commonutlis/commonutlis.module';
import { PageableListComponent } from './pageable-list/pageable-list.component'


@NgModule({
  declarations: [ListDatapointComponent, PageableListComponent],
  imports: [
    CommonModule,
    DatapointRoutingModule,
    CommonutlisModule
    
  ]
})
export class DatapointModule { }
