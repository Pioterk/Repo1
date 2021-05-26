import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageableListComponent} from './pageable-list/pageable-list.component'

const routes: Routes = [
  { path: 'list', component: PageableListComponent },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatapointRoutingModule { }