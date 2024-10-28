<template>
  <div class="token-card-circulation">
    <div class="token-info-circulation">
      <h3>Tokens en Circulación</h3>
      <h2>{{ tokensEnCirculacion }}</h2>
      <p>Tokens usados actualmente</p>
    </div>
    <div class="token-chart-large">
      <div id="circulation-chart-large" class="chart-large"></div>
      <div class="chart-label-large">
        <!-- Verifica si tokenProgress es un número válido -->
        {{ isNaN(tokenProgress) || tokenProgress <= 0 ? '0.0' : tokenProgress.toFixed(1) }}%
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'TokenCirculation',
  props: {
    tokensEnCirculacion: {
      type: Number,
      default: 0,
    },
    tokensEmitidos: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      tokenProgress: 0,
      chartInstance: null, // Guardar referencia del gráfico
      error: null,
    };
  },
  watch: {
    tokensEnCirculacion: 'calculateProgress', // Verifica si cambian los valores
    tokensEmitidos: 'calculateProgress',
  },
  mounted() {
    this.calculateProgress();
    this.initChartLarge();
  },
  methods: {
    calculateProgress() {
      try {
        if (typeof this.tokensEnCirculacion === 'undefined' || typeof this.tokensEmitidos === 'undefined') {
          throw new Error('Datos indefinidos: tokensEnCirculacion o tokensEmitidos');
        }

        console.log('Tokens Emitidos:', this.tokensEmitidos);
        console.log('Tokens en Circulación:', this.tokensEnCirculacion);

        if (this.tokensEmitidos > 0) {
          this.tokenProgress = (this.tokensEnCirculacion / this.tokensEmitidos) * 100;
          console.log('Progreso de Tokens:', this.tokenProgress);
        } else {
          console.warn('Los tokens emitidos son 0 o indefinidos.');
          this.tokenProgress = 0;
        }

        this.updateChartLarge(); // Actualizar el gráfico cuando cambian los valores

      } catch (error) {
        console.error('Error al calcular el progreso:', error.message);
        this.error = error.message;
      }
    },
    initChartLarge() {
      const chartDom = document.getElementById('circulation-chart-large');
      if (!chartDom) {
        console.error('No se encontró el elemento del gráfico');
        return;
      }

      this.chartInstance = echarts.init(chartDom);

      const option = this.getChartOptions();
      this.chartInstance.setOption(option);
    },
    updateChartLarge() {
      if (this.chartInstance) {
        const option = this.getChartOptions();
        this.chartInstance.setOption(option);
      }
    },
    getChartOptions() {
      return {
        series: [
          {
            name: 'Tokens en Circulación',
            type: 'pie',
            radius: ['60%', '90%'],
            avoidLabelOverlap: false,
            label: { show: false },
            labelLine: { show: false },
            data: [
              {
                value: this.tokensEnCirculacion,
                name: 'En Circulación',
                itemStyle: { color: '#007bff' },
              },
              {
                value: this.tokensEmitidos - this.tokensEnCirculacion,
                name: 'Restantes',
                itemStyle: { color: '#f8d32d' },
              },
            ],
          },
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
      };
    },
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.dispose(); // Elimina la instancia del gráfico al destruir el componente
    }
  },
};
</script>

<style scoped>
.token-card-circulation {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 450px; /* Tamaño más grande */
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.token-chart-large {
  position: relative;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart-large {
  width: 250px;
  height: 250px;
}

.chart-label-large {
  position: absolute;
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
}
</style>
