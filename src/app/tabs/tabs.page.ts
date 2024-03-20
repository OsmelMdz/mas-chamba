import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserProfile } from '../components/perfil-prestador/perfil-prestador.component';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  userProfile: UserProfile | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.perfil();
  }

  perfil() {
    this.authService.getPerfilPrestador().subscribe(
      (response: any) => {
        this.userProfile = response.user_profile;
      },
      (error) => {
        console.error('Error al obtener el perfil del prestador:', error);
      }
    );
  }

  /* isLoggedIn(): boolean {
    return this.authService.isLoggedIn() && this.userProfile?.user.tipo_cuenta === null;
  } */

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn() && this.userProfile?.user.tipo_cuenta === null && (this.userProfile?.role_id === 1 || this.userProfile?.role_id === 2);
  }



}
