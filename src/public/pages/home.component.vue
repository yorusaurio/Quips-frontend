<template>
  <div class="home-container">
    <h1>Bienvenido a Quips</h1>

    <!-- Contenedor para las estadísticas principales -->
    <div class="stats-overview">
      <CycleStats />
      <TokenStatus />
    </div>

    <!-- Contenedor para los gráficos -->
    <div class="charts-overview">
      <AnalyticsChart />
    </div>

    <!-- Contenedor para las tablas -->
    <div class="table-overview">
      <h2>Top Usuarios por Transacciones</h2>
      <TopUsersTable :users="topUsersByTransactions" />

      <h2>Top Senders</h2>
      <TopSendersTable :senders="topSenders" />

      <h2>Top Receivers</h2>
      <TopReceiversTable :receivers="topReceivers" />

      <h2>Top Referidos</h2>
      <TopReferralsTable :referrals="topReferrals" />
    </div>
  </div>
</template>

<script>
import CycleStats from '@/analytics/pages/CycleStats.vue';
import TokenStatus from '@/analytics/pages/TokenStatus.vue';
import AnalyticsChart from '@/analytics/pages/AnalyticsChart.vue';
import TopUsersTable from '@/analytics/pages/TopUsersTable.vue';
import TopSendersTable from '@/analytics/pages/TopSendersTable.vue';
import TopReceiversTable from '@/analytics/pages/TopReceiversTable.vue';
import TopReferralsTable from '@/analytics/pages/TopReferralsTable.vue';  // Importar componente
import AnalyticsService from '@/analytics/services/analyticsService';

export default {
  components: {
    CycleStats,
    TokenStatus,
    AnalyticsChart,
    TopUsersTable,
    TopSendersTable,
    TopReceiversTable,
    TopReferralsTable,  // Registrar componente
  },
  data() {
    return {
      topUsersByTransactions: [],
      topSenders: [],
      topReceivers: [],
      topReferrals: [],  // Añadir estado para referidos
      token: 'your-auth-token', // Esto debe ser dinámico
    };
  },
  mounted() {
    this.fetchTopUsersByTransactions();
    this.fetchTopSenders();
    this.fetchTopReceivers();
    this.fetchTopReferrals();  // Llamar al método de referidos
  },
  methods: {
    async fetchTopUsersByTransactions() {
      try {
        const response = await AnalyticsService.getTopUsersByTransactions(this.token);
        this.topUsersByTransactions = response.data;
      } catch (error) {
        console.error("Error al cargar los usuarios por transacciones: ", error.message);
      }
    },
    async fetchTopSenders() {
      try {
        const response = await AnalyticsService.getTopSenders(this.token);
        this.topSenders = response.data;
      } catch (error) {
        console.error("Error al cargar los Top Senders: ", error.message);
      }
    },
    async fetchTopReceivers() {
      try {
        const response = await AnalyticsService.getTopReceivers(this.token);
        this.topReceivers = response.data;
      } catch (error) {
        console.error("Error al cargar los Top Receivers: ", error.message);
      }
    },
    async fetchTopReferrals() {
      try {
        const response = await AnalyticsService.getTopUsersByReferrals(this.token);
        this.topReferrals = response.data;
      } catch (error) {
        console.error("Error al cargar los Top Referidos: ", error.message);
      }
    }
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

.table-overview {
  margin-top: 40px;
}

.charts-overview {
  display: flex;
  justify-content: center;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
