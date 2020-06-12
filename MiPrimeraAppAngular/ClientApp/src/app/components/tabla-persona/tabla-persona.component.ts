import { Component, OnInit, Input } from '@angular/core';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'tabla-persona',
  templateUrl: './tabla-persona.component.html',
  styleUrls: ['./tabla-persona.component.css']
})
export class TablaPersonaComponent implements OnInit {

  @Input() personas: any;
  @Input() isMantenimiento = false;
  cabeceras: string[] = ["idpersona", "nombre completo", "correo", "telefono"];
  p: number = 1;

  constructor(private personaService: PersonaService) {

  }

  ngOnInit() {
    this.personaService.getPersonas().subscribe(res => this.personas = res);
  }

  eliminar(idPersona) {
    if (confirm('Desea eliminar?')) {
      this.personaService.eliminarPersona(idPersona).subscribe(res => {
        this.personaService.getPersonas().subscribe(res => this.personas = res);
      });
    }
  }

}
