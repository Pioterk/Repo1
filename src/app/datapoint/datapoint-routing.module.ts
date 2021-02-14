import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDatapointComponent} from './list-datapoint/list-datapoint.component';
import { PageableListComponent} from './pageable-list/pageable-list.component'

const routes: Routes = [
  { path: '', component: ListDatapointComponent },
  { path: 'list', component: PageableListComponent },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatapointRoutingModule { }