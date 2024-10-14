<template>
  <div class="analytics-card">
    <h2>Analytics</h2>
    <div id="chart" class="chart-container"></div>
    <div v-if="loading">Cargando datos...</div>
    <div v-if="error" class="error-message">{{ error }}</div>
    <div class="chart-legend">
      <div><span class="color-sale"></span> Jugadores en Fase</div>
      <div><span class="color-distribute"></span> Cuota de Fase Actual</div>
      <div><span class="color-return"></span> Porcentaje Completado</div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import AnalyticsService from "@/analytics/services/analyticsService";

export default {
  name: 'AnalyticsChart',
  data() {
    return {
      chartInstance: null,
      loading: true,
      error: null,
      cycleData: {
        jugadoresEnFase: 0,
        cuotaFaseActual: 0,
        porcentajeCompletado: 0,
        faseActual: 0,
      }
    };
  },
  mounted() {
    this.fetchCycleData();
  },
  methods: {
    initChart() {
      const { porcentajeCompletado } = this.cycleData;

      var option = {
        title: {
          text: `${porcentajeCompletado}%`,
          subtext: 'Completado',
          left: '50%',
          top: '40%',
          textAlign: 'center',
          textStyle: {
            fontSize: 30,
            fontWeight: 'bold',
            color: '#333'
          },
          subtextStyle: {
            fontSize: 16,
            color: '#666'
          }
        },
        series: [
          {
            name: 'Transactions',
            type: 'pie',
            radius: ['60%', '80%'],
            avoidLabelOverlap: false,
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.cycleData.jugadoresEnFase, name: 'Jugadores en Fase', itemStyle: { color: '#4b9eff' } },
              { value: this.cycleData.cuotaFaseActual - this.cycleData.jugadoresEnFase, name: 'Restante', itemStyle: { color: '#ffd466' } },
            ]
          }
        ]
      };

      this.chartInstance.setOption(option);
    },
    async fetchCycleData() {
      const token = 'your-auth-token'; // Asegúrate de obtener el token adecuado
      try {
        const response = await AnalyticsService.getCycleStatus(token);
        console.log("Datos recibidos del ciclo: ", response.data);
        this.cycleData = response.data;
        this.loading = false;
        this.$nextTick(() => {
          this.chartInstance = echarts.init(document.getElementById('chart'));
          this.initChart();
        });
      } catch (error) {
        console.error("Error al cargar los datos del ciclo: ", error.response || error.message);
        this.error = `Error al cargar los datos: ${error.response?.data?.message || error.message}`;
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f4f4f9;
}

.analytics-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  width: 340px;
}

h2 {
  font-size: 16px;
  margin-bottom: 20px;
  color: #333;
}

.chart-container {
  width: 300px;
  height: 300px;
  margin: 0 auto;
}

.chart-legend {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}

.chart-legend div {
  display: flex;
  align-items: center;
}

.chart-legend span {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 8px;
  border-radius: 50%;
}

.color-sale {
  background-color: #4b9eff;
}

.color-distribute {
  background-color: #ffd466;
}

.color-return {
  background-color: #ff8a66;
}

.error-message {
  color: red;
  font-size: 14px;
}
</style>
