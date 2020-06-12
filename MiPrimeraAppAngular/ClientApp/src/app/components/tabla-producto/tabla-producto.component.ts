import { Component, OnInit,Input } from '@angular/core';

//importamos el servicio
import { productoService } from '../../services/producto.service';

@Component({
  selector: 'tabla-producto',
  templateUrl: './tabla-producto.component.html',
  styleUrls: ['./tabla-producto.component.css']
})
export class TablaProductoComponent implements OnInit {

  @Input() productos: any;
  @Input() isMantenimiento = false;
  p: number = 1;
  cabeceras: string[]=["IdProducto", "Nombre", "Precio", "Stock", "Categoria"];

  constructor(private productoService: productoService) {

  }

  //el load
  ngOnInit() {
    this.productoService.getProducto().subscribe(
      data => this.productos = data
    );
  }

  eliminar(idProducto) {
    if (confirm('Desea eliminar?')) {
      this.productoService.eliminarProducto(idProducto).subscribe(res => {
        this.productoService.getProducto().subscribe(res => this.productos = res);
      });
    }
  }

}
