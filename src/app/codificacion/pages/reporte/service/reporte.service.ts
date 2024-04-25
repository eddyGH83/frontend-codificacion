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


  //  Reporte 1
  reporte1(busqueda: any): any {
    const url = `${this._apiUrl}reporte1`;
    return this.http.post<any>(url, busqueda);
  }

  //  Reporte 2
  reporte2(busqueda: any): any {
    const url = `${this._apiUrl}reporte2`;
    return this.http.post<any>(url, busqueda);
  }

  //  Reporte 3
  reporte3(busqueda: any): any {
    const url = `${this._apiUrl}reporte3`;
    return this.http.post<any>(url, busqueda);
  }

  //  Reporte 4
  reporte4(busqueda: any): any {
    const url = `${this._apiUrl}reporte4`;
    return this.http.post<any>(url, busqueda);
  }

  //  Reporte 5
  reporte5(busqueda: any): any {
    const url = `${this._apiUrl}reporte5`;
    return this.http.post<any>(url, busqueda);
  }

  //  Reporte 6
  reporte6(busqueda: any): any {
    const url = `${this._apiUrl}reporte6`;
    return this.http.post<any>(url, busqueda);
  }

  //  Reporte 7
  reporte7(busqueda: any): any {
    const url = `${this._apiUrl}reporte7`;
    return this.http.post<any>(url, busqueda);
  }

  //  Reporte 8
  reporte8(busqueda: any): any {
    const url = `${this._apiUrl}reporte8`;
    return this.http.post<any>(url, busqueda);
  }

  //  Reporte 9
  reporte9(busqueda: any): any {
    const url = `${this._apiUrl}reporte9`;
    return this.http.post<any>(url, busqueda);
  }

  //  Reporte 10
  reporte10(busqueda: any): any {
    const url = `${this._apiUrl}reporte10`;
    return this.http.post<any>(url, busqueda);
  }

  //  Reporte 11
  reporte11(busqueda: any): any {
    const url = `${this._apiUrl}reporte11`;
    return this.http.post<any>(url, busqueda);
  }


}
