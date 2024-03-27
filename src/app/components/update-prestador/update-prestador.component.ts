import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { PrestadorService } from 'src/app/services/prestador.service';
import { Zona } from 'src/app/services/zona.service';
import { ZonaService } from '../../services/zona.service';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-update-prestador',
  templateUrl: './update-prestador.component.html',
  styleUrls: ['./update-prestador.component.scss'],
})
export class UpdatePrestadorComponent  implements OnInit {
  imgProduct = '.../../../../../assets/add.png';
  currentFile?: any[] = [];
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
  nuevoOficioPrestador!:string;
  @Input() OficioExistente!: string;
  nuevoEstatusPrestador!: string;
  @Input() EstatusExistente!: string;
  nuevoZonaIdPrestador!: number;
  @Input() ZonaIdExistente!: number;

  prestadorId!: number;
  zonas: Zona[] = [];

  constructor(
    private prestadorService: PrestadorService,
    private toastController: ToastController,
    private router: Router,
    private modalCtrl: ModalController,
    private zonaService: ZonaService,
    private compressImg: NgxImageCompressService
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

  imageProduct(ev: any) {
    console.log(ev);
    this.compressImg.uploadFile().then(({ image, orientation }) => {
      this.generarURL(image);
      const blob = this.dataURItoBlob(image);
      this.currentFile![0] = blob;
    })
  }

  generarURL(image: any) { //solo genera la url para poder mostrarla
    const byteString = atob(image.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: '' });
    // Crear la URL de la imagen
    const imageUrl = URL.createObjectURL(blob);
    console.log(imageUrl);
    // Utilizar la URL de la imagen
    this.imgProduct = imageUrl;
    document.getElementById("imgProd")?.setAttribute(
      'src', imageUrl);
    //this.formGroup.get('image').patchValue(imageUrl)
  }

  dataURItoBlob(dataURI: any) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString })
  }



  async ngOnInit() {
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
      sexo:this.SexoExistente,
      oficio:this.OficioExistente,
      estatus: this.EstatusExistente,
      tipo_cuenta:this.TipoCuentaExistente,
      zona_id: this.ZonaIdExistente,
    };

    this.prestadorService.updatePrestador(this.prestadorId, updatedPrestadorData).subscribe(
      async (response) => {
        console.log('Prestador actualizado:', response);
        await this.modalCtrl.dismiss();
        this.showSuccessToast('Prestador actualizado con éxito');
        this.router.navigateByUrl('menu/tabs/tab1', { replaceUrl: true });
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
