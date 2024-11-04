<template>
  <div class="stats-container">
    <!-- Jugadores en Fase -->
    <div class="stat-card jugadores" @click="goToPlayersList">
      <div class="stat-icon icon-jugadores">
        <i class="fas fa-users"></i> <!-- Icono para jugadores -->
      </div>
      <div class="stat-info">
        <h2>{{ jugadoresEnFase }}</h2>
        <p>Jugadores en Fase</p>
      </div>
    </div>

    <!-- Fase Actual -->
    <div class="stat-card fase">
      <div class="stat-icon icon-fase">
        <i class="fas fa-flag-checkered"></i> <!-- Icono para fase -->
      </div>
      <div class="stat-info">
        <h2>{{ faseActual }}</h2>
        <p>Fase Actual</p>
      </div>
    </div>
  </div>
</template>

<script>
import AnalyticsService from "@/analytics/services/analyticsService";

export default {
  name: 'CycleStats',
  data() {
    return {
      jugadoresEnFase: 0,
      faseActual: 0,
      error: null,
      token: 'your-auth-token' // Asegúrate de obtener el token adecuado
    };
  },
  mounted() {
    this.fetchCycleData();
  },
  methods: {
    async fetchCycleData() {
      try {
        const response = await AnalyticsService.getCycleStatus(this.token);
        this.jugadoresEnFase = response.data.jugadoresEnFase;
        this.faseActual = response.data.faseActual;
      } catch (error) {
        console.error("Error al cargar los datos del ciclo: ", error.response || error.message);
        this.error = `Error al cargar los datos: ${error.response?.data?.message || error.message}`;
      }
    },
    goToPlayersList() {
      this.$router.push('/players-list');
    }
  }
};
</script>

<style scoped>
.stats-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
}

.stat-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 30px 20px;
  width: 180px;
  text-align: center;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.stat-card:before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
  transform: rotate(45deg);
  opacity: 0.5;
  pointer-events: none;
}

.stat-icon {
  font-size: 50px;
  margin-bottom: 15px;
  color: inherit;
}

.icon-jugadores {
  color: #4b9eff;
}

.icon-fase {
  color: #ffd466;
}

.stat-info h2 {
  font-size: 30px;
  margin: 0;
  color: #333;
  font-weight: 600;
}

.stat-info p {
  margin: 0;
  font-size: 16px;
  color: #666;
  font-weight: 400;
}

/* Efectos de fondo para las tarjetas */
.jugadores {
  background: linear-gradient(135deg, rgba(75, 158, 255, 0.1), rgba(75, 158, 255, 0));
}

.fase {
  background: linear-gradient(135deg, rgba(255, 212, 102, 0.1), rgba(255, 212, 102, 0));
}

@media (max-width: 768px) {
  .stats-container {
    flex-direction: column;
    align-items: center;
  }

  .stat-card {
    width: 90%;
    margin-bottom: 20px;
  }
}
</style>
