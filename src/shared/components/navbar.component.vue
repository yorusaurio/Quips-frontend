<template>
  <div>
    <Menubar :model="items" />
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
      items: [
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
        },
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
.menubar {
  background-color: #2ECC71;
  color: white;
}

.menubar .p-menubar {
  padding: 10px;
}

.menubar .p-menubar a {
  color: white;
  text-decoration: none;
}

.menubar .p-menubar a:hover {
  text-decoration: underline;
}
</style>
