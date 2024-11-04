import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '../public/pages/home.component.vue';
import NewsDashboard from '../articles/pages/newsdashboard.component.vue'
import AddEditNews from '../articles/pages/addeditnews.component.vue'
import ProfileComponent from "@/identification/pages/profile.component.vue";
import TopOverview from "@/analytics/pages/TopOverview.vue";
import TokenStatus from "@/analytics/pages/TokenStatus.vue";
import CycleStats from "@/analytics/pages/CycleStats.vue";
import TransactionActivityChart from "@/analytics/pages/TransactionActivityChart.vue";
import TransactionActivityParent from "@/analytics/pages/TransactionActivityParent.vue";
import TransactionGraph from "@/analytics/pages/TransactionGraph.vue";
import PhaseTimeline from "@/analytics/pages/PhaseTimeline.vue";
import TokenStatusWrapper from "@/analytics/pages/TokenStatusWrapper.vue";
import PlayersListPage from "@/analytics/pages/PlayersListPage.vue";

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

    {
      path: '/cycle-stats',
      name: 'CycleStats',
      component: CycleStats,
    },
    {
      path: '/token-status',
      name: 'TokenStatus',
      component: TokenStatusWrapper,
    },
  {
    path: '/players-list',
    name: 'PlayersListPage',
    component: PlayersListPage
  },
    {
      path: '/top-overview',
      name: 'TopOverview',
      component: TopOverview,
    },
    {
      path: '/transaction-activity',
      name: 'TransactionActivity',
      component: TransactionActivityParent,
    },
  {
    path: '/transaction-graph',
    name: 'TransactionGraph',
    component: TransactionGraph
  },
  {
    path: '/phase-timeline',
    name: 'PhaseTimeline',
    component: PhaseTimeline
  }
    ,

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
