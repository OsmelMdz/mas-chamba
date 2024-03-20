import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

export { UserProfile }
interface UserProfile {
  user: {
    id: number;
    nombre: string;
    a_paterno: string;
    a_materno: string;
    sexo: string;
    fecha_nacimiento: string;
    telefono: string;
    tipo_cuenta: string;
    estatus: string;
    identificacion_personal: string;
    comprobante_domicilio: string;
    imagen: string;
    user_id: number;
  };
  email: string;
  password: string;
  role_id: number;
}
@Component({
  selector: 'app-perfil-prestador',
  templateUrl: './perfil-prestador.component.html',
  styleUrls: ['./perfil-prestador.component.scss'],
})

export class PerfilPrestadorComponent implements OnInit {
  userProfile: UserProfile | undefined;

  constructor(private modalCtrl: ModalController, private router: Router, private authService: AuthService,) { }

  async close() {
    await this.modalCtrl.dismiss();
  }

  ngOnInit() {
    this.perfil();
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

  verPolitica() {
    this.router.navigateByUrl('/politica');
  }
}
