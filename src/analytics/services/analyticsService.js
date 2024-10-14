import http from '@/shared/services/http-common';

export class AnalyticsService {
    // Obtener el estado del ciclo (cycle-status)
    getCycleStatus(token) {
        return http.get('/analytics/cycle-status', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    // Obtener el estado de los tokens (token-status)
    getTokenStatus(token) {
        return http.get('/analytics/token-status', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    // Obtener el gráfico de transacciones (transaction-graph)
    getTransactionGraph(token) {
        return http.get('/analytics/transaction-graph', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    // Obtener los usuarios con más transacciones (top-users-transactions)
    getTopUsersByTransactions(token) {
        return http.get('/analytics/top-users-transactions', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    // Obtener los usuarios con más referidos (top-users-referrals)
    getTopUsersByReferrals(token) {
        return http.get('/analytics/top-users-referrals', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    // Obtener la línea de tiempo de las fases (phase-timeline)
    getPhaseTimeline(token) {
        return http.get('/analytics/phase-timeline', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    // Obtener la actividad de transacciones por hora (transaction-activity)
    getTransactionActivityByHour(token) {
        return http.get('/analytics/transaction-activity', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}

export default new AnalyticsService();
