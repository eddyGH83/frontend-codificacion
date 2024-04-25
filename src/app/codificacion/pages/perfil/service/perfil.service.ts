import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';




@Injectable({
    providedIn: 'root'
})
export class PerfilService {


    private _apiUrl: string = environment.base_url;


    constructor(private http: HttpClient) { }


    // Mostrar Datos Usuario
    mostrarDatosUsuario(usuario: any): Observable<any> {
        const url = `${this._apiUrl}/usuarios/mostrarDatosUsuario`;
        return this.http.post<any>(url, usuario);
    }


    // Actualizar Nro Celular
    actualizaNroCelular(usuario: any): Observable<any> {
        const url = `${this._apiUrl}/usuarios/actualizaNroCelular`;
        return this.http.post<any>(url, usuario);
    }


    // Modificar Pass
    modificarPass(usuario: any): Observable<any> {
        const url = `${this._apiUrl}/usuarios/modificarPass`;
        return this.http.post<any>(url, usuario);
    }


}
