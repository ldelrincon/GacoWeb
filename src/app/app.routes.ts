import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './security/auth.guard';
import { BlankComponent } from './pages/layouts/blank/blank.component';
import { AdminComponent } from './pages/layouts/admin/admin.component';
import { CrearUsuarioComponent } from './pages/admin/usuarios/crear-usuario/crear-usuario.component';
import { ListaUsuarioComponent } from './pages/admin/usuarios/lista-usuario/lista-usuario.component';
import { ListaClienteComponent } from './pages/admin/clientes/lista-cliente/lista-cliente.component';
import { ClienteComponent } from './pages/admin/clientes/cliente/cliente.component';
import { SolicitudComponent } from './pages/admin/solicitudes/solicitud/solicitud.component';
import { ListaSolicitudesComponent } from './pages/admin/solicitudes/lista-solicitudes/lista-solicitudes.component';
import { ListaProductosComponent } from './pages/admin/productos/lista-productos/lista-productos.component';
import { ProductoComponent } from './pages/admin/productos/producto/producto.component';
import { ListaSeguimentosComponent } from './pages/admin/seguimentos/lista-seguimentos/lista-seguimentos.component';

export const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: "login", component: LoginComponent },
      { path: "registro", component: RegistroComponent },
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
      // #Usuarios
      { path: "usuarios/lista", component: ListaUsuarioComponent, canActivate: [AuthGuard] },
      { path: "usuarios/crear", component: CrearUsuarioComponent, canActivate: [AuthGuard] },
      { path: "usuarios/editar/:id", component: CrearUsuarioComponent, canActivate: [AuthGuard] },
      // #Clientes
      { path: "clientes/lista", component: ListaClienteComponent, canActivate: [AuthGuard] },
      { path: "clientes/crear", component: ClienteComponent, canActivate: [AuthGuard] },
      { path: "clientes/editar/:id", component: ClienteComponent, canActivate: [AuthGuard] },
      // #Solicitudes
      { path: "solicitudes/lista", component: ListaSolicitudesComponent, canActivate: [AuthGuard] },
      { path: "solicitudes/crear", component: SolicitudComponent, canActivate: [AuthGuard] },
      { path: "solicitudes/editar/:id", component: SolicitudComponent, canActivate: [AuthGuard] },
      // #Seguimentos.
      { path: "seguimentos/lista", component: ListaSeguimentosComponent, canActivate: [AuthGuard] },
      // #Productos
      { path: "productos/lista", component: ListaProductosComponent, canActivate: [AuthGuard] },
      { path: "productos/crear", component: ProductoComponent, canActivate: [AuthGuard] },
      { path: "productos/editar/:id", component: ProductoComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: '**', redirectTo: 'Login' }
];
