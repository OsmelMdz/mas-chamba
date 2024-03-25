import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-update-servicio',
  templateUrl: './update-servicio.component.html',
  styleUrls: ['./update-servicio.component.scss'],
})
export class UpdateServicioComponent implements OnInit {
  imgProduct = './assets/add.png';
  @Input() servicioId!: number;
  @Input() servicioNombre!: string;
  @Input() servicioDescripcion!: string;
  @Input() servicioEstatus!: string;
  @Input() servicioImagen!: Blob;

  nuevoNombreServicio!: string;
  nuevaDescripcionServicio!: string;
  nuevoEstatusServicio!: string;
  nuevaImagenServicio!: File;

  constructor(
    private servicioServicio: ServicioService,
    private toastController: ToastController,
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    // Asignar los valores recibidos del servicio a las variables del componente
    this.nuevoNombreServicio = this.servicioNombre;
    this.nuevaDescripcionServicio = this.servicioDescripcion;
    this.nuevoEstatusServicio = this.servicioEstatus;

    // Mostrar la imagen existente
    this.generarURL(this.servicioImagen);
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

  // Método para manejar la selección de un archivo
  handleFileInput(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.nuevaImagenServicio = fileList[0]; // Asignamos el primer archivo seleccionado
    }
  }

  // Método para generar una URL de una imagen a partir de un Blob
  generarURL(image: Blob) {
    const imageUrl = URL.createObjectURL(image);
    console.log(imageUrl);
    // Mostrar la URL de la imagen
    this.imgProduct = imageUrl;
    document.getElementById("imgProd")?.setAttribute('src', imageUrl);
  }

  // Método para convertir una URI de datos a un Blob
  dataURItoBlob(dataURI: any) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  // Método para actualizar el servicio
  async updatedServicio() {
    // Verificar que se haya ingresado un nuevo nombre de servicio
    if (!this.nuevoNombreServicio) {
      this.showErrorToast('Por favor, ingresa un nuevo nombre de servicio');
      return;
    }

    // Construir el objeto de datos actualizados del servicio
    const updatedServicioData = {
      nombre: this.nuevoNombreServicio,
      descripcion: this.nuevaDescripcionServicio,
      estatus: this.nuevoEstatusServicio,
      imagen: this.nuevaImagenServicio
    };

    // Llamar al método de actualización del servicio
    try {
      const response = await this.servicioServicio.updateServicio(this.servicioId, updatedServicioData).toPromise();
      console.log('Servicio actualizado:', response);
      await this.modalCtrl.dismiss();
      this.showSuccessToast('Servicio actualizado con éxito');
      this.router.navigateByUrl('menu/tabs/tab1', { replaceUrl: true });
    } catch (error) {
      // Manejar cualquier error que ocurra durante la actualización del servicio
      console.error('Error al actualizar el servicio:', error);
      this.showErrorToast('Error al actualizar el servicio');
    }
  }

  // Métodos auxiliares para mostrar mensajes toast
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
