<template>
  <div class="navbar">
    <div class="menu-left">
      <Menubar :model="leftItems" class="menubar-custom" />
    </div>
    <div class="menu-right">
      <Menubar :model="rightItems" class="menubar-custom" />
    </div>
  </div>
</template>

<script>
import Menubar from 'primevue/menubar';

export default {
  name: 'NavBar',
  components: {
    Menubar
  },
  data() {
    return {
      leftItems: [
        {
          label: 'Inicio',
          icon: 'pi pi-fw pi-home',
          command: () => {
            this.$router.push('/home');
          }
        },
        {
          label: 'Noticias',
          icon: 'pi pi-fw pi-file',
          command: () => {
            this.$router.push('/news');
          }
        },
        {
          label: 'Perfil',
          icon: 'pi pi-fw pi-user',
          command: () => {
            this.$router.push('/profile');
          }
        }
      ],
      rightItems: [
        {
          label: 'Cerrar Sesión',
          icon: 'pi pi-fw pi-sign-out',
          command: () => {
            localStorage.removeItem('token');
            this.$router.push('/login');
          }
        }
      ]
    };
  }
};
</script>

<style scoped>
/* Contenedor principal de la barra */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}

/* Menú izquierdo (Inicio, Noticias, Perfil) */
.menu-left {
  display: flex;
  flex: 1;
}

/* Menú derecho (Cerrar Sesión) */
.menu-right {
  display: flex;
  justify-content: flex-end;
  flex: 1;
}

.menubar-custom {
  background-color: transparent;
  border: none;
}

.menubar-custom .p-menubar-root-list > li {
  margin: 0 15px;
}

.menubar-custom .p-menubar-root-list > li a {
  color: #2d3436; /* Color del texto */
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  transition: color 0.3s ease;
}

/* Efecto hover */
.menubar-custom .p-menubar-root-list > li a:hover {
  color: #6b73ff; /* Color al pasar el cursor */
}

.menubar-custom .p-menubar-root-list > li .pi {
  margin-right: 8px;
}

.menubar-custom .p-menubar-root-list > li a:hover .pi {
  color: #6b73ff;
}
</style>
