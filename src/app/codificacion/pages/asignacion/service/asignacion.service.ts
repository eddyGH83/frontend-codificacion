import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

  private _authVariables: any = {
    token: '',
    usuario: '',
    id: '',
    rol: '',
    nombre: '',
    apellido: '',
    email: '',
    departamento: ''
  };



  private _apiUrl: string = environment.base_url;

  constructor(private http: HttpClient) { }


  // Método para obtener el valor de la variable global
  get authVariables(): any {
    return this._authVariables;
  }

  // Método para asignar valor a la variable global, sera de tipo objeto
  set authVariables(value: any) {
    this._authVariables = value;
  }



  // devuelve lista de codificadores
  devuelveCodificadores(body: object): Observable<any> {
    return this.http.post(`${this._apiUrl}/diccionarios/devuelveCodificadores`, body)
  }




  // Listar codificadores 
  codificadores(id: any): Observable<any> {
    return this.http.get(`${this._apiUrl}/codificacion/codificadores/${id}`)
  }
  // Listar codificadores con carga para reasignar
  codificadoresConCarga(body: object): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/codificadoresConCarga`, body)
  }
  // Listar supervisores con carga para reasignar
  supervisoresConCarga(body: object): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/supervisoresConCarga`, body)
  }




  // Listar supervisores sin carga
  supervisoresSinCarga(id: any): Observable<any> {
    return this.http.get(`${this._apiUrl}/codificacion/supervisoresSinCarga/${id}`)
  }




  //
  preguntasPorDepartamentoCod(body: object): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/preguntasPorDepartamentoCod`, body)
  }
  // Lista la carga para AUTOMATICO_NORMALIZADO, AUTOMATICO_NORMDOBLE
  preguntasPorDepartamentoSup(body: object): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/preguntasPorDepartamentoSup`, body)
  }





  // Asignación de carga a codificadores
  updateAsignado(id: any, body: object[]): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/updateAsignado/${id}`, body)
  }
  // Reasignación de carga a codificadores
  updateReAsignado(id: any, body: object[]): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/updateReAsignado/${id}`, body)
  }




  // Asignación de carga a supervisores
  updateAsignadoSup(id: any, body: object[]): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/updateAsignadoSup/${id}`, body)
  }
  // Reasignación de carga a supervisores
  updateReAsignadoSup(id: any, body: object[]): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/updateReAsignadoSup/${id}`, body)
  }

}
