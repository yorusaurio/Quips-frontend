<template>
  <div class="table-container">
    <table>
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
.table-container {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

thead {
  background-color: #333;
  color: white;
}

th, td {
  padding: 12px;
  text-align: center;
  border: 1px solid #ddd;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:hover {
  background-color: #f1f1f1;
}
</style>
