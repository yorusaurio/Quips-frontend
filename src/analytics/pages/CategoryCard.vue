<template>
  <div class="category-card" @click="goToRoute">
    <i :class="icon"></i>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    icon: String,
    description: String,
    route: String
  },
  methods: {
    goToRoute() {
      this.$router.push({ name: this.route });
    }
  }
}
</script>

<style scoped>
.category-card {
  width: 240px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

i {
  font-size: 36px;
  margin-bottom: 10px;
}

h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

p {
  font-size: 14px;
  color: #666;
}
</style>
