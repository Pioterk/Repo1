import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialistGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.authService.hasRole("Administrator") && !this.authService.hasRole("Specialist")) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
