import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListStrategyComponent} from './list-strategy/list-strategy.component';
import { AddStrategyComponent } from './add-strategy/add-strategy.component';
import { EditStrategyComponent } from './edit-strategy/edit-strategy.component';

const routes: Routes = [
  { path: '', component: ListStrategyComponent },
  { path: 'add', component: AddStrategyComponent },
  { path: 'edit', component: EditStrategyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StrategyRoutingModule { }