<template>
  <div class="token-status-container">
    <!-- Tarjeta para Tokens Emitidos -->
    <div class="token-card emitted">
      <div class="token-info">
        <h3>Tokens Emitidos</h3>
        <h2>{{ tokensEmitidos }}</h2>
        <p>Estado general del sistema</p>
      </div>
    </div>

    <!-- Tarjeta para Tokens en Circulación -->
    <div class="token-card circulating">
      <div class="token-info">
        <h3>Tokens en Circulación</h3>
        <h2>{{ tokensEnCirculacion }}</h2>
        <p>Tokens usados actualmente</p>
      </div>
      <div class="token-chart">
        <div id="circulation-chart" class="chart"></div>
      </div>
    </div>

    <!-- Tarjeta para Tokens Restantes -->
    <div class="token-card remaining">
      <div class="token-info">
        <h3>Tokens Restantes</h3>
        <h2>{{ tokensRestantes }}</h2>
        <p>Tokens disponibles</p>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import AnalyticsService from '@/analytics/services/analyticsService';  // Importamos el servicio

export default {
  name: 'TokenStatus',
  data() {
    return {
      tokensEmitidos: 0,
      tokensEnCirculacion: 0,
      tokensRestantes: 0,
      error: null,
    };
  },
  mounted() {
    this.fetchTokenStatus();
  },
  methods: {
    async fetchTokenStatus() {
      const token = 'your-auth-token';  // Asegúrate de obtener el token adecuado
      try {
        const response = await AnalyticsService.getTokenStatus(token);
        this.tokensEmitidos = response.data.tokensEmitidos;
        this.tokensEnCirculacion = response.data.tokensEnCirculacion;
        this.tokensRestantes = response.data.tokensRestantes;
        this.initChart();
      } catch (error) {
        console.error('Error al cargar el estado de los tokens: ', error.response || error.message);
        this.error = `Error al cargar los datos: ${error.response?.data?.message || error.message}`;
      }
    },
    initChart() {
      const chartDom = document.getElementById('circulation-chart');
      const myChart = echarts.init(chartDom);

      const option = {
        series: [
          {
            name: 'Tokens en Circulación',
            type: 'pie',
            radius: ['70%', '90%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: this.tokensEnCirculacion,
                name: 'En Circulación',
                itemStyle: { color: '#007bff' },  // Color azul para tokens en circulación
              },
              {
                value: this.tokensRestantes,
                name: 'Restantes',
                itemStyle: { color: '#f8d32d' },  // Color amarillo para tokens restantes
              },
            ],
          },
        ],
      };

      myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
.token-status-container {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  gap: 20px;  /* Espacio entre las tarjetas */
}

.token-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 250px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.token-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.token-info h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #6c757d;
}

.token-info h2 {
  font-size: 28px;
  color: #333;
}

.token-info p {
  font-size: 14px;
  color: #6c757d;
}

.token-chart {
  margin-top: 15px;
}

.chart {
  width: 100px;
  height: 100px;
}

.emitted {
  background-color: #e3f2fd;  /* Fondo suave azul claro */
}

.circulating {
  background-color: #e0f7fa;  /* Fondo suave cian */
}

.remaining {
  background-color: #fff9c4;  /* Fondo suave amarillo */
}

@media (max-width: 768px) {
  .token-status-container {
    flex-direction: column;
    align-items: center;
  }

  .token-card {
    width: 80%;
    margin-bottom: 20px;
  }
}
</style>
