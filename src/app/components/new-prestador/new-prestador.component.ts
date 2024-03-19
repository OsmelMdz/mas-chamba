import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PrestadorService } from 'src/app/services/prestador.service';

interface Prestador {
  id: number;
  user_id: number;
  nombre: string;
  a_paterno: string;
  a_materno: string;
  fecha_nacimiento: string;
  imagen: string;
  sexo: string;
  telefono: string;
  identificacion_personal: string;
  comprobante_domicilio: string;
  tipo_cuenta: string;
  estatus: string;
}

interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  prestador_id: number;
}

interface Certificacion {
  id: number;
  nombre: string;
  descripcion: string;
  prestador_id: number;
}

interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  prestador_id: number;
}

interface Zona {
  id: number;
  nombre: string;
  prestador_id: number;
}


@Component({
  selector: 'app-new-prestador',
  templateUrl: './new-prestador.component.html',
  styleUrls: ['./new-prestador.component.scss'],
})
export class NewPrestadorComponent implements OnInit {
  formPrestador!: FormGroup;
  imagen: string | undefined;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private prestadorService: PrestadorService,
    private authService: AuthService
  ) { }

  async close() {
    await this.modalCtrl.dismiss();
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    const dateControl = this.fb.control(new Date());
    this.formPrestador = this.fb.group({
      nombre: ['', Validators.required],
      a_paterno: ['', Validators.required],
      a_materno: ['', Validators.required],
      fecha_nacimiento: dateControl,
      telefono: [''],
      sexo: [''],
      imagen: [''],
      identificacion_personal: [''],
      comprobante_domicilio: [''],
      tipo_cuenta: [''],
      estatus: ['Activo']
    });
  }

  onImagenChange($event: { target: { files: FileList; }; }): void {
    const fileList: FileList = $event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      this.formPrestador.get('imagen')?.setValue(file);
      this.generarURL(file);
    }
  }

  generarURL(image: any) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      this.imagen = reader.result as string;
    };
  }

  postPrestadores(): void {
    /* const prestadorToCreate: Prestador = this.formPrestador.value;
    this.prestadorService.postPrestadores(prestadorToCreate).subscribe(
      (response) => {
        console.log('Prestador creado:', response);
        this.close();
      },
      (error) => {
        console.error('Error al crear el prestador:', error);
        // Manejar el error adecuadamente
      }
    ); */
  }

  submit() {
    this.postPrestadores();
  }

}
