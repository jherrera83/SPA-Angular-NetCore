import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Injectable, Inject } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: FormGroup;
  error: boolean = false;
  urlBase: string;

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    @Inject('BASE_URL') url: string) {

    this.urlBase = url;

    this.usuario = new FormGroup({
      'nombreusuario': new FormControl("", [Validators.required, Validators.maxLength(20)]),
      'contra': new FormControl("", [Validators.required, Validators.maxLength(20)])
    });

  }

  ngOnInit() {

  }

  login() {
    if (this.usuario.valid) {
      this.usuarioService.login(this.usuario.value).subscribe(res => {
        if (res.iidusuario == 0) {
          this.error = true;
        } else {
          this.error = false;
          //this.router.navigate(["/componente-bienvenida"]);
          window.location.href = this.urlBase +  'componente-bienvenida';
        }
      });
    }
  }

}
