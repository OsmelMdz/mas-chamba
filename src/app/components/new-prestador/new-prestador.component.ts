import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { NgxImageCompressService } from 'ngx-image-compress';
import { AuthService } from 'src/app/services/auth.service';
import { PrestadorService } from 'src/app/services/prestador.service';

import { AbstractControl } from '@angular/forms';
/*
function fileTypeValidator(allowedTypes: string[]): (control: AbstractControl) => { [key: string]: any } | null {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const file = control.value;
    if (!file || !file.name) {
      return null;
    }

    const extension = file.name.split('.')[1].toLowerCase();
    const isAllowedType = allowedTypes.includes(extension);

    return isAllowedType ? null : { 'invalidFileType': { value: control.value } };
  };
}

function fileSizeValidator(maxSize: number): (control: AbstractControl) => { [key: string]: any } | null {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const file = control.value;
    if (!file) {
      return null;
    }

    const size = file.size;
    const isAllowedSize = size <= maxSize;

    return isAllowedSize ? null : { 'invalidFileSize': { value: control.value } };
  };
} */
interface Prestador {
  id: number;
  user_id: number;
  nombre: string;
  a_paterno: string;
  a_materno: string;
  fecha_nacimiento: Date;
  imagen: string;
  sexo: string;
  telefono: string;
  identificacion_personal: string;
  comprobante_domicilio: string;
  tipo_cuenta: string;
  estatus: string;
}

/* interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  prestador_id: number;
}

interface Certificacion {
  id: number;
  nombre: string;
  descripcion: string;
  prestador_id: number;
}

interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  prestador_id: number;
}

interface Zona {
  id: number;
  nombre: string;
  prestador_id: number;
} */


@Component({
  selector: 'app-new-prestador',
  templateUrl: './new-prestador.component.html',
  styleUrls: ['./new-prestador.component.scss'],
})
export class NewPrestadorComponent implements OnInit {
  formPrestador!: FormGroup;
  imagen: string | undefined;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private prestadorService: PrestadorService,
    private authService: AuthService,
    private compressImg: NgxImageCompressService,
    private nParams: NavParams
  ) {
    this.formPrestador = this.fb.group({
      nombre: ['', Validators.required],
      a_paterno: ['', Validators.required],
      a_materno: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      telefono: [''],
      sexo: [''],
      imagen: [null, [Validators.required]],
      identificacion_personal: [null, [Validators.required]],
      comprobante_domicilio: [null, [Validators.required]],
      tipo_cuenta: [''],
      estatus: ['Activo'],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    const dateControl = this.fb.control(new Date());
    this.formPrestador = this.fb.group({
      nombre: ['', Validators.required],
      a_paterno: ['', Validators.required],
      a_materno: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      telefono: [''],
      sexo: [''],
      imagen: [null, [Validators.required]],
      identificacion_personal: [null, [Validators.required]],
      comprobante_domicilio: [null, [Validators.required]],
      tipo_cuenta: [''],
      estatus: ['Activo'],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  postPrestadores(): void {
    this.prestadorService.postPrestador(this.formPrestador.value).subscribe(
      (response) => {
        console.log(response);
        this.close();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  submit() {
    this.postPrestadores();
  }
}


