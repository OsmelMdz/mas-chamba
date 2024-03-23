import { Component, OnInit, Input } from '@angular/core';
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
  @Input() id!: number;
  prestador!: Prestador;


  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private authService: AuthService,
    private prestadorService: PrestadorService,
    public alertController: AlertController) { }

  async close() {
    await this.modalCtrl.dismiss();
  }


  ngOnInit() {
    if (this.id) {
      if (this.isAuth()) {
        this.getPrestador(this.id);
      } else {
        this.router.navigate(['/politicas-privacidad']);
      }
    } else {
      console.error('El ID del prestador no está definido.');
    }
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

