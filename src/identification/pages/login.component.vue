<template>
  <div class="login-container">
    <transition name="fade">
      <div class="login-card" v-if="!isLoggedIn">
        <div class="logo-container">
          <img src="@/identification/addons/logo.jpg" alt="Logo" class="logo-placeholder" />
        </div>
        <transition name="slide-fade">
          <h2 class="login-title" v-if="!isLoading">Iniciar Sesión</h2>
        </transition>
        <form @submit.prevent="login">
          <div class="form-group">
            <input
                type="text"
                id="username"
                v-model="username"
                placeholder="Usuario"
                class="input-field"
            />
          </div>
          <div class="form-group">
            <input
                type="password"
                id="password"
                v-model="password"
                placeholder="Contraseña"
                class="input-field"
            />
          </div>

          <transition name="bounce">
            <button
                type="submit"
                class="login-button"
                :disabled="isLoading"
            >
              <span v-if="!isLoading">Iniciar Sesión</span>
              <span v-else class="loading-dots">...</span>
            </button>
          </transition>

          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
      </div>
    </transition>

    <transition name="fade">
      <div class="welcome-message" v-if="isLoggedIn">
        <h2>¡Bienvenido a Quip!</h2>
      </div>
    </transition>
  </div>
</template>

<script>
import userService from '@/identification/services/user.service';

export default {
  data() {
    return {
      username: '',
      password: '',
      isLoading: false,
      errorMessage: '',
      isLoggedIn: false
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

        this.isLoggedIn = true;
        setTimeout(() => {
          this.$router.push('/home');
        }, 1000); // Simulación de transición suave
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
/* Contenedor general del login */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
  transition: background 0.6s ease-in-out;
}

.login-card {
  background-color: #fff;
  border-radius: 15px;
  padding: 40px;
  max-width: 360px;
  width: 100%;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease-in-out;
}

.logo-container {
  margin-bottom: 20px;
}

.logo-placeholder {
  width: 90px;
  height: 90px;
}

.login-title {
  margin-bottom: 30px;
  font-size: 22px;
  font-weight: 600;
}

.form-group {
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input-field:focus {
  border-color: #74ebd5;
  box-shadow: 0 0 8px rgba(116, 235, 213, 0.3);
  outline: none;
}

/* Botón de login con animación */
.login-button {
  width: 100%;
  padding: 12px;
  background-color: #2ecc71;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.login-button:hover:not(:disabled) {
  background-color: #27ae60;
  transform: translateY(-3px);
}

.loading-dots::after {
  content: '...';
  animation: loadingDots 1s infinite;
}

@keyframes loadingDots {
  0% {
    content: '';
  }
  33% {
    content: '.';
  }
  66% {
    content: '..';
  }
  100% {
    content: '...';
  }
}

/* Mensaje de error */
.error-message {
  margin-top: 15px;
  color: #e74c3c;
}

/* Animaciones */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}

.bounce-enter-active {
  animation: bounceIn 0.6s;
}

@keyframes bounceIn {
  0%, 20%, 40%, 60%, 80%, 100% {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }

  100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}
</style>
