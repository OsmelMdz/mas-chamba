import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-zona',
  templateUrl: './new-zona.component.html',
  styleUrls: ['./new-zona.component.scss'],
})
export class NewZonaComponent  implements OnInit {

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
