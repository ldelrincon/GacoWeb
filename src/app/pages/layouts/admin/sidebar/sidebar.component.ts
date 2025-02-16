import { Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-data';
import { BrandingComponent } from './branding.component';
import { MatListModule } from '@angular/material/list';
import { AppNavItemComponent } from './nav-item/nav-item.component';
import { NavService } from '../../../../services/nav.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  imports: [
    BrandingComponent,
    MatListModule,
    AppNavItemComponent,
    CommonModule
  ]
})
export class SidebarComponent implements OnInit {
  navItems = navItems;

  constructor(public navService: NavService) { }

  ngOnInit(): void { }
}

