import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Prestador, PrestadoresResponse, PrestadorService } from 'src/app/services/prestador.service';
import { Servicio, ServicioService } from 'src/app/services/servicio.service';
import { Curso, CursoService } from 'src/app/services/curso.service';
import { Certificacion, CertificacionService } from 'src/app/services/certificacion.service';
import { Zona, ZonaService } from 'src/app/services/zona.service';
import { NewVisitanteComponent } from '../new-visitante/new-visitante.component';

@Component({
  selector: 'app-contactar-component',
  templateUrl: './contactar-component.component.html',
  styleUrls: ['./contactar-component.component.scss'],
})
export class ContactarComponentComponent implements OnInit {
  @Input() id!: number;
  prestador!: Prestador;
  servicios: Servicio[] = [];
  cursos: Curso[] = [];
  certificaciones: Certificacion[] = [];
  zonas: Zona[] = [];

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private authService: AuthService,
    private servicioService: ServicioService,
    private cursoService: CursoService,
    private certificacionService: CertificacionService,
    private zonaService: ZonaService,
    private prestadorService: PrestadorService,
    public alertController: AlertController,
    private toastController: ToastController) { }

  async close() {
    await this.modalCtrl.dismiss();
  }

  async aceptarPoliticas(){
    const modal = await this.modalCtrl.create({
      component: NewVisitanteComponent,
      mode: 'ios'
    });
    await modal.present();
  }


  ngOnInit() {
    if (this.id) {
      if (this.isAuth()) {
        this.getPrestador(this.id);
        this.getServicios();
        this.getCursos();
        this.getCertificacion();
        this.getZona();
      } else {
        this.router.navigate(['/politicas-privacidad']);
      }
    } else {
      console.error('El ID del prestador no está definido.');
    }
  }

  getZonaNameById(zonaId: number): string {
    const zona = this.zonas.find(z => z.id === zonaId);
    return zona ? zona.nombre : 'Zona no encontrada'; // Manejo de caso en que la zona no se encuentra
  }

  //mostrar a los prestadores por id
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

  getServicios(): void {
    this.servicioService.getServicios().subscribe(
      (servicios: Servicio[]) => {
        this.servicios = servicios;
      },
      (error) => {
        console.error('Error al obtener los servicios:', error);
        this.showErrorToast('Error al cargar los servicios. Por favor, inténtalo de nuevo más tarde.');
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


  llamar(telefono: string) {
    window.open(`tel:${telefono}`, '_self');
  }

  contactarPorWhatsApp(telefono: string) {
    const whatsappNumber = '52' + telefono;
    const message = encodeURIComponent('Buenos días, necesito de sus servicios.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  }


  isAuth(): boolean {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }

  volverAtras() {
    this.router.navigateByUrl('menu/tabs/tab1', { replaceUrl: true });
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

