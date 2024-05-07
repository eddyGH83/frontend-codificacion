import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

//import { Customer } from '../catalogos';


export interface Registro {
    id_catalogo?: number;
    catalogo?: string;
    codigo?: string;
    descripcion?: string;
    estado?: string;
    usucre?: string;
    feccre?: string;
    usumod?: string;
    fecmod?: string;
    descripcion_unida?: string;
    unico?: number;
}

@Injectable({
    providedIn: 'root'
})

export class MatrizService {

    private _apiUrl: string = environment.base_url;

    constructor(private http: HttpClient) { }


    devuelveMatriz(): Observable<any> {
        const url = `${this._apiUrl}/diccionarios/devuelveMatriz`;
        return this.http.get<any>(url);
    }


    /* validarMatriz(body: object): Observable<any> {
        return this.http.post(`${this._apiUrl}/diccionarios/validarMatriz`, body)
    } */


    insertarMatriz(body: object): Observable<any> {
        console.log(body)
        return this.http.post(`${this._apiUrl}/diccionarios/insertarMatriz`, body)
    }


    updateMatriz(id: any, body: object): Observable<any> {
        return this.http.put(`${this._apiUrl}/diccionarios/updateMatriz/${id}`, body)
    }


    updateEstadoMatriz(id: any, body: object): Observable<any> {
        return this.http.put(`${this._apiUrl}/diccionarios/updateEstadoMatriz/${id}`, body)
    }

}