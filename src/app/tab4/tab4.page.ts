import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PoliticasComponent } from '../components/politicas/politicas.component';
import { NewPrestadorComponent } from '../components/new-prestador/new-prestador.component';
import { UserProfile } from '../components/perfil-prestador/perfil-prestador.component';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  userProfile: UserProfile | undefined;
  componentsFormulario = [
    {
      title: 'Formulario',
      buttonText: 'Abrir Componente',
      calculatorModal: 'componente-modal-1'
    }
  ]

  constructor(private modalCtrl: ModalController,private authService: AuthService, private toastController: ToastController, private router: Router) {}

  ngOnInit() {
    console.log('No robes datos');
  }

  login() {
    this.router.navigateByUrl('login', { replaceUrl: true });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn() && (this.userProfile?.role_id === 1 || this.userProfile?.role_id === 2 || this.userProfile?.role_id === 3 || this.userProfile?.role_id === null);
  }

  logout() {
    localStorage.removeItem(this.authService.tokenKey);
    this.authService.logout().subscribe(
      () => {
        //console.log('Usuario deslogueado con éxito');
        this.router.navigateByUrl('menu/tabs/tab1', { replaceUrl: true });
        this.showToast();
      },
      (error) => {
        console.error('Error al desloguear el usuario:', error);
      }
    );
  }

  async showToast() {
    const message = '¡Has cerrado sesión con éxito!';
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async verPoliticas() {
    const modal = await this.modalCtrl.create({
      component: PoliticasComponent,
      mode: 'ios'
    });

    await modal.present();
  }

  contactarPorWhatsApp() {
    const whatsappNumber = '52'+ '9511175007';
    const message = encodeURIComponent('Hola, necesito más información de como incribirme a Más Chamba.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  }

  async openComponentes(componenteModal: string) {
    let componentFormulario;
    switch (componenteModal) {
      case 'componente-modal-1':
        componentFormulario = NewPrestadorComponent;
        break;
      default:
        console.error('Modal no reconocido');
        return;
    }

    const modal = await this.modalCtrl.create({
      component: componentFormulario,
      mode: 'ios',
      backdropDismiss: false,
    });

    await modal.present();
  }
}
