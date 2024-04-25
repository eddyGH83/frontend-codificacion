import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _apiUrl: string = environment.base_url;


  constructor(private http: HttpClient) { }


  // Autenticacion de usuario
  /* autenticacion(usuario: any): Observable<any> {
    const url = `${this._apiUrl}autenticacion`;
    return this.http.post<any>(url, usuario);
  } */

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
