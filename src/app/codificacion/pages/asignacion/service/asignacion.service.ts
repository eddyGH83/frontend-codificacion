import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AsignacionService {


  private _apiUrl: string = environment.base_url;

  constructor(private http: HttpClient) { }

  // devuelve lista de codificadores
  devuelveCodificadores(body: object): Observable<any> {
    return this.http.post(`${this._apiUrl}/diccionarios/devuelveCodificadores`, body)
  }

  // Listar codificadores 
  codificadores(id: any): Observable<any> {      
    return this.http.get(`${this._apiUrl}/codificacion/codificadores/${id}`)
  }


}
