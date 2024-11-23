import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  standalone: true,
  template: `
    <div class="branding">
      <a href="/">
        <img
          src="./assets/images/logos/Gaco.jpeg"
          class="align-middle m-2"
          alt="logo"
          width="100% !important"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() { }
}
