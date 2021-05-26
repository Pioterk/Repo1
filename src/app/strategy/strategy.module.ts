import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStrategyComponent } from './add-strategy/add-strategy.component';
import { EditStrategyComponent } from './edit-strategy/edit-strategy.component';
import { StrategyRoutingModule } from './strategy-routing.module';
import { CommonutlisModule} from '../commonutlis/commonutlis.module';


@NgModule({
  declarations: [AddStrategyComponent, EditStrategyComponent],
  imports: [
    CommonModule,
    StrategyRoutingModule,
    CommonutlisModule
  ]
})
export class StrategyModule { }
