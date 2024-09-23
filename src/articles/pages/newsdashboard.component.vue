<template>
  <div class="news-dashboard p-m-4">
    <h1 class="p-text-center">Noticias</h1>

    <!-- Botón para añadir noticia -->
    <router-link to="/news/add">
      <Button label="Añadir Noticia" icon="pi pi-plus" class="p-button-success p-mb-4" />
    </router-link>

    <!-- Lista de noticias en Grid -->
    <ul class="p-grid p-nogutter">
      <li v-for="news in newsList" :key="news.id" class="p-col-12 p-md-6 p-lg-4">
        <Card class="news-card">
          <template #header>
            <h3 class="p-text-center">{{ news.title }}</h3>
          </template>
          <template #content>
            <!-- Mostrar la imagen si existe, de lo contrario mostrar un mensaje de error -->
            <img v-if="news.imageUrl" :src="news.imageUrl" alt="Imagen de la noticia" class="news-image" />
            <div v-else class="error-image">Error al cargar la imagen</div>
            <p class="news-content">{{ news.content.length > 100 ? news.content.substring(0, 100) + '...' : news.content }}</p>
          </template>
          <template #footer>
            <div class="p-d-flex p-jc-between p-ai-center">
              <router-link :to="`/news/edit/${news.id}`">
                <Button label="Editar" icon="pi pi-pencil" class="p-button-primary p-mr-2" />
              </router-link>
              <Button label="Eliminar" icon="pi pi-trash" class="p-button-danger" @click="deleteNews(news.id)" />
            </div>
          </template>
        </Card>
      </li>
    </ul>
  </div>
</template>

<script>
import Button from 'primevue/button';
import Card from 'primevue/card';
import newsService from '@/articles/services/newsService';

export default {
  components: {
    Button,
    Card,
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
            console.log('Noticias recibidas:', response);
            this.newsList = response.data; // Asignar correctamente los datos
          })
          .catch((error) => {
            console.error('Error al obtener noticias:', error);
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
            console.error('Error al eliminar noticia:', error);
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
  margin: 20px;
}

.news-dashboard h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.news-dashboard ul {
  list-style-type: none;
  padding: 0;
}

.news-card {
  padding: 10px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.news-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.error-image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  color: #ff0000;
  text-align: center;
  margin-bottom: 10px;
}

.news-content {
  margin-bottom: 10px;
}
</style>
