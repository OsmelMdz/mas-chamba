import { Component, OnInit } from '@angular/core';
import { PrestadorService, Prestador, PrestadoresResponse } from '../services/prestador.service';
import { AuthService } from '../services/auth.service';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PerfilPrestadorComponent } from '../components/perfil-prestador/perfil-prestador.component';
import { ContactarComponentComponent } from '../components/contactar-component/contactar-component.component';
import { PoliticasComponent } from '../components/politicas/politicas.component';
import { HttpHeaders } from '@angular/common/http';
import { UserProfile } from '../components/perfil-prestador/perfil-prestador.component';
import { Zona, ZonaService } from 'src/app/services/zona.service';
import { Visitante, VisitanteService } from '../services/visitante.service';
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

  componentsC = [
    {
      title: 'Contactar',
      buttonText: 'Abrir Componente',
      calculatorModal: 'componente-modal-1'
    }
  ]

  prestadores: Prestador[] = [];
  userProfile: UserProfile | undefined;
  isLargeScreen: boolean = true;
  prestador: Prestador | undefined;
  filteredPrestadores: any[] = [];
  searchPerformed: boolean = false;
  searchTerm: string = '';
  zonas: Zona[] = [];
  visitante: Visitante[] = [];

  constructor(private modalCtrl: ModalController,
    private prestadorService: PrestadorService,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router,
    private alertController: AlertController,
    private popoverController: PopoverController,
    private zonaService: ZonaService,
    private visitanteService: VisitanteService) { }

  async ngOnInit() {
    this.getPrestadores();
    this.perfilA();
    this.getZona();
  }

  getImagenPorSexo(sexo: string, oficio: string): string {
    if (sexo.toLowerCase() === 'Hombre') {
      if (oficio.toLowerCase() === 'Electricista') {
        return '../../assets/electricista.png';
      } else if (oficio.toLowerCase() === 'Plomero') {
        return '../../assets/plomero.png';
      } else {
        return '../../assets/hombre.png';
      }
    } else if (sexo.toLowerCase() === 'Mujer') {
      if (oficio.toLowerCase() === 'Electricista') {
        return '../../assets/electricistaM.png';
      } else if (oficio.toLowerCase() === 'Plomera') {
        return '../../assets/plomeroM.png';
      } else {
        return '../../assets/thumbnail.svg';
      }
    } else {
      return '../../assets/thumbnail.svg';
    }
  }

  getZonaNameById(zonaId: number): string {
    const zona = this.zonas.find(z => z.id === zonaId);
    return zona ? zona.nombre : 'Zona no encontrada';
  }


  getZona(): void {
    this.zonaService.getZonas().subscribe(
      (response: Zona[]) => {
        this.zonas = response;
      },
      (error) => {
        console.error('Error al obtener las zonas:', error);
      }
    );
  }

  async closePopover() {
    await this.popoverController.dismiss();
  }

  //*Si esta logueado*/
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn() && (this.userProfile?.role_id === 1 || this.userProfile?.role_id === 2 || this.userProfile?.role_id === 3);
  }
  
  isLoggedAd(): boolean {
    return this.authService.isLoggedIn() && (this.userProfile?.role_id === 1 || this.userProfile?.role_id === 2);
  }

  //*Obtener el perfil*/
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

  //*Te redirecciona al modal perfil*/
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

  //*Obtener el perfil del prestador por filtros*/
  getPrestadores(): void {
    this.prestadorService.getPrestadoresF().subscribe(
      (response: PrestadoresResponse) => {
        this.prestadores = response.prestadores;
      },
      (error) => {
        console.error('Error al obtener los prestadores:', error);
      }
    );
  }

  //*Obtener el perfil del prestador por id*/
  getPrestador(id: number): void {
    this.prestadorService.getPrestador(id).subscribe(
      (response) => {
        this.prestador = response;
      },
      (error) => {
        console.error('Error al obtener el prestador:', error);
      }
    );
  }

  //**Eliminar el perfil del prestador por id */
  deletePrestador(id: number): void {
    this.prestadorService.deletePrestador(id).subscribe(
      () => {
        this.getPrestadores();
        this.showSuccessToast('Prestador eliminado con éxito');
      },
      (error) => {
        console.error('Error al eliminar el prestador:', error);
        this.showErrorToast('Error al eliminar el prestador');
      }
    );
  }

  //*Te redirecciona a ver el perfil del prestador por id*/
  async abrirModal(componenteModal: string, idPrestador: number) {
    if (idPrestador) {
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
        componentProps: {
          id: idPrestador,
        },
        mode: 'ios',
        backdropDismiss: false
      });
      await modal.present();
    } else {
      console.error('El ID del prestador no está definido.');
    }
  }

  //*Cerrar sesión */
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
          localStorage.removeItem(this.authService.tokenKey);
          this.router.navigateByUrl('menu/tabs/tab1', { replaceUrl: true });
          this.showSuccessToast('¡Has cerrado sesión con éxito!');
        },
        (error) => {
          console.error('Error al desloguear el usuario:', error);
          this.showErrorToast('Error al cerrar sesión');
        }
      );
    } else {
      this.showErrorToast('Error al cerrar sesión, No se encontró un token de autenticación');
      this.router.navigateByUrl('login', { replaceUrl: true });
    }
  }


  //*Alerta de aceptar politicas*/

  async contactar(componenteModal: string, idPrestador: number) {
    const accessToken = localStorage.getItem('auth_token');
    if (accessToken) {
      const politicasAceptadas = await this.visitanteService.obtenerEstadoPoliticas();
      if (politicasAceptadas) {
        this.abrirModal(componenteModal, idPrestador);
        console.log('Las políticas han sido aceptadas');
      } else {
        await this.mostrarAlertaPoliticas(componenteModal, idPrestador);
      }
    } else {
      await this.mostrarAlertaPoliticas(componenteModal, idPrestador);
    }
  }

  async mostrarAlertaPoliticas(componenteModal: string, idPrestador: number) {
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
            this.abrirModal(componenteModal, idPrestador);
          }
        }
      ]
    });
    await alert.present();
  }

  //*Te redirecciona para ver las Politicas */
  async verPoliticas() {
    const modal = await this.modalCtrl.create({
      component: PoliticasComponent,
      mode: 'ios'
    });
    await modal.present();
  }

  //*Alerta Success*/
  async showSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    toast.present();
  }

  //*Alerta Danger*/
  async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }

  //** Buscar */
  searchPrestador(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm !== '') {
      this.filteredPrestadores = this.prestadores.filter(prestador =>
        prestador.oficio.toLowerCase().includes(searchTerm) ||
        this.getZonaNameById(prestador.zona_id).toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredPrestadores = this.prestadores.slice();
    }
    this.searchPerformed = true;
    if (this.filteredPrestadores.length > 0) {
      this.showSuccess('Estos son los prestadores de servicio que se encuentra por la zona');
    } else {
      this.showError('No se encontraron perfiles que coincidan con la búsqueda.');
    }
    if (searchTerm === '') {
      this.filteredPrestadores = this.prestadores.slice();
    }
  }

  //*Alerta Success*/
  async showSuccess(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    toast.present();
  }

  //*Alerta Danger*/
  async showError(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    toast.present();
  }

}
