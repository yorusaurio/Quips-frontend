<template>
  <div class="players-list-page">
    <h1><i class="fas fa-users"></i> Jugadores en Fase</h1>

    <div v-if="players.length" class="players-container">
      <div v-for="player in players" :key="player.userId" class="player-card">
        <div class="player-info">
          <h2><i class="fas fa-user"></i> {{ player.username }}</h2>
          <p><strong>Nombre:</strong> {{ player.firstName }} {{ player.lastName }}</p>
          <p><i class="fas fa-user-friends"></i> Referidos: {{ player.referidos }}</p>
          <p><i class="fas fa-paper-plane"></i> Transacciones Enviadas: {{ player.transaccionesEnviadas }}</p>
          <p><i class="fas fa-inbox"></i> Transacciones Recibidas: {{ player.transaccionesRecibidas }}</p>
          <p><i class="fas fa-chart-line"></i> Nivel de Actividad: <span :class="getActivityLevelClass(player.nivelActividad)">{{ player.nivelActividad }}</span></p>
        </div>
      </div>
    </div>
    <p v-else>No hay jugadores disponibles en esta fase.</p>

    <button @click="goBack"><i class="fas fa-arrow-left"></i> Volver</button>
  </div>
</template>

<script>
import AnalyticsService from "@/analytics/services/analyticsService";

export default {
  name: 'PlayersListPage',
  data() {
    return {
      players: [],
      error: null
    };
  },
  mounted() {
    this.fetchPlayers();
  },
  methods: {
    async fetchPlayers() {
      const token = 'your-auth-token'; // Asegúrate de obtener el token adecuado
      try {
        const response = await AnalyticsService.getAllUsersActivity(token);
        this.players = response.data;
      } catch (error) {
        console.error("Error al cargar la lista de jugadores:", error.response || error.message);
        this.error = `Error al cargar los jugadores: ${error.response?.data?.message || error.message}`;
      }
    },
    goBack() {
      this.$router.push('/cycle-stats');
    },
    getActivityLevelClass(level) {
      switch(level) {
        case 'Activo': return 'active';
        case 'Normal': return 'normal';
        case 'No Activo': return 'inactive';
        default: return '';
      }
    }
  }
};
</script>

<style scoped>
.players-list-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}
h1 {
  font-size: 2em;
  color: #4b9eff;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.players-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
.player-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 280px;
  transition: transform 0.3s;
}
.player-card:hover {
  transform: translateY(-5px);
}
.player-info h2 {
  font-size: 1.5em;
  color: #333;
  margin-bottom: 10px;
}
.player-info p {
  font-size: 0.95em;
  color: #555;
  margin: 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}
.active {
  color: #4CAF50;
  font-weight: bold;
}
.normal {
  color: #FFD700;
  font-weight: bold;
}
.inactive {
  color: #FF6347;
  font-weight: bold;
}
button {
  margin-top: 30px;
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: #4b9eff;
  cursor: pointer;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #3a7dd0;
}
</style>
