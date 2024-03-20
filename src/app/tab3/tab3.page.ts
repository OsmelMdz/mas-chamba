import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { NewPrestadorComponent } from '../components/new-prestador/new-prestador.component';
import { PerfilPrestadorComponent } from '../components/perfil-prestador/perfil-prestador.component';
import { Prestador } from '../services/prestador.service';

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
      title: 'Usuarios',
      buttonText: 'Abrir Componente',
      calculatorModal: 'componente-modal-2'
    },
    {
      title: 'Servicios',
      buttonText: 'Abrir Componente',
      calculatorModal: 'componente-modal-3'
    },
    {
      title: 'Certificaciones',
      buttonText: 'Abrir Componente',
      calculatorModal: 'componente-modal-4'
    },
    {
      title: 'Cursos',
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

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router) { }

  ngOnInit() {
    console.log('No robes datos');
  }

  logout() {
    localStorage.removeItem(this.authService.tokenKey);
    this.authService.logout().subscribe(
      () => {
        console.log('Usuario deslogueado con éxito');
        this.router.navigateByUrl('menu/tabs/tab1', { replaceUrl: true });
        this.showToast();
      },
      (error) => {
        console.error('Error al desloguear el usuario:', error);
      }
    );
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  async showToast() {
    const message = '¡Has cerrado sesión con éxito!';
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
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
        component = NewPrestadorComponent;
        break;
      case 'componente-modal-3':
        component = NewPrestadorComponent;
        break;
      case 'componente-modal-4':
        component = NewPrestadorComponent;
        break;
      case 'componente-modal-5':
        component = NewPrestadorComponent;
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
