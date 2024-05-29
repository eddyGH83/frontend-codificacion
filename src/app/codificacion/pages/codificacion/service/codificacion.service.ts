import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodificacionService {

  private _apiUrl: string = environment.base_url;

  constructor(private http: HttpClient) { }



  // CODIFICACION SIMPLE - DOBLE  
  cargarParaCodificarSimple(body: object): Observable<any> {        
    return this.http.post(`${this._apiUrl}/codificacion/cargarParaCodificarSimple`, body)
  }
  cargarParaCodificarDoble(body: object): Observable<any> {        
    return this.http.post(`${this._apiUrl}/codificacion/cargarParaCodificarDoble`, body)
  }





  ////CATALOGOS
  /**
 *
 * @param body Lleva de parametro de catalogo
 * @returns Los elemento del catalogo llevado en body
 */
  devuelveCatalogo(body: object): Observable<any> {
    //console.log(`${this._apiUrl}/diccionarios/devuelveCatalogo`);
    return this.http.post(`${this._apiUrl}/diccionarios/devuelveCatalogo`, body)

  }

  /**
   * 
   * @param id 
   * @param body 
   * @returns 
   */
  updateEstadoCatalogo(id: any, body: object): Observable<any> {
    return this.http.put(`${this._apiUrl}/diccionarios/updateEstadoCatalogo/${id}`, body)
  }

  /**
  * 
  * @param body 
  * @returns 
  */
  validarRegistros(body: object): Observable<any> {
    return this.http.post(`${this._apiUrl}/diccionarios/validarRegistros`, body)
  }

  /**
   * 
   * @param body 
   * @returns 
   */
  insertarCatalogo(body: object): Observable<any> {
    return this.http.post(`${this._apiUrl}/diccionarios/insertarCatalogo`, body)
  }


  // CODIFICACION
  devuelvePreguntasCodificado(body: any): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/devuelvePreguntasCodificado`, body)
  }

}
