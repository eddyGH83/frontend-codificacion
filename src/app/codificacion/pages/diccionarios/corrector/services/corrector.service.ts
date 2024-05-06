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

export class CorrectorService {

    private _apiUrl: string = environment.base_url;

    constructor(private http: HttpClient) { }

    /*     getCustomersMedium() {
            return this.http.get<any>('assets/customers-medium.json')
                .toPromise()
                .then(res => <Customer[]>res.data)
                .then(data => { return data; });
        } */

    /* 
    devuelveCatalogo(body: object): Observable<any> {
    //console.log(`${this._apiUrl}/diccionarios/devuelveCatalogo`);
    return this.http.post(`${this._apiUrl}/diccionarios/devuelveCatalogo`, body)
    }
    */

    // 
    devuelveCorrector(): Observable<any> {
        const url = `${this._apiUrl}/diccionarios/devuelveCorrector`;
        return this.http.get<any>(url);
    }


    updateEstadoDiccCorr(id: any, body: object): Observable<any> {
        return this.http.put(`${this._apiUrl}/diccionarios/updateEstadoDiccCorr/${id}`, body)
    }


}