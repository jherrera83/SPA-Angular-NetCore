import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class productoService {

  urlBase: string = "";

  constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
    //urlBase tiene el nombre del dominio
    this.urlBase = baseUrl;
  }


  public getProducto() {
    return this.http.get(this.urlBase + 'api/Producto/listarProductos')
      .map(res => res.json());
  }

  public getFiltroProductoPorNombre(nombre) {
    return this.http.get(this.urlBase + 'api/Producto/filtrarProductosPorNombre/' + nombre)
      .map(res => res.json());
  }

  public getFiltroProductoPorCategoria(idcategoria) {
    return this.http.get(this.urlBase + 'api/Producto/filtrarProductosPorCategoria/' + idcategoria)
      .map(res => res.json());
  }

  public agregarProducto(producto) {
    var url = this.urlBase + 'api/Producto/guardarProducto';
    return this.http.post(url, producto).map(res => res.json());
  }

  public recuperarProducto(idProducto) {
    return this.http.get(this.urlBase + 'api/Producto/recuperarProducto/' + idProducto)
      .map(res => res.json());
  }

  public eliminarProducto(idProducto) {
    return this.http.get(this.urlBase + 'api/Producto/eliminarProducto/' + idProducto)
      .map(res => res.json());
  }

  public getMarcas() {
    return this.http.get(this.urlBase + 'api/Producto/listarMarcas')
      .map(res => res.json());
  }

}
