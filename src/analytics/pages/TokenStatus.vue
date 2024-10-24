<template>
  <div class="token-status-container">
    <!-- Tarjeta para Tokens Emitidos -->
    <div class="token-card emitted">
      <div class="token-icon">
        <i class="fas fa-coins fa-icon"></i> <!-- Icono para Tokens Emitidos -->
      </div>
      <div class="token-info">
        <h3>Tokens Emitidos</h3>
        <h2>{{ tokensEmitidos }}</h2>
        <p>Estado general del sistema</p>
      </div>
    </div>

    <!-- Tarjeta para Tokens en Circulación -->
    <div class="token-card-circulation"> <!-- Nueva clase para el card de circulación -->
      <div class="token-info-circulation">
        <h3>Tokens en Circulación</h3>
        <h2>{{ tokensEnCirculacion }}</h2>
        <p>Tokens usados actualmente</p>
      </div>
      <div class="token-chart-large"> <!-- Gráfico más grande -->
        <div id="circulation-chart-large" class="chart-large"></div>
        <div class="chart-label-large">{{ tokenProgress.toFixed(1) }}%</div> <!-- Indicador central más grande -->
      </div>
    </div>

    <!-- Tarjeta para Tokens Restantes -->
    <div class="token-card remaining">
      <div class="token-icon">
        <i class="fas fa-wallet fa-icon"></i> <!-- Icono para Tokens Restantes -->
      </div>
      <div class="token-info">
        <h3>Tokens Restantes</h3>
        <h2>{{ tokensRestantes }}</h2>
        <p>Tokens disponibles</p>
      </div>
      <div class="progress-bar">
        <div class="progress" :style="{ width: tokenProgress + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import AnalyticsService from '@/analytics/services/analyticsService'; // Importamos el servicio

export default {
  name: 'TokenStatus',
  data() {
    return {
      tokensEmitidos: 0,
      tokensEnCirculacion: 0,
      tokensRestantes: 0,
      tokenProgress: 0,
      error: null,
    };
  },
  mounted() {
    this.fetchTokenStatus();
  },
  methods: {
    async fetchTokenStatus() {
      const token = 'your-auth-token'; // Asegúrate de obtener el token adecuado
      try {
        const response = await AnalyticsService.getTokenStatus(token);
        this.tokensEmitidos = response.data.tokensEmitidos;
        this.tokensEnCirculacion = response.data.tokensEnCirculacion;
        this.tokensRestantes = response.data.tokensRestantes;
        this.tokenProgress = (this.tokensEnCirculacion / this.tokensEmitidos) * 100;
        this.initChartLarge();
      } catch (error) {
        console.error('Error al cargar el estado de los tokens: ', error.response || error.message);
        this.error = `Error al cargar los datos: ${error.response?.data?.message || error.message}`;
      }
    },
    initChartLarge() {
      const chartDom = document.getElementById('circulation-chart-large');
      const myChart = echarts.init(chartDom);

      const option = {
        series: [
          {
            name: 'Tokens en Circulación',
            type: 'pie',
            radius: ['60%', '90%'], // Gráfico más grande
            avoidLabelOverlap: false,
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            animationDuration: 1500, // Duración de la animación
            data: [
              {
                value: this.tokensEnCirculacion,
                name: 'En Circulación',
                itemStyle: { color: '#007bff' }, // Color azul para tokens en circulación
              },
              {
                value: this.tokensRestantes,
                name: 'Restantes',
                itemStyle: { color: '#f8d32d' }, // Color amarillo para tokens restantes
              },
            ],
          },
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
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
  margin: 30px 0;
  gap: 20px; /* Espacio entre las tarjetas */
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

.token-card-circulation { /* Card más grande para el gráfico de circulación */
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 450px; /* Aumentar el ancho */
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.token-card-circulation:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.token-icon {
  font-size: 40px;
  margin-bottom: 10px;
}

.fa-icon {
  color: #007bff; /* Color para los íconos de FontAwesome */
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

.token-chart-large {
  position: relative;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart-large {
  width: 200px; /* Tamaño más grande del gráfico */
  height: 200px;
}

.chart-label-large {
  position: absolute;
  font-size: 24px; /* Tamaño de letra más grande */
  font-weight: bold;
  color: #007bff;
}

.progress-bar {
  width: 100%;
  background-color: #f3f3f3;
  border-radius: 5px;
  margin-top: 20px;
  height: 10px;
}

.progress {
  background-color: #007bff;
  height: 100%;
  border-radius: 5px;
  transition: width 0.4s ease;
}

.emitted {
  background-color: #e3f2fd; /* Fondo suave azul claro */
}

.circulating {
  background-color: #e0f7fa; /* Fondo suave cian */
}

.remaining {
  background-color: #fff9c4; /* Fondo suave amarillo */
}

@media (max-width: 768px) {
  .token-status-container {
    flex-direction: column;
    align-items: center;
  }

  .token-card,
  .token-card-circulation { /* Asegurar que los cards sean responsivos */
    width: 80%;
    margin-bottom: 20px;
  }
}
</style>
