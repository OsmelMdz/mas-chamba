import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ZonaService, Zona } from 'src/app/services/zona.service';

@Component({
  selector: 'app-update-zona',
  templateUrl: './update-zona.component.html',
  styleUrls: ['./update-zona.component.scss'],
})
export class UpdateZonaComponent implements OnInit {
  nuevoNombreZona!: string;
  @Input() nombreZonaExistente!: string;
  zonaId!: number;

  constructor(
    private zonaService: ZonaService,
    private toastController: ToastController,
    private router: Router,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.log('Hola');
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

  updateZona(): void {
    if (!this.nombreZonaExistente) {
      this.showErrorToast('Por favor, ingresa un nuevo nombre de zona');
      return;
    }

    const updatedZonaData = {
      nombre: this.nombreZonaExistente,
      estatus: 'Activo'
    };

    this.zonaService.updateZona(this.zonaId, updatedZonaData).subscribe(
      async (response) => {
        console.log('Zona actualizada:', response);
        await this.modalCtrl.dismiss();
        this.showSuccessToast('Zona actualizada con éxito');
        this.router.navigateByUrl('menu/tabs/tab1', { replaceUrl: true });
      },
      (error) => {
        console.error('Error al actualizar la zona:', error);
        this.showErrorToast('Error al actualizar la zona');
      }
    );
  }

  async showSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    toast.present();
  }

  async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }

}
