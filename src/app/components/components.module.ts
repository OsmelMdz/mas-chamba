import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NewPrestadorComponent } from './new-prestador/new-prestador.component';
import { PerfilPrestadorComponent } from './perfil-prestador/perfil-prestador.component';
import { ContactarComponentComponent } from './contactar-component/contactar-component.component';
import { PoliticasComponent } from './politicas/politicas.component';

@NgModule({
  declarations: [
    NewPrestadorComponent,
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
    PerfilPrestadorComponent,
    ContactarComponentComponent,
    PoliticasComponent
  ]
})
export class ComponentsModule { }
