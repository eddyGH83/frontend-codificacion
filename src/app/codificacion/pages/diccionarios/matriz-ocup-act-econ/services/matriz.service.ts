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

    /*  getCustomersMedium() {
        return this.http.get<any>('assets/customers-medium.json')
            .toPromise()
            .then(res => <Customer[]>res.data)
            .then(data => { return data; });
    } */

    // 
    devuelveMatriz(): Observable<any> {
        const url = `${this._apiUrl}devuelveMatriz`;
        return this.http.get<any>(url);
    }


}