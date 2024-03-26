import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Importa FormBuilder y Validators si estás utilizando formularios reactivos
import { ServicioService } from 'src/app/services/servicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-servicio',
  templateUrl: './new-servicio.component.html',
  styleUrls: ['./new-servicio.component.scss'],
})
export class NewServicioComponent implements OnInit {
  servicioForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private modalCtrl: ModalController,
    private servicioService: ServicioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

  initializeForm() {
    this.servicioForm = this.formBuilder.group({
      imagen: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      estatus: ['Habilitado'],
      tipo:['',Validators.required]
    });
  }

  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length) {
      this.selectedFile = fileInput.files[0];
    }
  }

  async submit() {
    if (this.servicioForm.invalid) {
      this.showErrorToast('Por favor completa todos los campos requeridos.');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.servicioForm.get('nombre')?.value);
    formData.append('descripcion', this.servicioForm.get('descripcion')?.value);
    formData.append('estatus', this.servicioForm.get('estatus')?.value);
    formData.append('tipo', this.servicioForm.get('tipo')?.value);
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile);
    }

    try {
      const tipoValue = this.servicioForm.get('tipo')?.value;
      if (tipoValue !== 'Plomeria' && tipoValue !== 'Electricidad') {
        this.showErrorToast('Por favor selecciona un tipo válido: "Plomeria" o "Electricidad".');
        return;
      }

      const newServicio = await this.servicioService.newServicio(formData).toPromise();
      this.servicioService.getNewProduct.emit(newServicio);
      this.servicioForm.reset();
      await this.modalCtrl.dismiss();
      this.showSuccessToast('Servicio creado con éxito');
      this.router.navigateByUrl('menu', { replaceUrl: true });
    } catch (error) {
      const err = error as { status: number };
      console.error('Error al crear el servicio:', err);
      if (err.status === 401) {
        this.showErrorToast('Usuario no autorizado o contraseña incorrecta');
      } else {
        this.showErrorToast('Error de autenticación');
      }
    }
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
