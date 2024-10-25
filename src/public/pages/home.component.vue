<template>
  <div class="home-container">
    <h1>Bienvenido a Quips</h1>

    <!-- Contenedor para las cards categorizadas -->
    <div class="category-overview">
      <CategoryCard
          title="Estadísticas de Ciclo"
          icon="fas fa-users"
          description="Resumen de las estadísticas de los ciclos"
          route="CycleStats"
      />
      <CategoryCard
          title="Estado de los Tokens"
          icon="fas fa-coins"
          description="Emisión y estado actual de los tokens"
          route="TokenStatus"
      />
      <CategoryCard
          title="Top Usuarios y Transacciones"
          icon="fas fa-chart-bar"
          description="Visualiza los tops de usuarios y transacciones"
          route="TopOverview"
      />
      <CategoryCard
          title="Actividad por Hora"
          icon="fas fa-chart-line"
          description="Gráfica de la actividad de transacciones por hora"
          route="TransactionActivity"
      />
      <!-- Nuevas cards -->
      <CategoryCard
          title="Línea de Tiempo de Fases"
          icon="fas fa-history"
          description="Visualiza la línea de tiempo de las fases"
          route="PhaseTimeline"
      />
      <CategoryCard
          title="Grafo de Transacciones"
          icon="fas fa-network-wired"
          description="Visualiza las transacciones en formato de grafo"
          route="TransactionGraph"
      />
    </div>
  </div>
</template>

<script>
import CategoryCard from '@/analytics/pages/CategoryCard.vue';

export default {
  components: {
    CategoryCard
  }
}
</script>

<style scoped>
.home-container {
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
}

.category-overview {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.category-overview > * {
  margin: 20px;
}
</style>
