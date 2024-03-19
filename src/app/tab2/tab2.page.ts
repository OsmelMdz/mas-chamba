import { Component, OnInit } from '@angular/core';
import { ServicioService, Servicio ,ServiciosResponse } from '../services/servicio.service';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  servicios: Servicio[] = [];
  isLargeScreen: boolean = true;

  constructor(private servicioService: ServicioService, private authService: AuthService, private toastController: ToastController, private router: Router) { }

  ngOnInit(): void {
    console.log('No robes datos');
    this.getServicios();
  }

  getServicios(): void {
    this.servicioService.getServicios().subscribe(
      (response: Servicio[]) => {
        this.servicios = response;
        //console.log('Servicios:', this.servicios);
      },
      (error) => {
        console.error('Error al obtener los servicios:', error);
      }
    );
  }

  logout() {
    localStorage.removeItem(this.authService.tokenKey);
    console.log('Cerrando sesión');
    this.authService.logout();
    this.router.navigateByUrl('menu/tabs/tab1', { replaceUrl: true });
    this.showToast();
  }
  async showToast() {
    const message = '¡Has cerrado sesión con éxito!';
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
