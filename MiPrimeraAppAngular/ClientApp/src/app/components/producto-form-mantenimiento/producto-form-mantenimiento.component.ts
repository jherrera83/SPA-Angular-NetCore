import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { productoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'producto-form-mantenimiento',
  templateUrl: './producto-form-mantenimiento.component.html',
  styleUrls: ['./producto-form-mantenimiento.component.css']
})
export class ProductoFormMantenimientoComponent implements OnInit {

  producto: FormGroup;
  titulo: string = '';
  parametro: string;
  categorias: any;
  marcas: any;

  constructor(private productoService: productoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoriaService: CategoriaService) {

    this.producto = new FormGroup({
      'idProducto': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(100)]),
      'precio': new FormControl("0", [Validators.required]),
      'stock': new FormControl("0", [Validators.required, this.noPuntoDecimal]),
      'idcategoria': new FormControl("", [Validators.required]),
      'idmarca': new FormControl("", [Validators.required]),
    });

    this.activatedRoute.params.subscribe(parametro => {
      this.parametro = parametro["id"];
      if (this.parametro == 'nuevo') {
        this.titulo = 'Agregando un nuevo Producto';
      } else {
        this.titulo = 'Editando un Producto';
      }
    });

  }

  ngOnInit() {

    this.productoService.getMarcas().subscribe(res => this.marcas = res);
    this.categoriaService.getCategoria().subscribe(res => this.categorias = res);

    if (this.parametro != 'nuevo') {

      this.productoService.recuperarProducto(this.parametro).subscribe(param => {
        this.producto.controls["idProducto"].setValue(param.idProducto);
        this.producto.controls["nombre"].setValue(param.nombre);
        this.producto.controls["precio"].setValue(param.precio);
        this.producto.controls["stock"].setValue(param.stock);
        this.producto.controls["idcategoria"].setValue(param.idcategoria);
        this.producto.controls["idmarca"].setValue(param.idmarca);
      });
    }

  }

  guardarDatos() {
    if (this.producto.valid) {
      this.productoService.agregarProducto(this.producto.value).subscribe(data => {
        this.router.navigate(['/mantenimiento-producto'])
      });
    }
  }

  noPuntoDecimal(control: FormControl) {
    if (control.value != null && control.value != "") {
      if ((<string>control.value.toString()).indexOf(".") > -1) {
        return { puntoDecimal: true };
      }
    }
    return null;
  }

}
