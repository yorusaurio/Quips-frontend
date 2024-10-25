<template>
  <div class="transaction-activity-chart">
    <div ref="chart" class="chart-container"></div>
    <!-- Mostrar mensaje si no hay datos -->
    <div v-if="!hasData" class="no-data-message">
      No hay datos disponibles para mostrar.
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  props: {
    transactionData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      hasData: true, // Controla si hay datos para mostrar
    };
  },
  watch: {
    transactionData: {
      immediate: true,
      handler(newData) {
        console.log("Datos recibidos:", newData);  // Verificación de datos en consola
        if (newData && Object.keys(newData).length > 0) {
          this.hasData = true;
          this.renderChart();
        } else {
          this.hasData = false;
        }
      }
    }
  },
  methods: {
    renderChart() {
      if (!this.hasData) return; // Si no hay datos, no renderizamos

      try {
        const chart = echarts.init(this.$refs.chart);
        const labels = Object.keys(this.transactionData);

        // Ordenar las horas
        const sortedLabels = labels.sort((a, b) => {
          const [hourA, minuteA] = a.split(':').map(Number);
          const [hourB, minuteB] = b.split(':').map(Number);
          return hourA - hourB || minuteA - minuteB;
        });

        const data = sortedLabels.map(label => this.transactionData[label]);

        const options = {
          title: {
            text: 'Actividad de Transacciones por Hora',
            left: 'center',
            textStyle: {
              fontSize: 18,
              fontWeight: 'bold',
              fontFamily: 'Roboto, sans-serif'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: '{b0}: {c0} transacciones'
          },
          xAxis: {
            type: 'category',
            data: sortedLabels,
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            },
            axisLabel: {
              fontSize: 12,
              fontFamily: 'Roboto, sans-serif'
            }
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#ccc'
              }
            },
            axisLabel: {
              fontSize: 12,
              fontFamily: 'Roboto, sans-serif'
            }
          },
          series: [{
            name: 'Transacciones',
            type: 'bar',
            data: data,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#73C0DE'
              }, {
                offset: 1,
                color: '#3B8AC4'
              }])
            },
            barWidth: '60%'
          }],
          grid: {
            left: '3%',
            right: '3%',
            bottom: '5%',
            containLabel: true
          }
        };

        chart.setOption(options);
        window.addEventListener('resize', chart.resize);
      } catch (error) {
        console.error("Error al configurar el gráfico: ", error);
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.renderChart);
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
  margin: 20px auto;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: all 0.3s ease;
}

.no-data-message {
  text-align: center;
  color: #999;
  font-size: 16px;
  margin-top: 20px;
}

.transaction-activity-chart:hover .chart-container {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.transaction-activity-chart {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f9;
  border-radius: 16px;
}

@media (max-width: 768px) {
  .chart-container {
    height: 300px;
    padding: 15px;
  }

  .transaction-activity-chart {
    padding: 10px;
  }
}
</style>
