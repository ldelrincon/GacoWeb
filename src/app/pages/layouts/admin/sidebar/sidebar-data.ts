import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/admin/home',
  },
  {
    navCap: 'Usuarios',
  },
  {
    displayName: 'Lista',
    iconName: 'users',
    route: '/admin/usuarios/lista',
  },
];
