<template>
  <div>
    <TransactionActivityChart :transactionData="transactionData" />
  </div>
</template>

<script>
import TransactionActivityChart from './TransactionActivityChart.vue';
import AnalyticsService from '@/analytics/services/analyticsService';

export default {
  components: {
    TransactionActivityChart
  },
  data() {
    return {
      transactionData: {}, // Aquí se almacenarán los datos de la actividad de transacciones
      token: 'your-auth-token' // Reemplaza esto por la manera en que obtienes el token
    };
  },
  mounted() {
    this.fetchTransactionActivity(); // Llamamos a la API al montar el componente
  },
  methods: {
    async fetchTransactionActivity() {
      try {
        const response = await AnalyticsService.getTransactionActivityByHour(this.token);
        this.transactionData = response.data; // Asigna los datos obtenidos
      } catch (error) {
        console.error('Error al obtener la actividad de transacciones:', error);
      }
    }
  }
};
</script>
