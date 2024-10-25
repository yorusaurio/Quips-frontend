<template>
  <div class="timeline-container">
    <h2>Línea de Tiempo de Fases</h2>
    <div v-if="loading">Cargando datos...</div>
    <div v-if="error" class="error-message">{{ error }}</div>
    <ul v-if="timeline.length > 0">
      <li v-for="(item, index) in timeline" :key="index" class="timeline-item">
        <div class="phase-badge">Fase {{ item.faseInicio }}</div>
        <div class="user-info">
          <strong>Usuario:</strong> {{ item.usuario }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import AnalyticsService from "@/analytics/services/analyticsService";

export default {
  name: "PhaseTimeline",
  data() {
    return {
      timeline: [],
      loading: true,
      error: null,
      token: 'your-auth-token', // Actualiza este token con el valor adecuado
    };
  },
  mounted() {
    this.fetchPhaseTimeline();
  },
  methods: {
    async fetchPhaseTimeline() {
      try {
        const response = await AnalyticsService.getPhaseTimeline(this.token);
        this.timeline = response.data;
        this.loading = false;
      } catch (error) {
        console.error("Error al cargar la línea de tiempo: ", error);
        this.error = `Error al cargar los datos: ${error.response?.data?.message || error.message}`;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.timeline-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

ul {
  list-style-type: none;
  padding: 0;
}

.timeline-item {
  margin-bottom: 20px;
  padding: 15px;
  border-left: 4px solid #4b9eff;
  position: relative;
  background: #f9f9f9;
  border-radius: 10px;
}

.timeline-item:before {
  content: '';
  position: absolute;
  left: -10px;
  top: 20px;
  width: 20px;
  height: 20px;
  background-color: #4b9eff;
  border-radius: 50%;
  border: 3px solid #fff;
}

.phase-badge {
  font-weight: bold;
  margin-bottom: 5px;
}

.user-info {
  color: #666;
}

.error-message {
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
}
</style>
