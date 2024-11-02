import { Component } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

}
