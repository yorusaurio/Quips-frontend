<template>
  <div class="add-edit-news p-card p-shadow-3 p-mt-4 p-p-4">
    <h2 class="p-text-center p-mb-3">{{ isEditing ? 'Editar Noticia' : 'Agregar Noticia' }}</h2>

    <form @submit.prevent="saveNews" class="p-fluid">

      <!-- Título de la noticia -->
      <div class="p-field p-grid">
        <label for="title" class="p-col-12 p-md-2">Título:</label>
        <div class="p-col-12 p-md-10">
          <InputText id="title" v-model="newsForm.title" placeholder="Título de la noticia" required />
        </div>
      </div>

      <!-- Contenido de la noticia -->
      <div class="p-field p-grid">
        <label for="content" class="p-col-12 p-md-2">Contenido:</label>
        <div class="p-col-12 p-md-10">
          <Textarea id="content" v-model="newsForm.content" rows="6" placeholder="Contenido de la noticia" required />
        </div>
      </div>

      <!-- URL de la imagen -->
      <div class="p-field p-grid">
        <label for="imageUrl" class="p-col-12 p-md-2">URL de la imagen:</label>
        <div class="p-col-12 p-md-10">
          <InputText id="imageUrl" v-model="newsForm.imageUrl" placeholder="http://..." />
        </div>
      </div>

      <!-- Botón Guardar -->
      <div class="p-field p-grid p-justify-center">
        <Button label="Guardar" icon="pi pi-save" type="submit" class="p-button-success p-mt-2" :loading="isLoading" />
      </div>

    </form>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import newsService from '@/articles/services/newsService';

export default {
  components: {
    InputText,
    Textarea,
    Button
  },
  props: ['id'],
  data() {
    return {
      newsForm: {
        title: '',
        content: '',
        imageUrl: ''
      },
      isEditing: false,
      isLoading: false
    };
  },
  methods: {
    saveNews() {
      const token = localStorage.getItem('token');
      this.isLoading = true;

      if (this.isEditing) {
        newsService.editNews(token, this.id, this.newsForm)
            .then(() => {
              this.$router.push('/news');
            })
            .catch(error => console.error('Error al editar noticia:', error))
            .finally(() => this.isLoading = false);
      } else {
        newsService.addNews(token, this.newsForm)
            .then(() => {
              this.$router.push('/news');
            })
            .catch(error => console.error('Error al agregar noticia:', error))
            .finally(() => this.isLoading = false);
      }
    }
  },
  mounted() {
    if (this.id) {
      this.isEditing = true;
      newsService.getNewsById(this.id)
          .then(response => {
            this.newsForm = response.data;
          })
          .catch(error => console.error('Error al obtener noticia:', error));
    }
  }
};
</script>

<style scoped>
.add-edit-news {
  max-width: 600px;
  margin: 0 auto;
}
</style>
