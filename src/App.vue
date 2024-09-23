<template>
  <div id="app">
    <!-- Mostrar Menubar excepto en las rutas de login y registro -->
    <NavBar v-if="!hideNavBar" />
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/shared/components/navbar.component.vue'

export default {
  components: {
    NavBar,
  },
  computed: {
    hideNavBar() {
      // Ocultar NavBar en las rutas de login y registro
      const routesWithoutNavBar = ['/login'];
      return routesWithoutNavBar.includes(this.$route.path);
    },
  },
};
</script>
