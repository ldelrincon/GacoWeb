import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginLayoutComponent } from './shared/layouts/login-layout/login-layout.component';
import { CodigoOTPComponent } from './modules/security/codigo-otp/codigo-otp.component';
import { AuthGuard } from './core/guards/auth-page.guard';
import { AuthOTPGuard } from './core/guards';
import { ResetPasswordComponent } from './modules/security/reset-password/reset-password.component';
import { ChangePasswordComponent } from './modules/security/change-password/change-password.component';
import { ForgotPasswordResolver } from './core/Helpers/forgot-password.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminLayoutComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./app.module').then(m => m.AppModule)
      },
      {
        path: 'home',
        component: HomeComponent
      }
    ]
  },
  {
    path: 'sidebar',
    component: SidebarComponent
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [{
      path: 'login',
      loadChildren: () => import('./modules/security/login/login.module').then(m => m.LoginModule)
    },
    {
      path: 'codigo-otp',
      canActivate: [AuthOTPGuard],
      component: CodigoOTPComponent
    },
    {
      path: 'reset-password',
      component: ResetPasswordComponent
    },
    {
      path: 'changepassword/:uuid',
      resolve: [ForgotPasswordResolver],
      component: ChangePasswordComponent
    }]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
