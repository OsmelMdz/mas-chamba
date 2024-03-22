import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { CertificacionService } from '../../services/certificacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-certificacion',
  templateUrl: './new-certificacion.component.html',
  styleUrls: ['./new-certificacion.component.scss'],
})
export class NewCertificacionComponent implements OnInit {
  certificacionForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private modalCtrl: ModalController,
    private certificacionService: CertificacionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    console.log('NewServicioComponent');
    this.initializeForm();
  }


  async close() {
    await this.modalCtrl.dismiss();
  }

  initializeForm() {
    this.certificacionForm = this.formBuilder.group({
      imagen: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      estatus: ['Habilitado']
    });
  }

  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length) {
      this.selectedFile = fileInput.files[0];
    }
  }

  async submit() {
    const formData = new FormData();
    formData.append('nombre', this.certificacionForm.get('nombre')?.value);
    formData.append('descripcion', this.certificacionForm.get('descripcion')?.value);
    formData.append('estatus', this.certificacionForm.get('estatus')?.value);
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile);
    }

    try {
      const newCertificacion = await this.certificacionService.newCertificacion(formData).toPromise();
      this.certificacionService.getNewProduct.emit(newCertificacion);
      this.certificacionForm.reset();
      await this.modalCtrl.dismiss();
      this.showSuccessToast('Servicio creado con exito');
      this.router.navigateByUrl('menu/tabs/tab2', { replaceUrl: true });
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
