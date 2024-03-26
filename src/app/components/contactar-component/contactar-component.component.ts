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
  prestadores: Prestador[] = [];
  servicios: Servicio[] = [];
  cursos: Curso[] = [];
  certificaciones: Certificacion[] = [];
  zonas: Zona[] = [];
  serviciosValidados: Servicio[] = [];

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
    private toastController: ToastController
    ) { }

  async close() {
    await this.modalCtrl.dismiss();
  }

  async aceptarPoliticas() {
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
        console.log('Prestador:', this.prestador);
        this.getServicios(); // Llamar a getServicios() después de obtener el prestador
      },
      (error) => {
        console.error('Error al obtener el prestador:', error);
      }
    );
  }

  getServicios(): void {
    console.log('Oficio del prestador:', this.prestador ? this.prestador.oficio : 'No hay prestador definido');
    this.servicioService.getServicios().subscribe(
      (response: Servicio[]) => {
        if (this.prestador && this.prestador.oficio && response) {
          // Verificar el tipo de oficio del prestador y filtrar los servicios en consecuencia
          if (this.prestador.oficio === 'Electricista') {
            console.log('Electricista');
            this.serviciosValidados = response.filter(servicio => servicio.tipo === 'Electricidad');
          } else if (this.prestador.oficio === 'Plomero' || this.prestador.oficio === 'Plomera') {
            console.log('Plomero');
            this.serviciosValidados = response.filter(servicio => servicio.tipo === 'Plomeria');
          } else {
            // Si el tipo de oficio no coincide con ninguna opción conocida, mostrar un mensaje de advertencia
            console.warn('Tipo de oficio no reconocido:', this.prestador.oficio);
            this.serviciosValidados = [];
          }
        } else {
          // Si el prestador o los servicios no están definidos, devolver un arreglo vacío
          console.warn('El prestador o los servicios no están definidos.');
          this.serviciosValidados = [];
        }
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

