import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-visitante',
  templateUrl: './new-visitante.component.html',
  styleUrls: ['./new-visitante.component.scss'],
})
export class NewVisitanteComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('Hola');
  }

}
