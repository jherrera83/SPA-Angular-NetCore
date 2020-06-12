import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  login: boolean = false;
  menus: any;

  collapse() {
    this.isExpanded = false;
  }

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuarioService.obtenerSession().subscribe(data => {

      if (data) {
        this.login = true;

        this.usuarioService.listarPaginas().subscribe(dato => { this.menus = dato});

      } else {
        this.login = false;
        this.router.navigate(['/login']);
      }

    });
  }

  ngOnInit() {

  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  cerrarSession() {
    this.usuarioService.cerrarSession().subscribe(res => {
      if (res.valor == "ok") {
        this.login = false;
        this.router.navigate(['/login']);
      }
    });
  }
}
