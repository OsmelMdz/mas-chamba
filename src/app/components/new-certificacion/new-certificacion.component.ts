import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-certificacion',
  templateUrl: './new-certificacion.component.html',
  styleUrls: ['./new-certificacion.component.scss'],
})
export class NewCertificacionComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    console.log('NewServicioComponent');
  }

  async close() {
    await this.modalCtrl.dismiss();
  }
}
