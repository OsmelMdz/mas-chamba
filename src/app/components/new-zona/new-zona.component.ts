import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Importa FormBuilder y Validators si estás utilizando formularios reactivos
import { ZonaService } from 'src/app/services/zona.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-zona',
  templateUrl: './new-zona.component.html',
  styleUrls: ['./new-zona.component.scss'],
})
export class NewZonaComponent  implements OnInit {
  zonaForm!: FormGroup;
  constructor(
    private modalCtrl: ModalController,
    private zonaService: ZonaService,
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
    this.zonaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      estatus: ['Inactivo']
    });
  }


  async submit() {
    const formData = new FormData();
    formData.append('nombre', this.zonaForm.get('nombre')?.value);
    formData.append('estatus', this.zonaForm.get('estatus')?.value);

    try {
      const newZona = await this.zonaService.newZona(formData).toPromise();
      this.zonaService.getNewProduct.emit(newZona);
      this.zonaForm.reset();
      await this.modalCtrl.dismiss();
      this.showSuccessToast('Zona creado con exito');
      this.router.navigateByUrl('menu/tabs/tab2', { replaceUrl: true });
    } catch (error) {
      const err = error as { status: number };
      console.error('Error al crear la zona:', err);
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
