<template>
  <div class="add-edit-news p-card p-shadow-3 p-mt-4 p-p-4">
    <h2 class="p-text-center p-mb-3">{{ isEditing ? 'Editar Noticia' : 'Agregar Noticia' }}</h2>

    <form @submit.prevent="saveNews" class="p-fluid">
      <!-- Título de la noticia -->
      <div class="p-field p-grid">
        <label for="title" class="p-col-12 p-md-2">Título:</label>
        <div class="p-col-12 p-md-10">
          <InputText
              id="title"
              v-model="newsForm.title"
              placeholder="Título de la noticia"
              required
              class="p-inputtext-lg p-d-block"
          />
        </div>
      </div>

      <!-- Contenido de la noticia -->
      <div class="p-field p-grid">
        <label for="content" class="p-col-12 p-md-2">Contenido:</label>
        <div class="p-col-12 p-md-10">
          <Textarea
              id="content"
              v-model="newsForm.content"
              rows="6"
              placeholder="Contenido de la noticia"
              required
              class="p-inputtext-lg p-d-block"
          />
        </div>
      </div>

      <!-- Input para cargar la imagen (personalizado) -->
      <div class="p-field p-grid">
        <label for="imageFile" class="p-col-12 p-md-2">Subir Imagen:</label>
        <div class="p-col-12 p-md-10">
          <div class="custom-file-input">
            <input
                type="file"
                id="imageFile"
                @change="onFileChange"
                accept="image/*"
                class="file-input"
            />
            <label for="imageFile" class="upload-btn p-button p-component">
              <span class="p-button-icon p-c pi pi-upload"></span>
              <span class="p-button-label">{{ selectedFile ? selectedFile.name : 'Seleccionar archivo' }}</span>
            </label>
          </div>
          <small class="p-text-muted format-info">Formatos aceptados: JPG, PNG</small>
        </div>
      </div>

      <!-- Botón Guardar -->
      <div class="p-field p-grid p-justify-center">
        <Button
            label="Guardar"
            icon="pi pi-save"
            type="submit"
            class="p-button-success p-mt-2 p-px-5 p-py-3"
            :loading="isLoading"
        />
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
        imageUrl: '' // Este campo se llenará con la URL de ImgBB
      },
      selectedFile: null, // Para almacenar la imagen seleccionada
      isEditing: false,
      isLoading: false
    };
  },
  methods: {
    onFileChange(event) {
      this.selectedFile = event.target.files[0]; // Almacenar el archivo seleccionado
    },
    async saveNews() {
      const token = localStorage.getItem('token');
      this.isLoading = true;

      try {
        if (this.selectedFile) {
          // Subir la imagen a ImgBB si se ha seleccionado un archivo
          const imageUrl = await newsService.uploadImageToImgBB(this.selectedFile);
          this.newsForm.imageUrl = imageUrl;
        }

        // Lógica de edición o agregado de noticias
        if (this.isEditing) {
          await newsService.editNews(token, this.id, this.newsForm);
        } else {
          await newsService.addNews(token, this.newsForm);
        }

        this.$router.push('/news');
      } catch (error) {
        console.error('Error al guardar noticia:', error);
      } finally {
        this.isLoading = false;
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

.p-field {
  margin-bottom: 1.5rem;
}

.p-button-success {
  background-color: #4caf50;
  border-color: #4caf50;
}

.p-button-success:hover {
  background-color: #45a049;
  border-color: #45a049;
}

.p-inputtext-lg {
  font-size: 1.2rem;
}

.p-px-5 {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

.p-py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

/* Estilo personalizado para el input de archivo */
.custom-file-input {
  position: relative;
  display: inline-block;
  width: 100%;
}

.file-input {
  opacity: 0;
  width: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
}

.upload-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.upload-btn:hover {
  background-color: #0056b3;
}

.format-info {
  display: block;
  margin-top: 0.25rem;
  color: #6c757d;
}
</style>
