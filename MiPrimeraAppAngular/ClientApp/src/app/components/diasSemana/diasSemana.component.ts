import { Component } from '@angular/core'

@Component({
  selector: 'diasSemana',
  templateUrl: 'diasSemana.component.html'
})

export class diasSemana {

  nombre: string = "Julio";
  cursos: string[] = ["LinQ", "Ado.Net", "ASP.NET MVC", "Angular"];
  persona: object = {
    nombre: "Pepe",
    apellido: "Perez"
  };
  enlace: string = "https://www.google.com.pe";
}
