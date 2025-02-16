import { NavItem } from './nav-item/nav-item';



let navItems: NavItem[] = [];

function updateNavItems() {
  const data = localStorage.getItem("data");
    switch (data) {
      case "1":
        navItems = [
          { navCap: 'Home' },
          {
            displayName: 'Dashboard',
            iconName: 'layout-dashboard',
            route: '/admin/home',
          },
          { navCap: 'Usuarios' },
          {
            displayName: 'Lista Usuarios',
            iconName: 'users',
            route: '/admin/usuarios/lista',
          },
          { navCap: 'Clientes' },
          {
            displayName: 'Lista Clientes',
            iconName: 'tie',
            route: '/admin/clientes/lista',
          },
          { navCap: 'Solicitudes' },
          {
            displayName: 'Lista Solicitudes',
            iconName: 'file-like',
            route: '/admin/solicitudes/lista',
          },
          {
            displayName: 'Lista Seguimientos', // Corregido "Seguimentos" a "Seguimientos"
            iconName: 'message-2',
            route: '/admin/seguimientos/lista',
          },
          { navCap: 'Productos' },
          {
            displayName: 'Lista Productos',
            iconName: 'tool',
            route: '/admin/productos/lista',
          },
        ];
        break;

      case "2":
        navItems = [
          { navCap: 'Home' },
          {
            displayName: 'Dashboard',
            iconName: 'layout-dashboard',
            route: '/admin/home',
          },
          { navCap: 'Solicitudes' },
          {
            displayName: 'Lista Solicitudes',
            iconName: 'file-like',
            route: '/admin/solicitudes/lista',
          },
          {
            displayName: 'Lista Seguimientos', // Corregido "Seguimentos" a "Seguimientos"
            iconName: 'message-2',
            route: '/admin/seguimientos/lista',
          },
          { navCap: 'Productos' },
          {
            displayName: 'Lista Productos',
            iconName: 'tool',
            route: '/admin/productos/lista',
          },
        ];
        break;

      case "3":
        navItems = [
          { navCap: 'Home' },
          {
            displayName: 'Dashboard',
            iconName: 'layout-dashboard',
            route: '/admin/home',
          },

          { navCap: 'Clientes' },
          {
            displayName: 'Lista Clientes',
            iconName: 'tie',
            route: '/admin/clientes/lista',
          },
          { navCap: 'Solicitudes' },
          {
            displayName: 'Lista Solicitudes',
            iconName: 'file-like',
            route: '/admin/solicitudes/lista',
          },
          {
            displayName: 'Lista Seguimientos', // Corregido "Seguimentos" a "Seguimientos"
            iconName: 'message-2',
            route: '/admin/seguimientos/lista',
          },

        ];
        break;

      default:
        navItems = []; // Si `data` no es "1", "2" ni "3", deja el menú vacío.
    }

}
// Llamar la función para actualizar navItems
updateNavItems();

// Si `localStorage` cambia, también puedes actualizarlo manualmente
window.addEventListener("storage", updateNavItems);

export { navItems };

