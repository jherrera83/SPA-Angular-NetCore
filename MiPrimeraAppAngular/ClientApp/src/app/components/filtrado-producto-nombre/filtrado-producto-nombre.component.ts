import { Component, OnInit } from '@angular/core';
import { productoService } from '../../services/producto.service';

@Component({
  selector: 'filtrado-producto-nombre',
  templateUrl: './filtrado-producto-nombre.component.html',
  styleUrls: ['./filtrado-producto-nombre.component.css']
})
export class FiltradoProductoNombreComponent implements OnInit {

  productos: any;

  constructor(private productoService: productoService) { }

  ngOnInit() {
  }

  filtrarDatos(nombre) {
    if (nombre == "") {
      this.productoService.getProducto().
        subscribe(data => this.productos = data);
    }
    else {
      this.productoService.getFiltroProductoPorNombre(nombre.value).
        subscribe(data => this.productos = data);
    } 
  }

  limpiar(nombre) {
    nombre.value = "";
    this.productoService.getProducto().
      subscribe(data => this.productos = data);
  }

}
