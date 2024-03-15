import { Component, OnInit } from '@angular/core';
import { ServicioService, ServiciosResponse } from '../services/servicio.service';
import { AuthService } from '../services/auth.service';

interface Servicio{
  id: number;
  nombre: string;
  descripcion: string;
  imagen:string;
  prestador_id: number;
}
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  servicios: Servicio[] = [];
  isLargeScreen: boolean = true;

  constructor(private servicioService: ServicioService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getServicios();
  }

  getServicios(): void {
    this.servicioService.getServicios().subscribe(
      (response: ServiciosResponse) => {
        this.servicios = response.data;
        console.log(this.servicios);
      },
      (error) => {
        console.error('Error al obtener los servicios:', error);
      }
    );
  }

}
