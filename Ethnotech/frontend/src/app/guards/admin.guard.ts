import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
;
@Injectable({
  providedIn: 'root'
})
export class AuthAdminService implements CanActivate {
  credentials = {
    email: 'iiop_admin',
    password: 'ethnotech'
  };

  constructor(
    private router: Router
  ) { }

  // Guard for preventing the unauthorized access
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthorized = localStorage.getItem('isAuthorized');
    if (isAuthorized) {
      return true;
    }
  
    return this.router.navigate(['auth/login']);
  }

  // Method for user signin
  signIn(email: string, password: string) {
    if (email === this.credentials.email && password === this.credentials.password) {
      localStorage.setItem('isAuthorized', JSON.stringify(1));
      this.router.navigate(['admin/user-detail']);
    }
  }

  // Method for user signout
  signOut() {
    localStorage.clear();
    this.router.navigate(['auth/login']);
    //console.log('hello')
  }
}