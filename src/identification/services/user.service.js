// src/shared/services/user.service.js
import http from '../../shared/services/http-common';

export class UserService {
    /**
     * Función para iniciar sesión y obtener el token
     * @param {string} username - El nombre de usuario
     * @param {string} password - La contraseña del usuario
     * @returns {Promise} - Promesa que resuelve con el token o con el error
     */
    login(username, password) {
        return http.post('/analytics/login', { username, password })
            .then(response => {
                if (response && response.data && response.data.token) {
                    return { token: response.data.token }; // Retorna solo el token si existe
                } else {
                    throw new Error('Respuesta inesperada del servidor');
                }
            })
            .catch(error => {
                // Manejo de errores
                if (error.response) {
                    throw new Error(error.response.data.message || 'Error en la solicitud de inicio de sesión');
                } else if (error.request) {
                    throw new Error('El servidor no respondió. Verifica tu conexión.');
                } else {
                    throw new Error('Error al configurar la solicitud de inicio de sesión');
                }
            });
    }

    /**
     * Función para obtener la información del usuario autenticado
     * @param {string} token - El token del usuario
     * @returns {Promise} - Promesa que resuelve con la información del usuario
     */
    getUserInfo(token) {
        return http.get('/analytics/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                if (response && response.data) {
                    return response.data; // Devuelve la información del usuario
                } else {
                    throw new Error('Respuesta inesperada al obtener la información del usuario');
                }
            })
            .catch(error => {
                if (error.response) {
                    throw new Error(error.response.data.message || 'Error en la solicitud de información del usuario');
                } else if (error.request) {
                    throw new Error('El servidor no respondió al solicitar la información del usuario.');
                } else {
                    throw new Error('Error al configurar la solicitud de información del usuario');
                }
            });
    }

    /**
     * Función para cerrar sesión
     */
    logout() {
        localStorage.removeItem('token'); // Elimina el token de localStorage
    }
}

export default new UserService();
