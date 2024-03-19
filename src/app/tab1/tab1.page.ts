import { Component, OnInit } from '@angular/core';
import { PrestadorService, Prestador, PrestadoresResponse } from '../services/prestador.service';
import { AuthService } from '../services/auth.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PerfilPrestadorComponent } from '../components/perfil-prestador/perfil-prestador.component';
import { user_profile } from '../components/perfil-prestador/perfil-prestador.component';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  components = [
    {
      title: 'Perfil',
      buttonText: 'Abrir Componente',
      calculatorModal: 'componente-modal-1'
    }
  ]

  prestadores: Prestador[] = [];
  isLargeScreen: boolean = true;
  userProfile: any;

  constructor(private modalCtrl: ModalController,
    private prestadorService: PrestadorService,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router) { }

  async ngOnInit() {
    console.log('No robes datos');
    this.getPrestadores();
  }

  getPrestadores(): void {
    this.prestadorService.getPrestadoresF()
      .subscribe(
        (response: PrestadoresResponse) => {
          if (response && response['prestadores']) {
            this.prestadores = response['prestadores'];
            //console.log('Prestadores:', this.prestadores);
          } else {
            console.error('La respuesta del servidor no tiene la estructura esperada:', response);
          }
        },
        (error) => {
          console.error('Error al obtener los prestadores:', error);
        }
      );
  }

  logout() {
    localStorage.removeItem(this.authService.tokenKey);
    this.authService.logout().subscribe(
      () => {
        console.log('Usuario deslogueado con éxito');
        this.router.navigateByUrl('menu/tabs/tab1', { replaceUrl: true });
        this.showToast('¡Has cerrado sesión con éxito!');
      },
      (error) => {
        console.error('Error al desloguear el usuario:', error);
      }
    );
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  async perfil(componenteModal: string) {
    let component;
    switch (componenteModal) {
      case 'componente-modal-1':
        component = PerfilPrestadorComponent;
        break;
      default:
        console.error('Modal no reconocido');
        return;
    }
    const modal = await this.modalCtrl.create({
      component: component,
      mode: 'ios',
      backdropDismiss: false,
    });

    await modal.present();
  }

}
