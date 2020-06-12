import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { promise } from 'protractor';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'usuario-form-mantenimiento',
  templateUrl: './usuario-form-mantenimiento.component.html',
  styleUrls: ['./usuario-form-mantenimiento.component.css']
})
export class UsuarioFormMantenimientoComponent implements OnInit {

  tipoUsuarios: any;
  personas: any;
  usuario: FormGroup;
  titulo: string = '';
  parametro: string;
  ver: boolean = true;

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private personaService: PersonaService) {

    this.usuario = new FormGroup({
      'iidusuario': new FormControl("0"),
      'nombreusuario': new FormControl("", [Validators.required, Validators.maxLength(100)], this.noRepetirUsuarioInsertar.bind(this)),
      'contra': new FormControl("", [Validators.required, Validators.maxLength(100)]),
      'contra2': new FormControl("", [Validators.required, Validators.maxLength(100), this.validarContraIguales.bind(this)]),
      'iidpersona': new FormControl("", [Validators.required]),
      'iidtipousuario': new FormControl("", [Validators.required]),
    });

    this.activatedRoute.params.subscribe(parametro => {
      this.parametro = parametro["id"];

      if (this.parametro == 'nuevo') {
        this.ver = true;
        this.titulo = 'Agregando un nuevo usuario';

      } else {

        this.ver = false;

        this.usuario.controls["contra"].setValue("1");
        this.usuario.controls["contra2"].setValue("1");
        this.usuario.controls["iidpersona"].setValue("1");

        this.titulo = 'Editando un usuario';
      }
    });

  }

  ngOnInit() {

    this.usuarioService.getTipoUsuario().subscribe(res => this.tipoUsuarios = res);
    this.personaService.listarPersonaCombo().subscribe(res => this.personas = res);

    if (this.parametro != 'nuevo') {
      this.usuarioService.recuperarUsuario(this.parametro).subscribe(param => {
        this.usuario.controls["iidusuario"].setValue(param.iidusuario);
        this.usuario.controls["nombreusuario"].setValue(param.nombreusuario);
        //this.usuario.controls["contra"].setValue(param.contra);
        //this.usuario.controls["iidpersona"].setValue(param.iidpersona);
        this.usuario.controls["iidtipousuario"].setValue(param.iidtipousuario);
      });
    }

  }

  guardarDatos() {
    if (this.usuario.valid == true) {
      this.usuarioService.agregarUsuario(this.usuario.value).subscribe(data => {
        this.router.navigate(['/mantenimiento-usuario'])
      });
    }
  }

  validarContraIguales(control: FormControl) {
    if (control.value != "" && control.value != null) {
      if (this.usuario.controls['contra'].value != control.value) {
        return { noIguales: true };
      }
      else {
        return null;
      }
    }
  }

  noRepetirUsuarioInsertar(control: FormControl) {
    var promesa = new Promise((resolve, reject) => {
      if (control.value != "" && control.value != null) {
        this.usuarioService.validarUsuario(this.usuario.controls['iidusuario'].value, control.value)
          .subscribe(data => {
            if (data >= 1) {
              resolve({ yaExiste: true });
            }
            else {
              resolve(null);
            }
          });
      }
    });
    return promesa;
  }


}
