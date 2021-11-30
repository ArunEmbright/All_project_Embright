import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { authService } from '../_services/auth-service';

@Injectable()
export class AuthGuard implements CanActivate {

    

    constructor(private router: Router
        , private authService: authService) {}

    canActivate() {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        this.router.navigate(['/mindcare/auth/login']);
        return false;
    }


}