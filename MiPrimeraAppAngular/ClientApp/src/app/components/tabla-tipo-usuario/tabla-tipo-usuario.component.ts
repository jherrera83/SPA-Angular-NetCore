import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'tabla-tipo-usuario',
  templateUrl: './tabla-tipo-usuario.component.html',
  styleUrls: ['./tabla-tipo-usuario.component.css']
})
export class TablaTipoUsuarioComponent implements OnInit {

  @Input() tiposusuario: any;
  @Input() isMantenimiento = false;
  p: number = 1;
  cabeceras: string[] = ["IdTipoUsuario", "Nombre", "Descripcion"];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.listarTipoUsuario().subscribe(
      data => this.tiposusuario = data
    );
  }

  eliminar(idTipoUsuario) {
    if (confirm('Desea eliminar?')) {
      this.usuarioService.eliminarTipoUsuario(idTipoUsuario).subscribe(res => {
        this.usuarioService.listarTipoUsuario().subscribe(res => this.tiposusuario = res);
      });
    }
  }

}
