import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TypeCheckCompiler } from '@angular/compiler/src/view_compiler/type_check_compiler';

@Component({
  selector: 'tipousuario-form-mantenimiento',
  templateUrl: './tipousuario-form-mantenimiento.component.html',
  styleUrls: ['./tipousuario-form-mantenimiento.component.css']
})
export class TipousuarioFormMantenimientoComponent implements OnInit {

  tipousuario: FormGroup;
  titulo: string = '';
  parametro: string;
  paginas: any;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.tipousuario = new FormGroup({
      'iidtipousuario': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(100)]),
      'descripcion': new FormControl("", [Validators.required, Validators.maxLength(100)]),
      'valores': new FormControl(""),
    });

    this.activatedRoute.params.subscribe(parametro => {
      this.parametro = parametro["id"];
      if (this.parametro == 'nuevo') {
        this.titulo = 'Agregando un tipo de usuario';
      } else {
        this.titulo = 'Editando un tipo de usuario';
      }
    });

    this.usuarioService.listarPaginasTipoUsuario().subscribe(data => {
      this.paginas = data;
    });

  }

  ngOnInit() {

    if (this.parametro != 'nuevo') {

      this.usuarioService.listarPaginasRecuperar(this.parametro).subscribe(res => {
        this.tipousuario.controls["iidtipousuario"].setValue(res.iidtipousuario);
        this.tipousuario.controls["nombre"].setValue(res.nombre);
        this.tipousuario.controls["descripcion"].setValue(res.descripcion);

        var listaPaginas = res.listaPaginas.map(p => p.iidpagina);

        setTimeout(() => {
          var checks = document.getElementsByClassName('check');
          var nCheck = checks.length;
          var check;
          for (var i = 0; i < nCheck; i++) {
            check = checks[i];
            var indice = listaPaginas.indexOf(check.name * 1);
            if (indice > -1) {
              check.checked = true;
            }
          }
        }, 500);

      });

      //this.usuarioService.recuperarTipoUsuario(this.parametro).subscribe(param => {
      //  this.tipousuario.controls["iidtipousuario"].setValue(param.iidtipousuario);
      //  this.tipousuario.controls["nombre"].setValue(param.nombre);
      //  this.tipousuario.controls["descripcion"].setValue(param.descripcion);
      //});
    }
  }

  guardarDatos() {
    if (this.tipousuario.valid) {
      this.verCheck();
      this.usuarioService.agregarTipoUsuario(this.tipousuario.value).subscribe(data => {
        this.router.navigate(['/mantenimiento-tipo-usuario'])
      });
    }
  }

  verCheck() {
    var seleccionados = "";
    var checks = document.getElementsByClassName('check');
    var check;
    for (var i = 0; i < checks.length; i++) {
      check = checks[i];
      if (check.checked) {
        seleccionados += check.name;
        seleccionados += "$";
      }
    }
    if (seleccionados != "") {
      seleccionados = seleccionados.substring(0, seleccionados.length - 1);
    }

    this.tipousuario.controls['valores'].setValue(seleccionados);

  }

}
