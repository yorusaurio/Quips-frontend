<template>
  <div class="table-container">
    <h3>Top Senders</h3>
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
      <tr v-for="sender in senders" :key="sender.id">
        <td>{{ sender.username }}</td>
        <td>{{ sender.firstName }}</td>
        <td>{{ sender.lastName }}</td>
        <td>{{ sender.email }}</td>
        <td>{{ sender.totalTransactions }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    senders: Array
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
