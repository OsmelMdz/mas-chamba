import { Component, OnInit } from '@angular/core';
import { ServicioService, Servicio } from '../services/servicio.service';
import { Curso, CursoService, CursosResponse } from '../services/curso.service';
import { Certificacion, CertificacionesResponse, CertificacionService } from '../services/certificacion.service';
import { ZonaService, Zona, ZonasResponse } from '../services/zona.service';
import { AuthService } from '../services/auth.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserProfile } from '../components/perfil-prestador/perfil-prestador.component';
import { UpdateZonaComponent } from '../components/update-zona/update-zona.component';
import { UpdateServicioComponent } from '../components/update-servicio/update-servicio.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  servicios: Servicio[] = [];
  cursos: Curso[] = [];
  certificaciones: Certificacion[] = [];
  zonas: Zona[] = [];
  isLargeScreen: boolean = true;
  userProfile: UserProfile | undefined;

  constructor(
    private servicioService: ServicioService,
    private cursoService: CursoService,
    private certificacionService: CertificacionService,
    private zonaService: ZonaService,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit(): void {
    this.getServicios();
    this.getCursos();
    this.getCertificacion();
    this.getZona();
    this.perfilA();
  }

  perfilA() {
    this.authService.getPerfilPrestador().subscribe(
      (response: any) => {
        if (response && response.user_profile) {
          this.userProfile = response.user_profile;
          //console.log('Perfil del prestador:', this.userProfile);
        } else {
          console.error('Perfil del prestador no encontrado en la respuesta:', response);
        }
      },
      (error) => {
        console.error('Error al obtener el perfil del prestador:', error);
      }
    );
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn() && (this.userProfile?.role_id === 1 || this.userProfile?.role_id === 2);
  }

  isAdministradorG(): boolean {
    return this.authService.isLoggedIn() && this.userProfile?.role_id === 1;
  }

  getServicios(): void {
    this.servicioService.getServicios().subscribe(
      (servicios: Servicio[]) => {
        this.servicios = servicios;
        //console.log('Servicios:', this.servicios);
      },
      (error) => {
        console.error('Error al obtener los servicios:', error);
        this.showErrorToast('Error al cargar los servicios. Por favor, inténtalo de nuevo más tarde.');
      }
    );
  }

  //eliminar servicio por id
  deleteServicio(id: number): void {
    this.servicioService.deleteServicio(id).subscribe(
      (response) => {
        this.servicios = this.servicios.filter((servicio) => servicio.id !== id);
        //console.log('Servicio eliminado:', response);
        this.showSuccessToast('Servicio eliminado con éxito');
      },
      (error) => {
        //console.error('Error al eliminar el servicio:', error);
        this.showErrorToast('Error al eliminar el servicio');
      }
    );
  }

  async openUpdateFormS(servicioId: number, nombreServicio: string, descripcionServicio: string) {
    const modal = await this.modalController.create({
      component: UpdateServicioComponent,
      componentProps: {
        servicioId: servicioId,
        nombreServicioExistente: nombreServicio,
        descripcionServicioExistente: descripcionServicio,
      }
    });
    return await modal.present();
  }

  updateServicioEstatus(id: number, estatus: string): void {
    this.servicioService.updateServicioEstatus(id, { estatus }).subscribe(
      (response) => {
        //console.log('Servicio actualizado:', response);
        this.showSuccessToast('Estatus del servicio actualizado con éxito');
      },
      (error) => {
        //console.error('Error al actualizar el estatus del servicio:', error);
        this.showErrorToast('Error al actualizar el estatus del servicio');
      }
    );
  }

  getCursos(): void {
    this.cursoService.getCursos().subscribe(
      (response: Curso[]) => {
        this.cursos = response;
        //console.log('Cursos:', this.cursos);
      },
      (error) => {
        console.error('Error al obtener los cursos:', error);
      }
    );
  }

  getCertificacion(): void {
    this.certificacionService.getCertificaciones().subscribe(
      (response: Certificacion[]) => {
        this.certificaciones = response;
        //console.log('Certificaciones:', this.certificaciones);
      },
      (error) => {
        console.error('Error al obtener las certificaciones:', error);
      }
    );
  }

  getZona(): void {
    this.zonaService.getZonas().subscribe(
      (response: Zona[]) => {
        this.zonas = response;
        //console.log('Zonas:', this.zonas);
      },
      (error) => {
        console.error('Error al obtener las zonas:', error);
      }
    );
  }

  //eliminar zona por id
  deleteZona(id: number): void {
    this.zonaService.deleteZona(id).subscribe(
      (response) => {
        this.zonas = this.zonas.filter((zona) => zona.id !== id);
        //console.log('Zona eliminada:', response);
        this.showSuccessToast('Zona eliminada con éxito');
      },
      (error) => {
        //console.error('Error al eliminar la zona:', error);
        this.showErrorToast('Error al eliminar la zona');
      }
    );
  }

  updateZonaEstatus(id: number, estatus: string): void {
    this.zonaService.updateZonaEstatus(id, { estatus }).subscribe(
      (response) => {
        //console.log('Zona actualizada:', response);
        this.showSuccessToast('Estatus de la zona actualizado con éxito');
      },
      (error) => {
        //console.error('Error al actualizar el estatus de la zona:', error);
        this.showErrorToast('Error al actualizar el estatus de la zona');
      }
    );
  }

  //actualizar zona por id y datos
  async openUpdateForm(zonaId: number, nombreZona: string) {
    const modal = await this.modalController.create({
      component: UpdateZonaComponent,
      componentProps: {
        zonaId: zonaId,
        nombreZonaExistente: nombreZona
      }
    });
    return await modal.present();
  }

  logout() {
    localStorage.removeItem(this.authService.tokenKey);
    //console.log('Cerrando sesión');
    this.authService.logout();
    this.router.navigateByUrl('menu/tabs/tab1', { replaceUrl: true });
    this.showSuccessToast('¡Has cerrado sesión con éxito!');
  }

  async showSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    toast.present();
  }

  async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }

}
