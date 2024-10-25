<template>
  <div class="top-overview">
    <h2>Top de Usuarios y Transacciones</h2>

    <h3>Top Usuarios por Transacciones</h3>
    <TopUsersTable :users="topUsersByTransactions" />

    <h3>Top Enviados</h3>
    <TopSendersTable :senders="topSenders" />

    <h3>Top Recibidos</h3>
    <TopReceiversTable :receivers="topReceivers" />

    <h3>Top Referidos</h3>
    <TopReferralsTable :referrals="topReferrals" />
  </div>
</template>

<script>
import TopUsersTable from '@/analytics/pages/TopUsersTable.vue';
import TopSendersTable from '@/analytics/pages/TopSendersTable.vue';
import TopReceiversTable from '@/analytics/pages/TopReceiversTable.vue';
import TopReferralsTable from '@/analytics/pages/TopReferralsTable.vue';
import AnalyticsService from '@/analytics/services/analyticsService';

export default {
  components: {
    TopUsersTable,
    TopSendersTable,
    TopReceiversTable,
    TopReferralsTable
  },
  data() {
    return {
      topUsersByTransactions: [],
      topSenders: [],
      topReceivers: [],
      topReferrals: [],
      token: 'your-auth-token', // Reemplaza esto con la lógica adecuada para el token
    };
  },
  mounted() {
    this.fetchTopUsersByTransactions();
    this.fetchTopSenders();
    this.fetchTopReceivers();
    this.fetchTopReferrals();
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
        this.topReferrals = response.data.filter(referral => referral.totalReferrals > 0);
      } catch (error) {
        console.error("Error al cargar los Top Referidos: ", error.message);
      }
    }
  }
};
</script>

<style scoped>
.top-overview {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

h3 {
  margin-top: 30px;
  margin-bottom: 15px;
}
</style>
