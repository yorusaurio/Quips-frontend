// src/services/newsService.js
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

    // Obtener noticia por ID
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
}

export default new NewsService();
