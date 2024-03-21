import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NewPrestadorComponent } from './new-prestador/new-prestador.component';
import { PerfilPrestadorComponent } from './perfil-prestador/perfil-prestador.component';
import { ContactarComponentComponent } from './contactar-component/contactar-component.component';
import { PoliticasComponent } from './politicas/politicas.component';
import { NewServicioComponent } from './new-servicio/new-servicio.component';
import { NewCursoComponent } from './new-curso/new-curso.component';
import { NewCertificacionComponent } from './new-certificacion/new-certificacion.component';
import { NewZonaComponent } from './new-zona/new-zona.component';

@NgModule({
  declarations: [
    NewPrestadorComponent,
    NewServicioComponent,
    NewCursoComponent,
    NewCertificacionComponent,
    NewZonaComponent,
    PerfilPrestadorComponent,
    ContactarComponentComponent,
    PoliticasComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    NewPrestadorComponent,
    NewServicioComponent,
    NewCursoComponent,
    NewCertificacionComponent,
    NewZonaComponent,
    PerfilPrestadorComponent,
    ContactarComponentComponent,
    PoliticasComponent
  ]
})
export class ComponentsModule { }
