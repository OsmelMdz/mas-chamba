import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Importa FormBuilder y Validators si estás utilizando formularios reactivos
import { CursoService } from 'src/app/services/curso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-curso',
  templateUrl: './new-curso.component.html',
  styleUrls: ['./new-curso.component.scss'],
})
export class NewCursoComponent  implements OnInit {
  cursoForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private modalCtrl: ModalController,
    private cursoService: CursoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    console.log('NewServicioComponent');
    this.initializeForm();
  }
  initializeForm() {
    this.cursoForm = this.formBuilder.group({
      imagen: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      estatus: ['Habilitado'],
      tipo:['',Validators.required]
    });
  }

  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length) {
      this.selectedFile = fileInput.files[0];
    }
  }

  async submit() {
    const formData = new FormData();
    formData.append('nombre', this.cursoForm.get('nombre')?.value);
    formData.append('descripcion', this.cursoForm.get('descripcion')?.value);
    formData.append('estatus', this.cursoForm.get('estatus')?.value);
    formData.append('tipo', this.cursoForm.get('tipo')?.value);
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile);
    }

    try {
      const tipoValue = this.cursoForm.get('tipo')?.value;
      if (tipoValue !== 'Plomeria' && tipoValue !== 'Electricidad') {
        this.showErrorToast('Por favor selecciona un tipo válido: "Plomeria" o "Electricidad".');
        return;
      }

      const newCurso = await this.cursoService.newCurso(formData).toPromise();
      this.cursoService.getNewProduct.emit(newCurso);
      this.cursoForm.reset();
      await this.modalCtrl.dismiss();
      this.showSuccessToast('Curso creado con exito');
      this.router.navigateByUrl('menu/tabs/tab2', { replaceUrl: true });
    } catch (error) {
      const err = error as { status: number };
      console.error('Error al crear el servicio:', err);
      if (err.status === 401) {
        this.showErrorToast('Usuario no autorizado o contraseña incorrecta');
      } else {
        this.showErrorToast('Error de autenticación');
      }
    }
  }

  async showSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    toast.present();
  }

  async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

}
