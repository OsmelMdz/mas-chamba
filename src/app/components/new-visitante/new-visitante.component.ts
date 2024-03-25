import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { VisitanteService } from '../../services/visitante.service';

@Component({
  selector: 'app-new-visitante',
  templateUrl: './new-visitante.component.html',
  styleUrls: ['./new-visitante.component.scss'],
})
export class NewVisitanteComponent  implements OnInit {
  visitanteFrom!: FormGroup;
  tokenKey = 'auth_token';
  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController,
    private visitanteService: VisitanteService
  ) { }

  ngOnInit() {
    console.log('Hola');
    this.initializeForm();
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

  initializeForm() {
    this.visitanteFrom = this.formBuilder.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      politicas: ['', Validators.required],
      estatus: ['Activo']
    });
  }

  async submit() {
    try {
      const newVisitante = await this.visitanteService.newVisitante(this.visitanteFrom.value).toPromise();
      // Guardar el token en el localStorage
      localStorage.setItem('auth_token', newVisitante.token);
      this.visitanteService.getNewProduct.emit(newVisitante);
      this.visitanteFrom.reset();
      this.router.navigate(['/tabs/tab1']);
      this.showSuccessToast('Visitante creado correctamente.');
    } catch (error) {
      console.error('Error al crear el visitante:', error);
      this.showErrorToast('Error al crear el visitante.');
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
