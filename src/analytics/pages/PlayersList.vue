<template>
  <div class="players-list-container">
    <h2>Lista de Jugadores en Fase</h2>
    <ul v-if="players.length">
      <li v-for="player in players" :key="player.userId">
        <p><strong>{{ player.username }}</strong> - {{ player.firstName }} {{ player.lastName }}</p>
        <p>Referidos: {{ player.referidos }}</p>
        <p>Transacciones Enviadas: {{ player.transaccionesEnviadas }}</p>
        <p>Transacciones Recibidas: {{ player.transaccionesRecibidas }}</p>
        <p>Nivel de Actividad: {{ player.nivelActividad }}</p>
      </li>
    </ul>
    <p v-else>No hay jugadores disponibles en esta fase.</p>
    <button @click="closeList">Cerrar</button>
  </div>
</template>

<script>
import AnalyticsService from "@/analytics/services/analyticsService";

export default {
  name: 'PlayersList',
  props: {
    token: {
      type: String,
      required: true
    }
  },
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
      try {
        const response = await AnalyticsService.getAllUsersActivity(this.token);
        this.players = response.data;
      } catch (error) {
        console.error("Error al cargar la lista de jugadores:", error.response || error.message);
        this.error = `Error al cargar los jugadores: ${error.response?.data?.message || error.message}`;
      }
    },
    closeList() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.players-list-container {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}
h2 {
  text-align: center;
}
button {
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #4b9eff;
  color: #fff;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #3a7dd0;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 15px;
}
</style>
