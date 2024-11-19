import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './security/auth.guard';
import { BlankComponent } from './pages/layouts/blank/blank.component';
import { AdminComponent } from './pages/layouts/admin/admin.component';
import { CrearUsuarioComponent } from './pages/admin/usuario/crear-usuario/crear-usuario.component';
import { ListaUsuarioComponent } from './pages/admin/usuario/lista-usuario/lista-usuario.component';

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
    ]
  },
  { path: '**', redirectTo: 'Login' }
];
