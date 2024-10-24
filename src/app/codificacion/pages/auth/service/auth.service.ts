import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _apiUrl: string = environment.base_url;




  // Variable global para almacenar los datos del usuario logueado
  usuario_global: any;
  
  constructor(private http: HttpClient) { }

// Método para obtener datos del usuario loqueado
  get usuarioLogueado() {
    return { ...this.usuario_global };
  }

  // Método para establecer el valor de la variable global usuario_global
  set usuarioLogueado(usuario: any) {
    this.usuario_global = usuario;
  }




  // Menu
  devuelveMenu(usuario: any): Observable<any> {
    const url = `${this._apiUrl}/login/devuelveMenu`;
    return this.http.post<any>(url, usuario);
  }


  //
  iniciarSesion(user: object) {
    return this.http.post(`${this._apiUrl}/login/login`, user);
  }

}
