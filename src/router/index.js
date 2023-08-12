import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PreviewView from '../views/PreviewView.vue'
import TrackDetailsView from '../views/TrackDetailsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/times/:extension/:category/',
    name: 'preview',
    component: PreviewView
  },
  {
    path: '/times/:extension/',
    name: 'previewWithoutCategory',
    component: PreviewView
  },
  {
    path: '/times/:extension/:category/:format/:track',
    name: 'trackDetails',
    component: TrackDetailsView
  },
  {
    path: '/times/:extension/:format/:track',
    name: 'trackDetailsWithoutCategory',
    component: TrackDetailsView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
