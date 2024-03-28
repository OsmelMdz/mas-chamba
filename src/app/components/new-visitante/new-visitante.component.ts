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
export class NewVisitanteComponent implements OnInit {
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
    this.initializeForm();
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

  initializeForm() {
    this.visitanteFrom = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      politicas: ['', [Validators.required, Validators.pattern(/Aceptado/)]],
      estatus: ['Activo']
    });
  }

  validarNombre(event: any) {
    let inputValue: string = event.target.value;
    inputValue = inputValue.replace(/^\s+/g, '');
    inputValue = inputValue.replace(/[^a-zA-Z\s]+/g, '');
    event.target.value = inputValue;
  }

  validarTelefono(event: any) {
    let inputValue: string = event.target.value;
    inputValue = inputValue.replace(/\D/g, '');
    event.target.value = inputValue;
  }

  async submit() {
    let politicasControl = this.visitanteFrom.get('politicas');
    if (politicasControl && politicasControl.value !== 'Aceptado') {
      this.showErrorToast('Debes aceptar las políticas de privacidad.');
      return;
    }

    try {
      let nombreControl = this.visitanteFrom.get('nombre');
      let telefonoControl = this.visitanteFrom.get('telefono');

      if (nombreControl && telefonoControl) {
        const nombre = nombreControl.value.toUpperCase();
        const telefono = telefonoControl.value;

        const newVisitante = await this.visitanteService.newVisitante({
          nombre: nombre,
          telefono: telefono,
          politicas: 'Aceptado',
          estatus: 'Activo'
        }).toPromise();

        localStorage.setItem('auth_token', newVisitante.token);
        this.visitanteService.getNewProduct.emit(newVisitante);
        this.visitanteFrom.reset();
        await this.modalCtrl.dismiss();
        this.navCtrl.navigateRoot('menu');
        this.showSuccessToast('Políticas aceptadas correctamente.');
      }
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
