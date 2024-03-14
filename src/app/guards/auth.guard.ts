import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authS.isAuth()) {
      console.log("Estamos Dentro");
      return true;
    } else {
      console.log("Estamos fuera");
      this.router.navigateByUrl('login', { replaceUrl: true });
    }
    return true;
  }
  constructor(private router: Router, private authS: AuthService) {
  }
}
