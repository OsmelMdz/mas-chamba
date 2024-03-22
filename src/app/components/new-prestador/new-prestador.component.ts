import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { PrestadorService } from 'src/app/services/prestador.service';

@Component({
  selector: 'app-new-prestador',
  templateUrl: './new-prestador.component.html',
  styleUrls: ['./new-prestador.component.scss'],
})
export class NewPrestadorComponent implements OnInit {
  formPrestador!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private prestadorService: PrestadorService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  onFileChange(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const formControl = this.formPrestador.get(field);
      if (formControl) {
        formControl.setValue(file);
      }
    }
  }

  initializeForm() {
    this.formPrestador = this.fb.group({
      nombre: ['', Validators.required],
      a_paterno: ['', Validators.required],
      a_materno: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      telefono: [''],
      sexo: [''],
      imagen: [null, Validators.required],
      identificacion_personal: [null, Validators.required],
      comprobante_domicilio: [null, Validators.required],
      tipo_cuenta: [''],
      estatus: ['Activo'],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

  postPrestadores(): void {
    if (this.formPrestador.valid) {
      const formData = new FormData();
      Object.entries(this.formPrestador.value).forEach(([key, value]) => {
        if (value) {
          if (key === 'imagen' || key === 'identificacion_personal' || key === 'comprobante_domicilio') {
            if (value instanceof File) {
              formData.append(key, value, value.name);
            } else {
              console.warn(`El valor para '${key}' no es un archivo.`);
            }
          } else {
            if (typeof value === 'string') {
              formData.append(key, value);
            } else {
              console.warn(`El valor para '${key}' no es una cadena.`);
            }
          }
        }
      });

      this.prestadorService.newPrestador(formData).subscribe(
        (response) => {
          console.log(response);
          this.showSuccessToast('Prestador agregado exitosamente');
          this.close();
        },
        (error) => {
          console.log(error);
          this.showErrorToast('Error al agregar prestador');
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  submit() {
    this.postPrestadores();
  }

  async showSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    toast.present();
  }

  async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }
}
