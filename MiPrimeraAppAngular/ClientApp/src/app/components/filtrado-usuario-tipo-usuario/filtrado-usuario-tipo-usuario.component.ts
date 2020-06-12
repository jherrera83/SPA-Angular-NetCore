import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-filtrado-usuario-tipo-usuario',
  templateUrl: './filtrado-usuario-tipo-usuario.component.html',
  styleUrls: ['./filtrado-usuario-tipo-usuario.component.css']
})
export class FiltradoUsuarioTipoUsuarioComponent implements OnInit {

  usuarios: any;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  filtrar(tipoUsuario) {
    if (tipoUsuario.value == "") {
      this.usuarioService.getUsuario().subscribe(res => this.usuarios = res);
    } else {
      this.usuarioService.getUsuarioPorTipo(tipoUsuario.value).subscribe(res => this.usuarios = res);
    }
  }

}
