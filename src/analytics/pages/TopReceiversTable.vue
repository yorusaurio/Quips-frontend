<template>
  <div class="table-container">
    <h3>Top Receivers</h3>
    <table>
      <thead>
      <tr>
        <th>Username</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Email</th>
        <th>Total Transacciones</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="receiver in receivers" :key="receiver.id">
        <td>{{ receiver.username }}</td>
        <td>{{ receiver.firstName }}</td>
        <td>{{ receiver.lastName }}</td>
        <td>{{ receiver.email }}</td>
        <td>{{ receiver.totalTransactions }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    receivers: Array
  }
};
</script>

<style scoped>
.table-container {
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
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
