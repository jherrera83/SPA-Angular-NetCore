import { Component, OnInit } from '@angular/core';
import { productoService } from '../../services/producto.service';

@Component({
  selector: 'filtrado-producto-categoria',
  templateUrl: './filtrado-producto-categoria.component.html',
  styleUrls: ['./filtrado-producto-categoria.component.css']
})
export class FiltradoProductoCategoriaComponent implements OnInit {

  productos: any;

  constructor(private productoService: productoService) { }

  ngOnInit() {
  }

  buscar(categoria) {

    if (categoria.value == "") {
      this.productoService.getProducto().subscribe(res=> this.productos = res);
    } else {
      this.productoService.getFiltroProductoPorCategoria(categoria.value).subscribe(res=> this.productos = res);
    }

  }

  limpiar(categoria) {
    categoria.value = "";
    this.productoService.getProducto().subscribe(res=> this.productos = res);
  }

}
