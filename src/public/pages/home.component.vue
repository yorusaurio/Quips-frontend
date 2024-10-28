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
          :color="'#ff7675'"
      />
      <CategoryCard
          title="Estado de los Tokens"
          icon="fas fa-coins"
          description="Emisión y estado actual de los tokens"
          route="TokenStatus"
          :color="'#74b9ff'"
      />
      <CategoryCard
          title="Top Usuarios y Transacciones"
          icon="fas fa-chart-bar"
          description="Visualiza los tops de usuarios y transacciones"
          route="TopOverview"
          :color="'#55efc4'"
      />
      <CategoryCard
          title="Actividad por Hora"
          icon="fas fa-chart-line"
          description="Gráfica de la actividad de transacciones por hora"
          route="TransactionActivity"
          :color="'#fdcb6e'"
      />
      <!-- Nuevas cards -->
      <CategoryCard
          title="Línea de Tiempo de Fases"
          icon="fas fa-history"
          description="Visualiza la línea de tiempo de las fases"
          route="PhaseTimeline"
          :color="'#a29bfe'"
      />
      <CategoryCard
          title="Grafo de Transacciones"
          icon="fas fa-network-wired"
          description="Visualiza las transacciones en formato de grafo"
          route="TransactionGraph"
          :color="'#e17055'"
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
  background: linear-gradient(135deg, #dfe6e9, #b2bec3);
  min-height: 100vh;
  color: #2d3436;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
  font-family: 'Roboto', sans-serif;
  font-size: 2.5rem;
  color: #2d3436;
}

.category-overview {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.category-overview > * {
  margin: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.category-overview > *:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
}
</style>
