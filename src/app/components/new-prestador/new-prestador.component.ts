import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PrestadorService } from 'src/app/services/prestador.service';

@Component({
  selector: 'app-new-prestador',
  templateUrl: './new-prestador.component.html',
  styleUrls: ['./new-prestador.component.scss'],
})
export class NewPrestadorComponent implements OnInit {
  formPrestador!: FormGroup; // No inicializamos aquí, lo haremos en el constructor

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private prestadorService: PrestadorService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.formPrestador = this.fb.group({
      nombre: ['', Validators.required],
      a_paterno: ['', Validators.required],
      a_materno: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      telefono: [''],
      sexo: [''],
      imagen: [null, Validators.required], // No necesitas un array para un solo validador
      identificacion_personal: [null, Validators.required],
      comprobante_domicilio: [null, Validators.required],
      tipo_cuenta: [''],
      estatus: ['Activo'],
      email: ['', [Validators.required, Validators.email]], // Agregamos un validador de correo electrónico
      password: ['', Validators.required]
    });
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

  postPrestadores(): void {
    if (this.formPrestador.valid) {
      const formValue = this.formPrestador.value;
      const formData = new FormData();
      formData.append('nombre', formValue.nombre);
      formData.append('a_paterno', formValue.a_paterno);
      formData.append('a_materno', formValue.a_materno);
      formData.append('fecha_nacimiento', formValue.fecha_nacimiento);
      formData.append('telefono', formValue.telefono);
      formData.append('sexo', formValue.sexo);
      formData.append('tipo_cuenta', formValue.tipo_cuenta);
      formData.append('estatus', formValue.estatus);
      formData.append('email', formValue.email);
      formData.append('password', formValue.password);
      formData.append('imagen', formValue.imagen);
      formData.append('identificacion_personal', formValue.identificacion_personal);
      formData.append('comprobante_domicilio', formValue.comprobante_domicilio);
      this.prestadorService.postPrestador(formData).subscribe(
        (response) => {
          console.log(response);
          this.close();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }


  submit() {
    this.postPrestadores();
  }
}
