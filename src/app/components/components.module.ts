import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NewPrestadorComponent } from './new-prestador/new-prestador.component';
import { PerfilPrestadorComponent } from './perfil-prestador/perfil-prestador.component';

@NgModule({
  declarations: [
    NewPrestadorComponent,
    PerfilPrestadorComponent
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
    PerfilPrestadorComponent
  ]
})
export class ComponentsModule { }
