import { Component, OnInit } from '@angular/core';
import { PrestadorService, Prestador, PrestadoresResponse } from '../services/prestador.service';
import { AuthService } from '../services/auth.service';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PerfilPrestadorComponent } from '../components/perfil-prestador/perfil-prestador.component';
import { ContactarComponentComponent } from '../components/contactar-component/contactar-component.component';
import { PoliticasComponent } from '../components/politicas/politicas.component';
import { HttpHeaders } from '@angular/common/http';
import { UserProfile } from '../components/perfil-prestador/perfil-prestador.component';
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
  userProfile: UserProfile | undefined;
  isLargeScreen: boolean = true;

  constructor(private modalCtrl: ModalController,
    private prestadorService: PrestadorService,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router,
    private alertController: AlertController,) { }

  async ngOnInit() {
    this.getPrestadores();
    this.perfilA();
  }

  perfilA() {
    this.authService.getPerfilPrestador().subscribe(
      (response: any) => {
        //console.log('Perfil del prestador:', response);
        this.userProfile = response.user_profile;
      },
      (error) => {
        console.error('Error al obtener el perfil del prestador:', error);
      }
    );
  }

  getPrestadores(): void {
  this.prestadorService.getPrestadoresF().subscribe(
    (response: PrestadoresResponse) => {
      this.prestadores = response.prestadores;
      //console.log('Prestadores:', this.prestadores);
    },
    (error) => {
      console.error('Error al obtener los prestadores:', error);
    }
  );
}

  logout() {
    const token = this.authService.getToken();
    if (token !== null) {
      const bearerToken = `Bearer ${token}`;
      const csrfToken = localStorage.getItem('csrf_token') || '';
      const headers = new HttpHeaders({
        'Authorization': bearerToken,
        'X-CSRF-TOKEN': csrfToken
      });
      this.authService.logout().subscribe(
        () => {
          console.log('Usuario deslogueado con éxito');
          localStorage.removeItem(this.authService.tokenKey);
          this.router.navigateByUrl('menu/tabs/tab1', { replaceUrl: true });
          this.showToast();
        },
        (error) => {
          console.error('Error al desloguear el usuario:', error);
        }
      );
    } else {
      console.error('No se encontró un token de autenticación en el almacenamiento local');
      this.router.navigateByUrl('login', { replaceUrl: true });
    }
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

  async contactar(componenteModal: string) {
    const alert = await this.alertController.create({
      header: 'Acepta las políticas de privacidad',
      message: 'Al hacer clic en "Aceptar", confirmas que has leído y aceptas nuestras políticas de privacidad.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Ver políticas',
          handler: () => {
            this.verPoliticas();
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.abrirModal(componenteModal);
          }
        }
      ]
    });

    await alert.present();
  }

  async verPoliticas() {
    const modal = await this.modalCtrl.create({
      component: PoliticasComponent,
      mode: 'ios'
    });

    await modal.present();
  }

  async abrirModal(componenteModal: string) {
    let componentcon;
    switch (componenteModal) {
      case 'componente-modal-1':
        componentcon = ContactarComponentComponent;
        break;
      default:
        console.error('Modal no reconocido');
        return;
    }

    const modal = await this.modalCtrl.create({
      component: componentcon,
      mode: 'ios',
      backdropDismiss: false
    });

    await modal.present();
  }
}
