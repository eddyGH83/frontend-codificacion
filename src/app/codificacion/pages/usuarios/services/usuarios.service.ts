import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  private _apiUrl: string = environment.base_url;

  constructor(private http: HttpClient) { }


  devuelveUsuarios(body: object): Observable<any> {
    return this.http.post(`${this._apiUrl}/usuarios/devuelveUsuarios`, body)
  }

  validarUsuario(body: object): Observable<any> {
    return this.http.post(`${this._apiUrl}/usuarios/validarUsuario`, body)
  }

  registraUsuario(body: object): Observable<any> {
    return this.http.post(`${this._apiUrl}/usuarios/registraUsuario`, body)
  }


  
  devuelveSupervisores(): Observable<any> {
    return this.http.get(`${this._apiUrl}/usuarios/devuelveSupervisores`)
  }

  


  resetPassUsuario(id: any): Observable<any> {
    return this.http.get(`${this._apiUrl}/usuarios/resetPassUsuario/${id}`)
  }
  deleteUsuario(body: any): Observable<any> {
    return this.http.post(`${this._apiUrl}/usuarios/deleteUsuario`, body)
  }
  



}