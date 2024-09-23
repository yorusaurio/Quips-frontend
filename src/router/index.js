import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '../public/pages/home.component.vue';
import NewsDashboard from '../articles/pages/newsdashboard.component.vue'
import AddEditNews from '../articles/pages/addeditnews.component.vue'
import ProfileComponent from "@/identification/pages/profile.component.vue";

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeComponent,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../identification/pages/login.component.vue'), // Lazy loading for login page
  },
  {
    path: '/',
    redirect: 'login', // Redirect root to /home
  },
  { path: '/news', name: 'news', component: NewsDashboard },
  { path: '/profile', name: 'profile', component: ProfileComponent },
  { path: '/news/add', name: 'add-news', component: AddEditNews },
  { path: '/news/edit/:id', name: 'edit-news', component: AddEditNews, props: true },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
