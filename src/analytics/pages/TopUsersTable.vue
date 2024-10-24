<template>
  <div class="table-container">
    <table class="styled-table">
      <thead>
      <tr>
        <th>Username</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Total Transacciones</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.user.username }}</td>
        <td>{{ user.user.firstName }}</td>
        <td>{{ user.user.lastName }}</td>
        <td>{{ user.transactionCount }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    users: Array,
  }
};
</script>

<style scoped>
/* Contenedor para centrar la tabla */
.table-container {
  display: flex;
  justify-content: center;
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

/* Encabezado con gradiente suave */
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

/* Efecto hover */
tbody tr:hover {
  background-color: #ddeeff;
  transform: scale(1.02);
  transition: all 0.3s ease;
}

/* Efecto cuando pasa el ratón por la tabla */
.styled-table:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Estilo de los textos */
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

/* Estilo responsivo para móviles */
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
