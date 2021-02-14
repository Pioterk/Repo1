import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SystemService} from '../services/system.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  svcAddress: string;
  serverURL: string = window.location.href.split(/\/\//)[1].split(/\/|:/)[0];
  constructor(private fb: FormBuilder,
    public router: Router,
    private authService: AuthService,
    private systemService: SystemService) { }

  ngOnInit() {
    this.systemService.getSvcAddress(this.serverURL).subscribe(data=>{
      this.svcAddress = data.svcServer;
    })
    this.loginForm = this.fb.group({
      address: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(data =>{
      localStorage.setItem("id_token", data.token)
      localStorage.setItem('currentUser', this.loginForm.value.login);
      this.router.navigate(['user']);
  });
}


}
