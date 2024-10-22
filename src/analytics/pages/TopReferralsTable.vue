<template>
  <div class="table-container">
    <h3>Top Referidos</h3>
    <table>
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
