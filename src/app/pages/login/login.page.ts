/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

export interface User{
  id: number;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastController: ToastController,
    private sesion: AuthService,
    private router: Router) {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.credentials?.get('email');
  }

  get password() {
    return this.credentials?.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register(){
    this.router.navigateByUrl('menu/tabs/tab4', { replaceUrl: true });
  }

  login() {
    this.sesion.login(this.credentials.value).subscribe(
      (data: any) => {
        //console.log('Data: ', data);
        //console.log('Bienvenido');
        this.credentials.reset();
        this.showSuccessToast('Bienvenido a Mas Chamba');
        this.router.navigateByUrl('menu', { replaceUrl: true });
      },
      (error: any) => {
        console.log('Error: ', error);
        if (error.status === 401) {
          this.showErrorToast('Usuario no autorizado o contraseña incorrecta');
          //console.log('Usuario no autorizado');
        } else {
          this.showErrorToast('Error de autenticación');
        }
      }
    );
  }

  async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      icon: 'alert-circle-outline',
      color: 'danger'
    });
    await toast.present();
  }

  async showSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      icon: 'checkmark-circle-outline',
      color: 'success'
    });
    await toast.present();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
