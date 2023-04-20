import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PreviewView from '../views/PreviewView.vue'
import TrackDetailsView from '../views/TrackDetailsView.vue'

const routes = [
  {
    path: '/',
    redirect: { name: 'home'},
  },
  {
    path: '/site/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/site/times/:extension/:category/',
    name: 'preview',
    component: PreviewView
  },
  {
    path: '/site/times/:extension/:category/:format/:track',
    name: 'trackDetails',
    component: TrackDetailsView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
