<template>
  <div class="news-dashboard">
    <h1 class="title">Noticias</h1>

    <!-- Botón para añadir noticia -->
    <router-link to="/news/add" class="add-news-link">
      <Button label="Añadir Noticia" icon="pi pi-plus" class="p-button-success add-news-btn" />
    </router-link>

    <!-- Nueva disposición de tarjetas en 4 columnas usando Flexbox -->
    <div class="news-container">
      <div v-for="news in newsList" :key="news.id" class="news-card">
        <div class="news-header">
          <h3 class="news-title">{{ news.title }}</h3>
        </div>
        <div class="news-image-container">
          <img v-if="news.imageUrl" :src="news.imageUrl" alt="Imagen de la noticia" class="news-image" />
          <div v-else class="error-image">Error al cargar la imagen</div>
        </div>
        <p class="news-content">{{ news.content.length > 100 ? news.content.substring(0, 100) + '...' : news.content }}</p>
        <div class="news-footer">
          <router-link :to="`/news/edit/${news.id}`">
            <Button label="Editar" icon="pi pi-pencil" class="p-button-primary action-btn" />
          </router-link>
          <Button label="Eliminar" icon="pi pi-trash" class="p-button-danger action-btn" @click="deleteNews(news.id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button';
import newsService from '@/articles/services/newsService';

export default {
  components: {
    Button,
  },
  data() {
    return {
      newsList: [],
      errorMessage: '',
    };
  },
  methods: {
    fetchNews() {
      const token = localStorage.getItem('token');
      newsService.getAllNews(token)
          .then((response) => {
            this.newsList = response.data;
          })
          .catch((error) => {
            this.errorMessage = 'No se pudo cargar las noticias. Intenta de nuevo más tarde.';
          });
    },
    deleteNews(id) {
      const token = localStorage.getItem('token');
      newsService.deleteNews(token, id)
          .then(() => {
            this.fetchNews(); // Recargar la lista después de eliminar
          })
          .catch((error) => {
            this.errorMessage = 'Error al eliminar la noticia.';
          });
    },
  },
  mounted() {
    this.fetchNews();
  },
};
</script>

<style scoped>
.news-dashboard {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;
}

.add-news-btn {
  display: block;
  margin: 20px auto;
  font-size: 16px;
  padding: 0.8rem 1.5rem;
}

/* Estilos del contenedor de noticias usando Flexbox */
.news-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
}

/* Cada tarjeta ocupa 23% del ancho en pantallas grandes para lograr 4 por fila */
.news-card {
  flex: 0 0 23%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 15px;
  transition: transform 0.3s ease;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
}

.add-news-link {
  text-decoration: none;
}

.add-news-link:hover {
  text-decoration: none;
}


.news-header {
  text-align: center;
  margin-bottom: 15px;
}

.news-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.news-image-container {
  width: 100%;
  height: 150px;
  margin-bottom: 15px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.news-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.error-image {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ff0000;
}

.news-content {
  font-size: 14px;
  margin-bottom: 20px;
  color: #666;
  text-align: center;
}

.news-footer {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}

.action-btn {
  flex: 1;
  margin: 0 5px;
  font-size: 14px;
  padding: 10px;
}

.p-button-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.p-button-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}
</style>
