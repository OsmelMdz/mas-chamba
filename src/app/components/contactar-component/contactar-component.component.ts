import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../perfil-prestador/perfil-prestador.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Prestador, PrestadoresResponse, PrestadorService } from 'src/app/services/prestador.service';

@Component({
  selector: 'app-contactar-component',
  templateUrl: './contactar-component.component.html',
  styleUrls: ['./contactar-component.component.scss'],
})
export class ContactarComponentComponent implements OnInit {
  userProfile: UserProfile | undefined;
  prestadores: Prestador[] = [];
  constructor(private modalCtrl: ModalController, private router: Router, private authService: AuthService,
    private prestadorService: PrestadorService,public alertController: AlertController) { }

  async close() {
    await this.modalCtrl.dismiss();
  }

  ngOnInit() {
    this.getPrestadores();
    this.perfil();
    if (!this.isAuth()) {
      // Si el usuario no está autenticado, redirige a la página de políticas de privacidad
      this.router.navigate(['/politicas-privacidad']);
    }
  }

  getPrestadores(): void {
    this.prestadorService.getPrestadoresF()
      .subscribe(
        (response: any) => {
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

  perfil() {
    this.authService.getPerfilPrestador().subscribe(
      (response: any) => {
        console.log('Perfil del prestador:', response);
        this.userProfile = response.user_profile;
      },
      (error) => {
        console.error('Error al obtener el perfil del prestador:', error);
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

}

