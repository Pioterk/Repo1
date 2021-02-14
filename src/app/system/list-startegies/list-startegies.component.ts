

import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Message } from '../../model/message';
import { environment } from 'src/environments/environment';
import { Strategy } from '../../model/strategy';
import { StrategyService} from '../../services/strategy.service';

@Component({
  selector: 'app-list-startegies',
  templateUrl: './list-startegies.component.html',
  styleUrls: ['./list-startegies.component.css']
})
export class ListStartegiesComponent implements OnInit {
  serverFullUrl : string;
  serverURL: String = window.location.href.split(/\/\//)[1].split(/\/|:/)[0]
  constructor(  public dialogRef: MatDialogRef<ListStartegiesComponent>,
    private strategyService :StrategyService,
    @Inject(MAT_DIALOG_DATA) public startegies: Strategy[]) { }

  ngOnInit(): void {
    this.serverFullUrl = environment.apiUrl+this.serverURL+environment.apiPort;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getReport(){

  }
  delete(startegy){
    this.strategyService.remove(this.serverURL, startegy).subscribe(data =>{
      this.strategyService.getAll(this.serverURL).subscribe(data=>{
        this.startegies=data;
      })

    });
  }

}

