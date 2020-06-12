import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PersonaService {

  urlBase: string;

  constructor(private http: Http, @Inject('BASE_URL') url: string) {
    this.urlBase = url;
  }

  public getPersonas() {
    return this.http.get(this.urlBase + 'api/Persona/listarPersonas').map(res => res.json());
  }

  public getPersonaFiltro(nombreCompleto) {
    return this.http.get(this.urlBase + 'api/Persona/filtraPersona/' + nombreCompleto).map(res => res.json());
  }

  public agregarPersona(persona) {
    var url = this.urlBase + 'api/Persona/guardarPersona';
    return this.http.post(url, persona).map(res => res.json());
  }

  public recuperarPersona(idPersona) {
    return this.http.get(this.urlBase + 'api/Persona/recuperarPersona/' + idPersona)
      .map(res => res.json());//.catch(this.errorHandler);
  }

  public eliminarPersona(idPersona) {
    return this.http.get(this.urlBase + 'api/Persona/eliminarPersona/' + idPersona)
      .map(res => res.json());
  }

  public validarCorreo(id, correo) {
    return this.http.get(this.urlBase + 'api/Persona/validarCorreo/' + id + '/' + correo)
      .map(res => res.json());
  }

  public listarPersonaCombo() {
    return this.http.get(this.urlBase + 'api/Persona/listarPersonasCombo')
      .map(res => res.json());
  }

  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error);
  }
}
