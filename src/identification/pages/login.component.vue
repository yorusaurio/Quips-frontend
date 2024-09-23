<template>
  <div class="login p-card p-shadow-3">
    <h2 class="p-text-center">Iniciar Sesión</h2>
    <form @submit.prevent="login">
      <div class="form-group p-field">
        <label for="username">Nombre de usuario</label>
        <InputText
            type="text"
            id="username"
            v-model="username"
            placeholder="Ingresa tu nombre de usuario"
            class="w-full"
        />
      </div>

      <div class="form-group p-field">
        <label for="password">Contraseña</label>
        <InputText
            type="password"
            id="password"
            v-model="password"
            placeholder="Ingresa tu contraseña"
            class="w-full"
        />
      </div>

      <Button
          label="Iniciar Sesión"
          type="submit"
          class="w-full p-button-success"
          :loading="isLoading"
      />

      <p v-if="errorMessage" class="p-error p-text-center mt-4">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import userService from '@/identification/services/user.service';

export default {
  components: {
    InputText,
    Button,
  },
  data() {
    return {
      username: '',
      password: '',
      isLoading: false,
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      this.isLoading = true;
      this.errorMessage = '';

      try {
        const response = await userService.login(this.username, this.password);

        if (response.error) {
          this.errorMessage = response.error;
          this.isLoading = false;
          return;
        }

        const token = response.token;
        localStorage.setItem('token', token);
        const userInfo = await userService.getUserInfo(token);

        if (userInfo.error) {
          this.errorMessage = userInfo.error;
          this.isLoading = false;
          return;
        }

        const isAdmin = userInfo.roles.includes('ROLE_ADMIN');
        if (isAdmin) {
          this.$router.push('/home');
        } else {
          this.errorMessage = 'No tienes permisos para acceder a esta página.';
        }
      } catch (error) {
        this.errorMessage = `Ocurrió un error inesperado: ${error.message || error}`;
        console.error('Detalles del error:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 10px;
}

.form-group {
  margin-bottom: 1.5rem;
}

.p-error {
  color: red;
}
</style>
