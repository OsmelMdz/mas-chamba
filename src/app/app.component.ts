import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Products', url: 'products', icon: 'fast-food' },
    { title: 'Carrito', url: 'carrito', icon: 'cart' },
    { title: 'Favoritos', url: 'favorito', icon: 'heart' },
    { title: 'New Products', url: 'newproducts', icon: 'bag-add' },
    { title: 'Categorias', url: 'categoria', icon: 'pricetags' },
    { title: 'New categoria', url: 'new-categoria', icon: 'pricetag' },
  ];
  //{ title: 'Registro', url: 'new-user', icon: 'person-add' }
  //{ title: 'Home', url: 'folder/:id', icon: 'home' },
  public labels = [''];
  constructor(private http: HttpClient) {
    http.get('http://localhost:8000/api/v1/prestadores').subscribe(console.log);
  }
}

