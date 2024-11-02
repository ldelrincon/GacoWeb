import { AfterViewInit, Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule, isPlatformBrowser } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
import { SweetService } from '@app/core/services/sweet.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from '@app/core/services';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private breakpointObserver = inject(BreakpointObserver);

  drawerOpened: boolean = true;
  sidenavMode: string = 'side';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private sweet: SweetService,
    public spinner: NgxSpinnerService,
    public auth : AuthenticationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      // Aquí puedes usar `window`
      window.addEventListener('resize', this.updateHeight);
    }
  }

  updateHeight = () => {
    const toolbar = document.querySelector('.toolbar-nav') as HTMLElement;
    const content = document.querySelector('app-home') as HTMLElement;

    if (toolbar && content) {
      const toolbarHeight = toolbar.offsetHeight;
      // const screenHeight = window.innerHeight;

      content.style.height = `calc(100vh - ${toolbarHeight}px)`;
      content.style.display = 'block';
    }
  }

  // ngAfterViewInit() {
  //   window.addEventListener('resize', () => {
  //     const toolbar = document.querySelector('.toolbar-nav') as HTMLElement;
  //     const content = document.querySelector('app-home') as HTMLElement;

  //     const toolbarHeight = toolbar.offsetHeight;
  //     const screenHeight = window.innerHeight;

  //     content.style.height = `calc(100vh - ${toolbarHeight}px)`;
  //     content.style.display = 'block';
  //   });

  //   // Ejecutar el cálculo al cargar la página
  //   window.dispatchEvent(new Event('resize'));
  // }

  logout() {
    this.sweet.showSwalQuestion(" Cerrar sesión", "¿Está seguro de que desea cerrar sesión?").then((result) => {
      if (result.value) {
        this.spinner.show();
        this.auth.logout();
        this.spinner.hide();
      }
    });
  }

  toggleHover(event: any, openOrClose: boolean) {
    if (this.drawerOpened) {
      this.sidenavMode = 'side';
      return;
    } else {
      // Cuando el sidenav esta minimizado ejecuta la animación de abrir y cerrar al poner el mouse por encima
      this.sidenavMode = 'over';

      if(openOrClose) {
        event.open();
      } else {
        event.close();
      }
    }
  }

  markAsOpen(event: any) {
    this.drawerOpened = event.opened;
  }
}
