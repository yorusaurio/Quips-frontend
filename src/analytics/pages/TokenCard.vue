<template>
  <div class="token-card" :style="{ backgroundColor: bgColor }">
    <div class="token-icon">
      <i :class="icon + ' fa-icon'"></i>
    </div>
    <div class="token-info">
      <h3>{{ title }}</h3>
      <h2>{{ value }}</h2>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TokenCard',
  props: {
    title: String,
    value: Number,
    icon: String,
    bgColor: String,
    description: {
      type: String,
      default: 'Estado general del sistema',
    },
  },
};
</script>

<style scoped>
.token-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 250px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.token-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.token-icon {
  font-size: 40px;
  margin-bottom: 10px;
}

.fa-icon {
  color: #007bff;
}

.token-info h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #6c757d;
}

.token-info h2 {
  font-size: 28px;
  color: #333;
}

.token-info p {
  font-size: 14px;
  color: #6c757d;
}
</style>
