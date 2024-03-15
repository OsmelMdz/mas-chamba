import { Component, OnInit } from '@angular/core';
import { PrestadorService, PrestadoresResponse } from '../services/prestador.service';
import { AuthService } from '../services/auth.service';

interface Prestador {
  id: number;
  nombre: string;
  a_paterno: string;
  a_materno: string;
  fecha_nacimiento: Date;
  telefono: string;
  sexo: string;
  imagen: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  prestadoresPremiun: Prestador[] = [];
  prestadoresNormal: Prestador[] = [];
  isLargeScreen: boolean = true;

  constructor(private prestadorService: PrestadorService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getPrestadoresPremiun();
    this.getPrestadoresNormal();
  }

  getPrestadoresPremiun(): void {
    this.prestadorService.getPrestadoresPremiun().subscribe(
      (response: PrestadoresResponse) => {
        this.prestadoresPremiun = response.data;
        console.log(this.prestadoresPremiun);
      },
      (error) => {
        console.error('Error al obtener los prestadores:', error);
      }
    );
  }

  getPrestadoresNormal(): void {
    this.prestadorService.getPrestadoresNormal().subscribe(
      (response: PrestadoresResponse) => {
        this.prestadoresNormal = response.data;
        console.log(this.prestadoresNormal);
      },
      (error) => {
        console.error('Error al obtener los prestadores:', error);
      }
    );
  }

  logout(){
    this.authService.logout();
  }
}
