import http from '@/shared/services/http-common';

export class NewsService {
    getAllNews(token) {
        return http.get('/news', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    addNews(token, data) {
        return http.post('/news/add', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    getNewsById(id) {
        return http.get(`/news/${id}`);
    }

    editNews(token, id, data) {
        return http.put(`/news/edit/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    deleteNews(token, id) {
        return http.delete(`/news/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    // Nueva función para subir imágenes a ImgBB
    uploadImageToImgBB(file) {
        const formData = new FormData();
        formData.append('image', file);
        const apiKey = '8d8f4daf7098ef51df00c7e9401de314';

        return fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data && data.data && data.data.url) {
                    return data.data.url; // Retornar la URL de la imagen subida
                } else {
                    throw new Error('Error al subir imagen a ImgBB');
                }
            });
    }
}

export default new NewsService();
