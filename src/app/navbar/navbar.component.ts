import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService} from '../auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser : String = null;
  administrator : Boolean = false;



  constructor(private router: Router,
    private authService: AuthService) {}

  ngOnInit() {

    this.currentUser = localStorage.getItem("currentUser");


  }
  onUserClick(){
    this.router.navigate(['user']);
  }
  onResourceClick(){
    this.router.navigate(['resource']);
  }
  onTeamClick(){
  this.router.navigate(['team',0]);
  }

  logout(){
    
    this.authService.logout();
  }

}
