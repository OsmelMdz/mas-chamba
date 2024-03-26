import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavController, ToastController } from '@ionic/angular';
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
    private toastController: ToastController,
    private visitanteService: VisitanteService,
    private navCtrl: NavController,
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
      localStorage.setItem('auth_token', newVisitante.token);
      this.visitanteService.getNewProduct.emit(newVisitante);
      this.visitanteFrom.reset();
      await this.modalCtrl.dismiss();
      this.navCtrl.navigateRoot('menu');
      this.showSuccessToast('Políticas aceptadas correctamente.');
    } catch (error) {
      console.error('Error al aceptar las políticas:', error);
      this.showErrorToast('Error al aceptar las políticas, intenta de nuevo');
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
