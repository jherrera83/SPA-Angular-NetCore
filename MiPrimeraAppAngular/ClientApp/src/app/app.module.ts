import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

//Registramos los componentes creados
import { buttonAgregar } from './components/button/button.component';
import { diasSemana } from './components/diasSemana/diasSemana.component';
import { TablaProductoComponent } from './components/tabla-producto/tabla-producto.component';

//Registramos los servicios creados
import { productoService } from './services/producto.service';
import { CategoriaService } from './services/categoria.service';
import { PersonaService } from './services/persona.service';
import { UsuarioService } from './services/usuario.service';

import { HttpModule } from '@angular/http';
import { BuscadorProductoNombreComponent } from './components/buscador-producto-nombre/buscador-producto-nombre.component';
import { FiltradoProductoNombreComponent } from './components/filtrado-producto-nombre/filtrado-producto-nombre.component';
import { BuscadorProductoCategoriaComponent } from './components/buscador-producto-categoria/buscador-producto-categoria.component';
import { FiltradoProductoCategoriaComponent } from './components/filtrado-producto-categoria/filtrado-producto-categoria.component';
import { TablaPersonaComponent } from './components/tabla-persona/tabla-persona.component';
import { BuscadorPersonaNombreCompletoComponent } from './components/buscador-persona-nombre-completo/buscador-persona-nombre-completo.component';
import { FiltradoPersonaNombreCompletoComponent } from './components/filtrado-persona-nombre-completo/filtrado-persona-nombre-completo.component';
import { BuscadorUsuarioTipoUsuarioComponent } from './components/buscador-usuario-tipo-usuario/buscador-usuario-tipo-usuario.component';
import { FiltradoUsuarioTipoUsuarioComponent } from './components/filtrado-usuario-tipo-usuario/filtrado-usuario-tipo-usuario.component';
import { TablaUsuarioComponent } from './components/tabla-usuario/tabla-usuario.component';
import { MantenimientoPersonaComponent } from './components/mantenimiento-persona/mantenimiento-persona.component';
import { PersonaFormMantenimientoComponent } from './components/persona-form-mantenimiento/persona-form-mantenimiento.component';
import { MantenimientoProductoComponent } from './components/mantenimiento-producto/mantenimiento-producto.component';
import { ProductoFormMantenimientoComponent } from './components/producto-form-mantenimiento/producto-form-mantenimiento.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MantenimientoUsuarioComponent } from './components/mantenimiento-usuario/mantenimiento-usuario.component';
import { UsuarioFormMantenimientoComponent } from './components/usuario-form-mantenimiento/usuario-form-mantenimiento.component';
import { LoginComponent } from './components/login/login.component';
import { PaginaErrorLogComponent } from './components/pagina-error-log/pagina-error-log.component';
import { PermisoErrorPaginaComponent } from './components/permiso-error-pagina/permiso-error-pagina.component';
import { SeguridadGuard } from './components/guards/seguridad.guard';
import { ComponenteBienvenidoComponent } from './components/componente-bienvenido/componente-bienvenido.component';
import { MantenimientoTipoUsuarioComponent } from './components/mantenimiento-tipo-usuario/mantenimiento-tipo-usuario.component';
import { TipousuarioFormMantenimientoComponent } from './components/tipousuario-form-mantenimiento/tipousuario-form-mantenimiento.component';
import { TablaTipoUsuarioComponent } from './components/tabla-tipo-usuario/tabla-tipo-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    buttonAgregar,
    diasSemana,
    TablaProductoComponent,
    BuscadorProductoNombreComponent,
    FiltradoProductoNombreComponent,
    BuscadorProductoCategoriaComponent,
    FiltradoProductoCategoriaComponent,
    TablaPersonaComponent,
    BuscadorPersonaNombreCompletoComponent,
    FiltradoPersonaNombreCompletoComponent,
    BuscadorUsuarioTipoUsuarioComponent,
    FiltradoUsuarioTipoUsuarioComponent,
    TablaUsuarioComponent,
    MantenimientoPersonaComponent,
    PersonaFormMantenimientoComponent,
    MantenimientoProductoComponent,
    ProductoFormMantenimientoComponent,
    MantenimientoUsuarioComponent,
    UsuarioFormMantenimientoComponent,
    LoginComponent,
    PaginaErrorLogComponent,
    PermisoErrorPaginaComponent,
    ComponenteBienvenidoComponent,
    MantenimientoTipoUsuarioComponent,
    TipousuarioFormMantenimientoComponent,
    TablaTipoUsuarioComponent,
  ],
  imports: [
    HttpModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      { path: 'filtradoProductoCategoria', component: FiltradoProductoCategoriaComponent, pathMatch: 'full', canActivate: [SeguridadGuard] },
      { path: 'filtradoProductoNombre', component: FiltradoProductoNombreComponent, canActivate: [SeguridadGuard] },
      { path: 'filtradoPersonaNombreCompleto', component: FiltradoPersonaNombreCompletoComponent, canActivate: [SeguridadGuard] },
      { path: 'filtradoUsuarioTipo', component: FiltradoUsuarioTipoUsuarioComponent, canActivate: [SeguridadGuard] },
      { path: 'mantenimiento-persona', component: MantenimientoPersonaComponent, canActivate: [SeguridadGuard] },
      { path: 'persona-form-mantenimiento/:id', component: PersonaFormMantenimientoComponent, canActivate: [SeguridadGuard] },
      { path: 'mantenimiento-producto', component: MantenimientoProductoComponent, canActivate: [SeguridadGuard] },
      { path: 'producto-form-mantenimiento/:id', component: ProductoFormMantenimientoComponent, canActivate: [SeguridadGuard] },
      { path: 'mantenimiento-usuario', component: MantenimientoUsuarioComponent, canActivate: [SeguridadGuard] },
      { path: 'usuario-form-mantenimiento/:id', component: UsuarioFormMantenimientoComponent, canActivate: [SeguridadGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'pagina-error', component: PaginaErrorLogComponent },
      { path: 'pagina-error-permiso', component: PermisoErrorPaginaComponent },
      { path: 'componente-bienvenida', component: ComponenteBienvenidoComponent },
      { path: 'mantenimiento-tipo-usuario', component: MantenimientoTipoUsuarioComponent },
      { path: 'tipo-usuario-form-mantenimiento/:id', component: TipousuarioFormMantenimientoComponent },
    ])
  ],
  providers: [productoService, CategoriaService, PersonaService, UsuarioService, SeguridadGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
