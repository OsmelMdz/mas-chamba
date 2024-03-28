import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { PrestadorService } from 'src/app/services/prestador.service';
import { Zona } from 'src/app/services/zona.service';
import { ZonaService } from '../../services/zona.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-prestador',
  templateUrl: './update-prestador.component.html',
  styleUrls: ['./update-prestador.component.scss'],
})
export class UpdatePrestadorComponent implements OnInit {
  imgProduct = '.../../../../../assets/add.png';
  // Arreglo de archivos
  @Input() currentFile?: any[] = [];
  nuevoNombrePrestador!: string;
  @Input() NombreExistente!: string;
  nuevoAPaternoPrestador!: string;
  @Input() APaternoExistente!: string;
  nuevoAMaternoPrestador!: string;
  @Input() AMaternoExistente!: string;
  nuevoFechaNacimientoPrestador!: Date;
  @Input() FechaNacimientoExistente!: Date;
  nuevoImagenPrestador!: string;
  @Input() ImagenExistente!: string;
  nuevoSexoPrestador!: string;
  @Input() SexoExistente!: string;
  nuevoTelefonoPrestador!: string;
  @Input() TelefonoExistente!: string;
  nuevoIdentificacionPrestador!: string;
  @Input() IdentificacionExistente!: string;
  nuevoComprobantePrestador!: string;
  @Input() ComprobanteExistente!: string;
  nuevoTipoCuentaPrestador!: string;
  @Input() TipoCuentaExistente!: string;
  nuevoOficioPrestador!: string;
  @Input() OficioExistente!: string;
  nuevoEstatusPrestador!: string;
  @Input() EstatusExistente!: string;
  nuevoZonaIdPrestador!: number;
  @Input() ZonaIdExistente!: number;
  formPrestador!: FormGroup; 
  prestadorId!: number;
  zonas: Zona[] = [];

  constructor(
    private prestadorService: PrestadorService,
    private toastController: ToastController,
    private router: Router,
    private modalCtrl: ModalController,
    private zonaService: ZonaService,
    private compressImg: NgxImageCompressService,
    private formBuilder: FormBuilder, // Inyección de FormBuilder
  ) { }


  /* descargarArchivo(nombreArchivo: string): void {
    console.log(nombreArchivo);
    this.prestradorService.descargarArchivo(nombreArchivo).subscribe(
      (blob: Blob) => {
        console.log('Blob:', blob); // Muestra los datos en la consola
        // Crea un objeto URL para el blob y lo utiliza para abrir una nueva ventana o pestaña
        const url = window.URL.createObjectURL(blob);
        console.log(url);
        window.open(url, '_blank');
        window.URL.revokeObjectURL(url); // Libera recursos
      },
      (error) => {
        console.error('Error al descargar el archivo:', error);
        // Maneja el error según sea necesario
      }
    );
  }  */

  onFileChange(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.readFile(file, (result: any) => {
        this.formPrestador.get(field)?.setValue(result);
      });
    }
  }

  readFile(file: File, callback: (result: string | ArrayBuffer | null) => void) {
    const reader = new FileReader();
    reader.onload = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  }



  async ngOnInit() {
    this.formPrestador = this.formBuilder.group({
      nuevoImagenPrestador: ['']
    });
    this.formPrestador.get('nuevoImagenPrestador')?.setValue(this.ImagenExistente);
    this.getZona();
  }

  getZona(): void {
    this.zonaService.getZonas().subscribe(
      (response: Zona[]) => {
        this.zonas = response;
      },
      (error) => {
        console.error('Error al obtener las zonas:', error);
      }
    );
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

  updatePrestador(): void {
    if (!this.NombreExistente) {
      this.showErrorToast('Por favor, ingresa un nuevo nombre de prestador');
      return;
    }

    const updatedPrestadorData = {
      nombre: this.NombreExistente,
      a_paterno: this.APaternoExistente,
      a_materno: this.AMaternoExistente,
      fecha_nacimiento: this.FechaNacimientoExistente,
      telefono: this.TelefonoExistente,
      sexo: this.SexoExistente,
      oficio: this.OficioExistente,
      estatus: this.EstatusExistente,
      tipo_cuenta: this.TipoCuentaExistente,
      zona_id: this.ZonaIdExistente,
    };

    this.prestadorService.updatePrestador(this.prestadorId, updatedPrestadorData).subscribe(
      async (response) => {
        console.log('Prestador actualizado:', response);
        await this.modalCtrl.dismiss();
        this.showSuccessToast('Prestador actualizado con éxito');
      },
      (error) => {
        console.error('Error al actualizar el prestador:', error);
        this.showErrorToast('Error al actualizar el prestador');
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
