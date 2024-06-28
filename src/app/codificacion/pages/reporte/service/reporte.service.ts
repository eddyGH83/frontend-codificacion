import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private _apiUrl: string = environment.base_url;

  constructor(private http: HttpClient) { }

  //  Reporte 0 : Nro de cuestionarios por departamento
  reporte0(body: object): Observable<any> {
    return this.http.post(`${this._apiUrl}/reportes/reporte13`, body)
  }




  //  Reporte 1
  reporte1(): Observable<any> {
    return this.http.get(`${this._apiUrl}/reportes/reporte1`)
  }

  //  Reporte 2
  reporte2(): Observable<any> {
    return this.http.get(`${this._apiUrl}/reportes/reporte2`)
  }

  //  Reporte 3
  reporte3(): Observable<any> {
    return this.http.get(`${this._apiUrl}/reportes/reporte3`)
  }

  //  Reporte 4
  reporte4(): Observable<any> {
    return this.http.get(`${this._apiUrl}/reportes/reporte4`)
  }

  //  Reporte 5
  reporte5(): Observable<any> {
    return this.http.get(`${this._apiUrl}/reportes/reporte5`)
  }

  //  Reporte 6
  reporte6(): Observable<any> {
    return this.http.get(`${this._apiUrl}/reportes/reporte6`)
  }

  //  Reporte 7
  reporte7(): Observable<any> {
    return this.http.get(`${this._apiUrl}/reportes/reporte7`)
  }

  //  Reporte 8
  reporte8(): Observable<any> {
    return this.http.get(`${this._apiUrl}/reportes/reporte8`)
  }

  //  Reporte 9
  reporte9(): Observable<any> {
    return this.http.get(`${this._apiUrl}/reportes/reporte9`)
  }

  //  Reporte 10
  reporte10(): Observable<any> {
    return this.http.get(`${this._apiUrl}/reportes/reporte10`)
  }

  //  Reporte 11
  reporte11(): Observable<any> {
    return this.http.get(`${this._apiUrl}/reportes/reporte11`)
  }

  //  Reporte 12
  reporte12(): Observable<any> {
    return this.http.get(`${this._apiUrl}/reportes/reporte12`)
  }

}
