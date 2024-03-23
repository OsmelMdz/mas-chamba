import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authS: AuthService, private navCtrl: NavController) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authS.isLoggedIn()) {
      console.log('Bienvenido a Más Chamba');
      return true;
    } else {
      this.router.navigate(['menu/tabs/tab1']);
      console.log('No estas autenticado');
      return false;
    }
  }
}
