import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// services
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { ApiService } from './services/api.service';
import { JwtService } from './services/jwt.service';
import { LoadingService, LoadingComponent } from './services/loading.service';
import { HelperService } from './services/HelperService.service';


// guards
// import { AuthGuard, NoAuthGuard } from './guards';
import { DashboardService } from './services/dashboard.service';
import { AuthenticationService } from './services/seguridad/authentication.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    LoadingComponent
  ],
  declarations: [
    LoadingComponent
  ],
  providers: [
    ApiService,
    JwtService,
    AuthenticationService,
    LoadingService,
    DashboardService,
    HelperService
  ]
  , exports: [
    LoadingComponent
  ]
})
export class CoreModule { }
