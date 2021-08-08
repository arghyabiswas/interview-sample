import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ApiServices } from '../_services/ApiServices';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private apiServices: ApiServices
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.apiServices.currentUser
            .subscribe(user => {
                if (user && user.userName != null) {
                    // authorised so return true
                    return true;
                }
                this.router.navigate(['../login'], { queryParams: { returnUrl: state.url } });
                return false;
            });
        return true;
    }
}