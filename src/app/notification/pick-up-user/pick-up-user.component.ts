import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SvcUser} from '../../model/svc-user'

@Component({
  selector: 'app-pick-up-user',
  templateUrl: './pick-up-user.component.html',
  styleUrls: ['./pick-up-user.component.css']
})
export class PickUpUserComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<PickUpUserComponent>,
    @Inject(MAT_DIALOG_DATA) public users: SvcUser[]) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
