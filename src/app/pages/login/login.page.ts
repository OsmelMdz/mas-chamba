/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

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
    private navCtrl: NavController,
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
  login() {
    this.sesion.login(this.credentials.value).subscribe((data: any) => {
      console.log('Data: ', data);
      if (data.status == 401) {
        console.log('Usuario no autorizado');
        this.showErrorToast('Usuario no autorizado');
      } else {
        localStorage.setItem('Token', data.token);
        console.log('Bienvenido');
        this.credentials.reset();
        this.showSuccessToast('Bienvenido a Mas Chamba');
        this.router.navigateByUrl('menu', { replaceUrl: true });
      }
    });
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
