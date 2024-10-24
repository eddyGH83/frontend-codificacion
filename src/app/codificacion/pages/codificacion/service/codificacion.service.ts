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

  // SERVICIO PARA RECODIFICACION
  private id_registros: any[]= [];
  addItem(ids: any): void{this.id_registros.push(ids)}
  getItem(): any[]{return this.id_registros}




  // CODIFICACION SIMPLE - DOBLE  
  cargarParaCodificarSimple(body: object): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/cargarParaCodificarSimple`, body)
  }
  cargarParaCodificarDoble(body: object): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/cargarParaCodificarDoble`, body)
  }
  updateOcuAct(body: object): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/updateOcuAct`, body)
  }


  // Codificaión Simple
  updatePreguntaSimple(body: object): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/updatePreguntaSimple`, body)
  }
  updatePreguntaSimpleAnular(body: object): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/updatePreguntaSimpleAnular`, body)
  }


  // Codificación Doble Ocu Act
  updatePreguntaDobleOcuAct(body: object): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/updatePreguntaDobleOcuAct`, body)
  }
  /*   updatePreguntaDobleAct(body: object): Observable<any> {
      return this.http.post(`${this._apiUrl}/codificacion/updatePreguntaDobleAct`, body)
    } */


  updatePreguntaDobleAnular(body: object): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/updatePreguntaDobleAnular`, body)
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

  // PARA SUPERVISION ASISTIDA
  devuelvePreguntasSupervision(body: any): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/devuelvePreguntasSupervision`, body)
  }

  // PARA SUPERVISION AUTOMATICA
  devuelvePreguntasSupervisionAutomatica(body: any): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/devuelvePreguntasSupervisionAutomatica`, body)
  }

  // Asistida
  devuelveCargaParaSupervision(body: any): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/devuelveCargaParaSupervision`, body)
  }
  // Automática
  devuelveCargaParaSupervisionAutomatica(body: any): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/devuelveCargaParaSupervisionAutomatica`, body)
  }

  // Carga para Supervision Simple
  cargarParaSupervisionSimple(body: any): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/cargarParaSupervisionSimple`, body)
  }
  // Carga para Supervision Doble
  cargarParaSupervisionDoble(body: any): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/cargarParaSupervisionDoble`, body)
  }
  // Actualizar Pregunta Simple [Correccion]
  updatePreguntaSimpleCorreccion(body: any): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/updatePreguntaSimpleCorreccion`, body)
  }
  // Actualizar Pregunta Simple [btn check]
  updatePreguntaSimpleCheck(body: any): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/updatePreguntaSimpleCheck`, body)
  }
  // Actualizar Pregunta Doble [Correccion]
  updatePreguntaDobleCorreccion(body: any): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/updatePreguntaDobleCorreccion`, body)
  }

  updateCargaSupervision(body: any): Observable<any> {
    return this.http.post(`${this._apiUrl}/codificacion/updateCargaSupervision`, body)
  }

}
