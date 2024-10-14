<template>
  <div class="home-container">
    <h1>Bienvenido a Quips</h1>
    <p>Aquí se mostrará la información que luego implementarás.</p>

    <!-- Contenedor para las estadísticas principales -->
    <div class="stats-overview">
      <CycleStats />
      <TokenStatus />  <!-- Agregamos el componente TokenStatus aquí -->
    </div>

    <!-- Contenedor para los gráficos -->
    <div class="charts-overview">
      <AnalyticsChart />
    </div>
  </div>
</template>

<script>
import AnalyticsChart from '@/analytics/pages/AnalyticsChart.vue';
import CycleStats from '@/analytics/pages/CycleStats.vue';
import TokenStatus from '@/analytics/pages/TokenStatus.vue';  // Importamos TokenStatus

export default {
  components: {
    AnalyticsChart,
    CycleStats,
    TokenStatus  // Registramos TokenStatus
  }
};
</script>

<style scoped>
.home-container {
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
}

p {
  text-align: center;
  color: #777;
  margin-bottom: 30px;
}

.stats-overview {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.charts-overview {
  display: flex;
  justify-content: center;
}

/* Añadir un estilo más responsivo si es necesario */
@media (min-width: 768px) {
  .home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stats-overview {
    display: flex;
    justify-content: space-around;
    width: 80%;
  }

  .charts-overview {
    width: 80%;
  }
}
</style>
