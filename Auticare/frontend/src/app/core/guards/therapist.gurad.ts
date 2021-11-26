import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot,RouterStateSnapshot, CanActivate, CanLoad, Router, Route } from "@angular/router";
import { Observable } from "rxjs";
import { Role } from "../models/role";
import { AuthenticationService } from "../services/auth.service";
import { AuthService } from "src/app/modules/auth/_services/auth.service";

@Injectable()
export class AuthTherapistGuard implements CanActivate, CanLoad{

  constructor(private router: Router,
      private authService: AuthService){
      
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (this.authService.isAuthorized()) {
        const isAuthorized = localStorage.getItem('isAuthorized');
        if (isAuthorized) {
          return true;
        }
      }
      this.router.navigate(['login']);
      return false;
    }

    canLoad(route: Route): boolean {
      if (this.authService.isAuthorized()) {
        return true;
      }
      this.router.navigate(['login']);
      return false;
    }
}
