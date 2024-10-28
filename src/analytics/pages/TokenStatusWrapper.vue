<template>
  <div class="token-status-wrapper">
    <!-- Contenedor para los apartados de tokens -->
    <div class="token-status-row">
      <TokenCard :title="'Tokens Emitidos'" :value="tokensEmitidos" :icon="'fas fa-coins'" :bgColor="'#e3f2fd'" />
      <TokenCirculation :tokensEnCirculacion="tokensEnCirculacion" :tokensEmitidos="tokensEmitidos" />
      <TokenCard :title="'Tokens Restantes'" :value="tokensRestantes" :icon="'fas fa-wallet'" :bgColor="'#fff9c4'" />
    </div>
  </div>
</template>

<script>
import TokenCard from "@/analytics/pages/TokenCard.vue";
import TokenCirculation from "@/analytics/pages/TokenCirculation.vue";
import AnalyticsService from '@/analytics/services/analyticsService'; // Importamos el servicio

export default {
  name: 'TokenStatusWrapper',
  components: { TokenCirculation, TokenCard },
  data() {
    return {
      tokensEmitidos: 0,
      tokensEnCirculacion: 0,
      tokensRestantes: 0,
      tokenProgress: 0,
      error: null, // Variable para capturar errores
    };
  },
  mounted() {
    this.fetchTokenStatus();
  },
  methods: {
    async fetchTokenStatus() {
      const token = 'your-auth-token'; // Asegúrate de obtener el token adecuado
      try {
        // Intenta obtener los datos del servicio
        const response = await AnalyticsService.getTokenStatus(token);

        // Verifica si los datos están correctamente definidos
        if (!response || !response.data) {
          throw new Error("No se recibieron datos del servidor.");
        }

        // Asigna los valores obtenidos desde el servidor
        this.tokensEmitidos = response.data.tokensEmitidos || 0;
        this.tokensEnCirculacion = response.data.tokensEnCirculacion || 0;
        this.tokensRestantes = response.data.tokensRestantes || 0;

        // Muestra los valores en la consola para fines de diagnóstico
        console.log('Tokens Emitidos:', this.tokensEmitidos);
        console.log('Tokens en Circulación:', this.tokensEnCirculacion);
        console.log('Tokens Restantes:', this.tokensRestantes);

        // Calcula el progreso de tokens
        this.tokenProgress = (this.tokensEnCirculacion / this.tokensEmitidos) * 100;

      } catch (error) {
        // Captura cualquier error que ocurra durante la solicitud
        console.error('Error al cargar el estado de los tokens:', error);
        this.error = `Error al cargar los datos: ${error.message}`;
      }
    },
  },
};
</script>

<style scoped>
.token-status-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
}

.token-status-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Distribuir 3 columnas iguales */
  gap: 20px; /* Espacio entre las tarjetas */
  justify-items: center; /* Asegura que las tarjetas estén centradas */
}

.token-card,
.token-card-circulation {
  width: 250px; /* Asegura que todas las tarjetas tengan el mismo ancho */
  margin: 0 auto; /* Centra las tarjetas dentro de la grilla */
  padding: 20px;
  text-align: center;
}

@media (max-width: 768px) {
  .token-status-row {
    grid-template-columns: 1fr; /* Ajuste responsivo para pantallas más pequeñas */
  }
}
</style>
