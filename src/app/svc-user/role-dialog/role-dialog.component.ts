import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SvcUser } from 'src/app/model/svc-user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.css']
})
export class RoleDialogComponent implements OnInit {
  public selection: string;
  serverURL: String = window.location.href.split(/\/\//)[1].split(/\/|:/)[0];
  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<RoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: SvcUser,
  ) { }

  ngOnInit(): void {
    if (this.user.role.administrator){
      this.selection = "administrator"
    }
    if (this.user.role.specialist){
      this.selection = "specialist"
    }
    if (this.user.role.operator){
      this.selection = "operator"
    }
  }
  change(){
    console.log(this.selection);
    if (this.selection == "administrator"){
      this.user.role.administrator = true;
      this.user.role.specialist = false;
      this.user.role.operator = false;
    } else 
    if (this.selection == "specialist"){
      this.user.role.administrator = false;
      this.user.role.specialist = true;
      this.user.role.operator = false;
    } else
    if (this.selection == "operator"){
      this.user.role.administrator = false;
      this.user.role.specialist = false;
      this.user.role.operator = true;
    } else {
      this.user.role.administrator = false;
      this.user.role.specialist = false;
      this.user.role.operator = false;
      
    }
    this.userService.assignUserToTeam(this.serverURL, this.user.id, this.user.role.administrator, this.user.role.specialist, this.user.role.operator).subscribe(data=>{
      this.dialogRef.close();
    })

  }
  onNoClick(){
    this.dialogRef.close();
  }
}
