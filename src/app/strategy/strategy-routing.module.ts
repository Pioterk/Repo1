import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStrategyComponent } from './add-strategy/add-strategy.component';
import { EditStrategyComponent } from './edit-strategy/edit-strategy.component';

const routes: Routes = [
  { path: 'add', component: AddStrategyComponent },
  { path: 'edit', component: EditStrategyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StrategyRoutingModule { }