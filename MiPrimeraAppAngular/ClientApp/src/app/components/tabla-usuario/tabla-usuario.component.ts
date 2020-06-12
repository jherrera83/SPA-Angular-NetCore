import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'tabla-usuario',
  templateUrl: './tabla-usuario.component.html',
  styleUrls: ['./tabla-usuario.component.css']
})
export class TablaUsuarioComponent implements OnInit {

  @Input() usuarios: any;
  @Input() isMantenimiento = false;
  cabeceras: string[] = ["idusuario", "usuario", "persona", "tipousuario"];
  p: number = 1;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getUsuario().subscribe(res => this.usuarios = res);
  }

  eliminar(idUsuario) {
    if (confirm('Desea eliminar?')) {
      this.usuarioService.eliminarUsuario(idUsuario).subscribe(res => {
        this.usuarioService.getUsuario().subscribe(res => this.usuarios = res);
      });
    }
  }

}
