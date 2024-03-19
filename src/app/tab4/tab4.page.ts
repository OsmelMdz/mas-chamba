import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private authService: AuthService, private toastController: ToastController, private router: Router) {}

  ngOnInit() {
    console.log('No robes datos');
  }

  login() {
    this.router.navigateByUrl('login', { replaceUrl: true });
  }
}
