import { createRouter, createWebHistory } from 'vue-router'
import NewsView from '../views/NewsView.vue'
import NewsArchivesView from '../views/NewsArchivesView.vue'
import PreviewView from '../views/PreviewView.vue'
import TrackDetailsView from '../views/TrackDetailsView.vue'

const routes = [
  {
    path: '/',
    name: 'news',
    component: NewsView
  },
  {
    path: '/:news',
    name: 'specificNews',
    component: NewsView
  },
  {
    path: '/newsArchives',
    name: 'newsArchives',
    component: NewsArchivesView
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
