import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { PrestadorService } from 'src/app/services/prestador.service';
import { Zona } from 'src/app/services/zona.service';
import { ZonaService } from '../../services/zona.service';
@Component({
  selector: 'app-new-prestador',
  templateUrl: './new-prestador.component.html',
  styleUrls: ['./new-prestador.component.scss'],
})
export class NewPrestadorComponent implements OnInit {
  formPrestador!: FormGroup;
  zonas: Zona[] = [];

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private prestadorService: PrestadorService,
    private toastController: ToastController,
    private zonaService: ZonaService
  ) { }

  getZona(): void {
    this.zonaService.getZonas().subscribe(
      (response: Zona[]) => {
        this.zonas = response;
      },
      (error) => {
        console.error('Error al obtener las zonas:', error);
      }
    );
  }

  ngOnInit() {
    this.initializeForm();
    this.getZona();
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
      oficio: ['',Validators.required],
      nombre: ['', Validators.required],
      a_paterno: ['', Validators.required],
      a_materno: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      telefono: ['',Validators.required],
      sexo: ['',Validators.required],
      imagen: [null, Validators.required],
      identificacion_personal: [null, Validators.required],
      comprobante_domicilio: [null, Validators.required],
      tipo_cuenta: ['',Validators.required],
      estatus: ['Activo'],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      zona_id: [0]
    });
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

  postPrestadores(): void {
    if (this.formPrestador.valid) {
      const formData = new FormData();
      Object.entries(this.formPrestador.value).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (key === 'imagen' || key === 'identificacion_personal' || key === 'comprobante_domicilio') {
            if (value instanceof File) {
              formData.append(key, value, value.name);
            } else {
              console.warn(`El valor para '${key}' no es un archivo.`);
            }
          } else {
            if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
              formData.append(key, value.toString());
            } else {
              console.warn(`El valor para '${key}' no es una cadena, un número ni un booleano.`);
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
