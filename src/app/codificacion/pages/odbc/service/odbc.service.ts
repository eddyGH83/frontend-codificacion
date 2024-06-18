import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OdbcService {

  private _apiUrl: string = environment.base_url;

  constructor(private http: HttpClient) { }

  /* 
    subirOdbc_npioc(formData: any, login: any){
      console.log(formData)
      return this.httpClient.post(`${base_url}/reportes/subirOdbc_npioc/${login}`, formData)
    }
  */

  subirOdbc_npioc(formData: any, login: any): Observable<any> {
    return this.http.post(`${this._apiUrl}/reportes/subirOdbc_npioc/${login}`, formData)
  }
  subirOdbc_migracion(formData: any, login: any): Observable<any> {
    return this.http.post(`${this._apiUrl}/reportes/subirOdbc_migracion/${login}`, formData)
  }
  subirOdbc(formData: any, login: any): Observable<any> {
    return this.http.post(`${this._apiUrl}/reportes/subirOdbc/${login}`, formData)
  }



  repOdbc_npioc(fechaInicial: any, fechaFinal: any): Observable<any> {
    return this.http.get(`${this._apiUrl}/reportes/repOdbc_npioc/${fechaInicial}/${fechaFinal}`)
  }
  repOdbc_migracion(fechaInicial: any, fechaFinal: any): Observable<any> {
    return this.http.get(`${this._apiUrl}/reportes/repOdbc_migracion/${fechaInicial}/${fechaFinal}`)
  }
  repOdbc(fechaInicial: any, fechaFinal: any): Observable<any> {
    return this.http.get(`${this._apiUrl}/reportes/repOdbc/${fechaInicial}/${fechaFinal}`)
  }




/*   repOdbc_npioc(fechaInicial: any, fechaFinal: any): Observable<any> {
    return this.httpClient.get(`${base_url}/reportes/repOdbc_npioc/${fechaInicial}/${fechaFinal}`)
  }
  
  repOdbc_migracion(fechaInicial: any, fechaFinal: any): Observable<any> {
    return this.httpClient.get(`${base_url}/reportes/repOdbc_migracion/${fechaInicial}/${fechaFinal}`)
  }

  repOdbc(fechaInicial: any, fechaFinal: any): Observable<any> {
    return this.httpClient.get(`${base_url}/reportes/repOdbc/${fechaInicial}/${fechaFinal}`)
  } */

}
