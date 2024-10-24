<template>
  <div class="table-container">
    <h3>Top Referidos</h3>
    <table class="styled-table">
      <thead>
      <tr>
        <th>Username</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Total Referidos</th>
      </tr>
      </thead>
      <tbody>
      <!-- Filtramos a los usuarios que tengan al menos 1 referido -->
      <tr v-for="referral in filteredReferrals" :key="referral.id">
        <td>{{ referral.username }}</td>
        <td>{{ referral.firstName }}</td>
        <td>{{ referral.lastName }}</td>
        <td>{{ referral.totalReferrals }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    referrals: Array
  },
  computed: {
    filteredReferrals() {
      // Filtrar los usuarios que tengan más de 0 referidos
      return this.referrals.filter(referral => referral.totalReferrals > 0);
    }
  }
};
</script>

<style scoped>
/* Contenedor con sombra y margen */
.table-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  padding: 20px;
  max-width: 1000px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

/* Estilo de la tabla */
.styled-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

/* Gradiente suave en el encabezado */
thead {
  background: linear-gradient(135deg, #6c63ff, #4b9eff);
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

th, td {
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
}

/* Alternar colores de filas */
tbody tr:nth-child(odd) {
  background-color: #f5f7fa;
}

tbody tr:nth-child(even) {
  background-color: #eaf0f6;
}

/* Efecto hover en filas */
tbody tr:hover {
  background-color: #ddeeff;
  transform: scale(1.02);
  transition: all 0.3s ease;
}

/* Efecto hover en la tabla */
.styled-table:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Tipografía */
th, td {
  font-family: 'Roboto', sans-serif;
  color: #333;
}

th {
  font-size: 14px;
}

td {
  font-size: 16px;
  font-weight: 500;
}

/* Estilo responsivo para pantallas más pequeñas */
@media (max-width: 768px) {
  .table-container {
    padding: 10px;
  }

  th, td {
    padding: 10px;
    font-size: 14px;
  }
}
</style>
