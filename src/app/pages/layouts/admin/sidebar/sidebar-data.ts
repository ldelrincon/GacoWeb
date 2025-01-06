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
    displayName: 'Lista Usuarios',
    iconName: 'users',
    route: '/admin/usuarios/lista',
  },
  {
    navCap: 'Clientes',
  },
  {
    displayName: 'Lista Clientes',
    iconName: 'tie',
    route: '/admin/clientes/lista',
  },
  {
    navCap: 'Solicitudes',
  },
  {
    displayName: 'Lista Solicitudes',
    iconName: 'file-like',
    route: '/admin/solicitudes/lista',
  },
  {
    displayName: 'Lista Seguimentos',
    iconName: 'message-2',
    route: '/admin/seguimentos/lista',
  },
  {
    navCap: 'Productos',
  },
  {
    displayName: 'Lista Productos',
    iconName: 'tool',
    route: '/admin/productos/lista',
  },
];
