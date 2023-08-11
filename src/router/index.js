import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PreviewView from '../views/PreviewView.vue'
import PreviewViewCatless from '../views/PreviewViewCatless.vue'
import TrackDetailsView from '../views/TrackDetailsView.vue'
import TrackDetailsViewCatless from '../views/TrackDetailsViewCatless.vue'

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
    name: 'previewCatless',
    component: PreviewViewCatless
  },
  {
    path: '/times/:extension/:category/:format/:track',
    name: 'trackDetails',
    component: TrackDetailsView
  },
  {
    path: '/times/:extension/:format/:track',
    name: 'trackDetailsCatless',
    component: TrackDetailsViewCatless
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
