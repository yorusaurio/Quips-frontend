<template>
  <div class="profile-container p-m-4">
    <Card>
      <template #header>
        <h2 class="p-text-center">Mi Perfil</h2>
      </template>

      <template #content>
        <!-- Verificamos si userProfile tiene datos antes de mostrar -->
        <div v-if="userProfile && userProfile.firstName">
          <div class="profile-details">
            <p><strong>Nombre:</strong> {{ userProfile.firstName }} {{ userProfile.lastName }}</p>
            <p><strong>Nombre de usuario:</strong> {{ userProfile.username }}</p>
            <p><strong>Email:</strong> {{ userProfile.email }}</p>
            <p><strong>Teléfono:</strong> {{ userProfile.phoneNumber || 'No disponible' }}</p>
            <p><strong>Monedas:</strong> {{ userProfile.coins }}</p>
            <p><strong>Roles:</strong> {{ userProfile.roles.join(', ') }}</p>
            <p><strong>Estado de cuenta:</strong> {{ userProfile.active ? 'Activa' : 'Inactiva' }}</p>
          </div>
        </div>
        <div v-else>
          <p>Cargando información del perfil...</p>
        </div>
      </template>

      <template #footer>
        <Button label="Actualizar Información" icon="pi pi-refresh" class="p-button-primary" />
      </template>
    </Card>
  </div>
</template>

<script>
import Card from 'primevue/card';
import Button from 'primevue/button';
import userService from '@/identification/services/user.service'; // Importa el servicio

export default {
  components: {
    Card,
    Button,
  },
  data() {
    return {
      userProfile: null, // Inicializamos como null para evitar el error
      errorMessage: '',
    };
  },
  methods: {
    async fetchUserProfile() {
      try {
        const token = localStorage.getItem('token');
        const response = await userService.getUserInfo(token); // Obtenemos la información del usuario
        this.userProfile = response; // Asignamos directamente la respuesta
      } catch (error) {
        this.errorMessage = 'Error al cargar los datos del perfil.';
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchUserProfile(); // Llamamos al método al montar el componente
  },
};
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.profile-details {
  font-size: 16px;
  margin-bottom: 20px;
}

.profile-details p {
  margin: 10px 0;
}
</style>
