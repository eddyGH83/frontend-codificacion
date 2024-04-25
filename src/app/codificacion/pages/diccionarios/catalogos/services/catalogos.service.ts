import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Customer } from '../catalogos';


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

export class CatalogosService {

  private _apiUrl: string = environment.base_url;

  constructor(private http: HttpClient) { }

  getCustomersMedium() {
    return this.http.get<any>('assets/customers-medium.json')
      .toPromise()
      .then(res => <Customer[]>res.data)
      .then(data => { return data; });
  }

  // 
  /* devuelveCatalogo(body: object): Observable<any> {
      const url = `${this._apiUrl}/diccionarios/devuelveCatalogo`;
      return this.http.post<any>(url, body);
  } */




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



  /**
*
* @param body Lleva de parametro de catalogo, el codigo
* @returns Los elemento del catalogo que coinciden con el codigo enviado
*/
  /* devuelveCatalogoPorCodigo(body: object): Observable<any> {
    return this.httpClient.post(`${base_url}/diccionarios/devuelveCatalogoPorCodigo`, body)
  } */
  /**
*
* @param body Lleva de parametro de catalogo, el codigo
* @returns Los elemento del catalogo que coinciden con el codigo enviado
*/
  /* devuelveDescripcionPorCodigo(body: object): Observable<any> {
    return this.httpClient.post(`${base_url}/diccionarios/devuelveDescripcionPorCodigo`, body)
  } */

 



  /**
   * 
   * @param id 
   * @param body 
   * @returns 
   */
  /*   updateCatalogo(id: any, body: object): Observable<any> {
      return this.httpClient.put(`${base_url}/diccionarios/updateCatalogo/${id}`, body)
    } */


}