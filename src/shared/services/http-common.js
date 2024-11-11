import axios from 'axios';

export default axios.create({
    baseURL: 'https://quips-backend-production.up.railway.app/api/',
    headers: { 'Content-type': 'application/json' }
});
