import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {

  urlBase: string;

  constructor(private http: Http,
    @Inject('BASE_URL') url: string,
    private router: Router) {
    this.urlBase = url;
  }

  public getUsuario() {
    return this.http.get(this.urlBase + 'api/Usuario/listarUsuario')
      .map(res => res.json());
  }

  public getTipoUsuario() {
    return this.http.get(this.urlBase + 'api/Usuario/listarTipoUsuario')
      .map(res => res.json());
  }

  public getUsuarioPorTipo(idTipo) {
    return this.http.get(this.urlBase + 'api/Usuario/filtrarUsuarioPorTipo/' + idTipo)
      .map(res => res.json());
  }

  public agregarUsuario(usuario) {
    var url = this.urlBase + 'api/Usuario/guardarUsuario';
    return this.http.post(url, usuario).map(res => res.json());
  }

  public recuperarUsuario(idUsuario) {
    return this.http.get(this.urlBase + 'api/Usuario/recuperarUsuario/' + idUsuario)
      .map(res => res.json());
  }

  public eliminarUsuario(idUsuario) {
    return this.http.get(this.urlBase + 'api/Usuario/eliminarUsuario/' + idUsuario)
      .map(res => res.json());
  }

  public validarUsuario(idUsuario, nombre) {
    return this.http.get(this.urlBase + 'api/Usuario/validarUsuario/' + idUsuario + '/' + nombre)
      .map(res => res.json());
  }

  public login(usuario) {
    return this.http.post(this.urlBase + 'api/Usuario/login', usuario)
      .map(res => res.json());
  }

  public obtenerVariableSession(next) {
    return this.http.get(this.urlBase + 'api/Usuario/obtenerVariableSession/')
      .map(res => {
        var data = res.json();
        var inf = data.valor;
        if (inf == "") {
          this.router.navigate(['pagina-error']);
          return false;
        } else {
          var pagina = next["url"][0].path;
          if (data.lista != null) {
            var paginas = data.lista.map(pagina => pagina.accion);
            if (paginas.indexOf(pagina) > -1 && pagina != 'Login') {
              return true;
            } else {
              this.router.navigate(['/pagina-error-permiso']);
              return false;
            }
          }
        }

        return true;

      });
  }

  public obtenerSession() {
    return this.http.get(this.urlBase + 'api/Usuario/obtenerVariableSession/')
      .map(res => {
        var data = res.json();
        var inf = data.valor;
        if (inf == "") {
          return false;
        } else {
          return true;
        }
      });
  }

  public cerrarSession() {
    return this.http.get(this.urlBase + 'api/Usuario/cerrarSession').map(res => res.json());
  }

  public listarPaginas() {
    return this.http.get(this.urlBase + 'api/Usuario/listarPaginas').map(res => res.json());
  }

  public listarTipoUsuario() {
    return this.http.get(this.urlBase + 'api/TipoUsuario/listarTipoUsuario')
      .map(res => res.json());
  }

  public eliminarTipoUsuario(idTipoUsuario) {
    return this.http.get(this.urlBase + 'api/TipoUsuario/eliminarTipoUsuario/' + idTipoUsuario)
      .map(res => res.json());
  }

  public listarPaginasTipoUsuario() {
    return this.http.get(this.urlBase + 'api/TipoUsuario/listarPaginasTipoUsuario')
      .map(res => res.json());
  }

  public agregarTipoUsuario(tipoUsuario) {
    var url = this.urlBase + 'api/TipoUsuario/guardarTipoUsuario';
    return this.http.post(url, tipoUsuario).map(res => res.json());
  }

  public recuperarTipoUsuario(idTipoUsuario) {
    return this.http.get(this.urlBase + 'api/TipoUsuario/recuperarTipoUsuario/' + idTipoUsuario)
      .map(res => res.json());
  }

  public listarPaginasRecuperar(idTipoUsuario) {
    return this.http.get(this.urlBase + 'api/TipoUsuario/listarPaginasRecuperar/' + idTipoUsuario)
      .map(res => res.json());
  }

}
