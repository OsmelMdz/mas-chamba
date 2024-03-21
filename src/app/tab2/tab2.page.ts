import { Component, OnInit } from '@angular/core';
import { ServicioService, Servicio ,ServiciosResponse } from '../services/servicio.service';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserProfile } from '../components/perfil-prestador/perfil-prestador.component';
import { Curso, CursoService, CursosResponse } from '../services/curso.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  servicios: Servicio[] = [];
  cursos: Curso[] = [];
  isLargeScreen: boolean = true;
  userProfile: UserProfile | undefined;
  constructor(
    private servicioService: ServicioService,
    private cursoService: CursoService,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router) { }

  ngOnInit(): void {
    console.log('No robes datos');
    this.getServicios();
    this.getCursos();
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

  getCursos(): void {
    this.cursoService.getCursos().subscribe(
      (response: Curso[]) => {
        this.cursos = response;
        console.log('Cursos:', this.cursos);
      },
      (error) => {
        console.error('Error al obtener los cursos:', error);
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
    return this.authService.isLoggedIn() && (this.userProfile?.role_id === 1 || this.userProfile?.role_id === 2);
  }

  isAdministradorG(): boolean {
    return this.authService.isLoggedIn() && this.userProfile?.role_id === 1;
  }

}
