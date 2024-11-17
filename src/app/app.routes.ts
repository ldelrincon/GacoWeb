import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './security/auth.guard';
import { BlankComponent } from './pages/layouts/blank/blank.component';
import { AdminComponent } from './pages/layouts/admin/admin.component';
import { bootstrapApplication } from '@angular/platform-browser';

export const routes: Routes = [
  // { path: "", component: LoginComponent },
  // { path: "registro", component: RegistroComponent },
  // { path: "home", component: HomeComponent, canActivate: [authGuard] },
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
    ]
  },
  { path: '**', redirectTo: 'Login' }
];

// bootstrapApplication(AdminComponent, {
//   providers: [
//     provideRouter(routes)
//   ]
// });
