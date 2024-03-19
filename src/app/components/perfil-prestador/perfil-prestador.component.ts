import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

export { user_profile };

interface user_profile {
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
  email: string
}

@Component({
  selector: 'app-perfil-prestador',
  templateUrl: './perfil-prestador.component.html',
  styleUrls: ['./perfil-prestador.component.scss'],
})
export class PerfilPrestadorComponent implements OnInit {
  userProfile: user_profile | undefined;

  constructor(private modalCtrl: ModalController, private router: Router, private authService: AuthService,) { }
  async close() {
    await this.modalCtrl.dismiss();
  }
  ngOnInit() {
    this.perfil();
  }

  perfil() {
    this.authService.perfil().subscribe(
      (response: any) => {
        console.log('Perfil:', response);
        this.userProfile = {
          user: {
            id: response.id,
            nombre: response.nombre,
            a_paterno: response.a_paterno,
            a_materno: response.a_materno,
            sexo: response.sexo,
            fecha_nacimiento: response.fecha_nacimiento,
            telefono: response.telefono,
            tipo_cuenta: response.tipo_cuenta,
            estatus: response.estatus,
            identificacion_personal: response.identificacion_personal,
            comprobante_domicilio: response.comprobante_domicilio,
            imagen: response.imagen,
            user_id: response.user_id
          },
          email: response.email
        };
        this.router.navigateByUrl('prefil', { replaceUrl: true });
      },
      (error) => {
        console.error('Error al obtener el perfil:', error);
      }
    );
  }
}
