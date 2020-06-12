import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoriaService {

  UrlBase: string;

  constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
    this.UrlBase = baseUrl;
  }

  public getCategoria() {
    return this.http.get(this.UrlBase + 'api/Categoria/listarCategorias')
      .map(res => res.json());
  }

}
