<template>
  <div class="analytics-card">
    <h2>Analytics</h2> <!-- Título sencillo sin ícono -->
    <div id="chart" class="chart-container"></div>
    <div v-if="loading">Cargando datos...</div>
    <div v-if="error" class="error-message">{{ error }}</div>
    <div class="chart-legend">
      <div class="legend-item">
        <span class="color-sale legend-bar"></span>
        <span>Jugadores en Fase</span>
      </div>
      <div class="legend-item">
        <span class="color-distribute legend-bar"></span>
        <span>Cuota de Fase Actual</span>
      </div>
      <div class="legend-item">
        <span class="color-return legend-bar"></span>
        <span>Porcentaje Completado</span>
      </div>
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
            fontSize: 28, // Ajustamos el tamaño de la fuente para dispositivos pequeños
            fontWeight: 'bold',
            color: '#333'
          },
          subtextStyle: {
            fontSize: 14,
            color: '#666'
          }
        },
        series: [
          {
            name: 'Jugadores en Fase',
            type: 'pie',
            radius: ['50%', '70%'], // Reducimos el tamaño del gráfico
            avoidLabelOverlap: false,
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            animationDuration: 1500, // Animación al cargar
            data: [
              { value: this.cycleData.jugadoresEnFase, name: 'Jugadores en Fase', itemStyle: { color: '#4b9eff' } },
              { value: this.cycleData.cuotaFaseActual - this.cycleData.jugadoresEnFase, name: 'Restante', itemStyle: { color: '#ffd466' } },
            ]
          }
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        }
      };

      this.chartInstance.setOption(option);
    },
    async fetchCycleData() {
      const token = 'your-auth-token'; // Asegúrate de obtener el token adecuado
      try {
        const response = await AnalyticsService.getCycleStatus(token);
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
  font-family: 'Arial', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f4f4f9;
}

.analytics-card {
  background: linear-gradient(135deg, rgba(75, 158, 255, 0.1), rgba(75, 158, 255, 0)); /* Azul más suave */
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 25px;
  text-align: center;
  width: 100%;
  max-width: 360px;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Efecto de transición para hover */
}

.analytics-card:hover {
  transform: translateY(-10px); /* Efecto de levantar la tarjeta */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2); /* Sombra más intensa al hacer hover */
}

h2 {
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;
}

.chart-container {
  width: 280px; /* Tamaño reducido del gráfico */
  height: 280px;
  margin: 0 auto;
}

.chart-legend {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  text-align: center;
}

.legend-item {
  display: flex;
  align-items: center;
}

.legend-bar {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 5px;
  border-radius: 50%; /* Cambiamos a círculos para más estilo */
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

@media (max-width: 600px) {
  .analytics-card {
    padding: 20px;
  }

  h2 {
    font-size: 16px;
  }

  .chart-container {
    width: 220px; /* Ajuste para pantallas pequeñas */
    height: 220px;
  }

  .chart-legend {
    flex-direction: column; /* Poner la leyenda en columnas en lugar de en fila */
    align-items: flex-start;
  }

  .legend-item {
    margin-bottom: 8px;
  }
}
</style>
