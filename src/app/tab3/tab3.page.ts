import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { NewPrestadorComponent } from '../components/new-prestador/new-prestador.component';
import { PerfilPrestadorComponent } from '../components/perfil-prestador/perfil-prestador.component';
import { Prestador } from '../services/prestador.service';
import { UserProfile } from '../components/perfil-prestador/perfil-prestador.component';
import { HttpHeaders } from '@angular/common/http';
import { NewCursoComponent } from '../components/new-curso/new-curso.component';
import { NewCertificacionComponent } from '../components/new-certificacion/new-certificacion.component';
import { NewServicioComponent } from '../components/new-servicio/new-servicio.component';
import { NewZonaComponent } from '../components/new-zona/new-zona.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  components = [
    {
      title: 'Prestadores de servicios',
      buttonText: 'Abrir Componente',
      calculatorModal: 'componente-modal-1'
    },
    {
      title: 'Cursos',
      buttonText: 'Abrir Componente',
      calculatorModal: 'componente-modal-2'
    },
    {
      title: 'Certificaciones',
      buttonText: 'Abrir Componente',
      calculatorModal: 'componente-modal-3'
    },
    {
      title: 'Servicios',
      buttonText: 'Abrir Componente',
      calculatorModal: 'componente-modal-4'
    },
    {
      title: 'Zonas',
      buttonText: 'Abrir Componente',
      calculatorModal: 'componente-modal-5'
    }
  ]

  componentsAdmin = [
    {
      title: 'Perfil',
      buttonText: 'Abrir Componente',
      calculatorModal: 'componente-modal-1'
    }
  ]

  prestadores: Prestador[] = [];
  userProfile: UserProfile | undefined;
  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router) { }

  ngOnInit() {
    console.log('No robes datos');
    this.perfilA();
  }

  perfilA() {
    this.authService.getPerfilPrestador().subscribe(
      (response: any) => {
        this.userProfile = response.user_profile;
      },
      (error) => {
        console.error('Error al obtener el perfil del prestador:', error);
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
    return this.authService.isLoggedIn() && (this.userProfile?.role_id === 1 || this.userProfile?.role_id === 2);
  }

  isAdministradorG(): boolean {
    return this.authService.isLoggedIn() && this.userProfile?.role_id === 1;
  }

  Prestadores() {
    this.router.navigateByUrl('prestadores', { replaceUrl: true });
  }

  async openComponentes(componenteModal: string) {
    let component;
    switch (componenteModal) {
      case 'componente-modal-1':
        component = NewPrestadorComponent;
        break;
      case 'componente-modal-2':
        component = NewCursoComponent;
        break;
      case 'componente-modal-3':
        component = NewCertificacionComponent;
        break;
      case 'componente-modal-4':
        component = NewServicioComponent;
        break;
      case 'componente-modal-5':
        component = NewZonaComponent;
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
