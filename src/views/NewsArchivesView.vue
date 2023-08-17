<template>
  <div id="news-archives">
    <div v-for="news in this.news" v-bind:key="news">
      <span>{{ news.date }} -
        <router-link class="news-link" :to="{ name: 'specificNews', params: { news: news.filename } }">{{ news.title }}</router-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsArchivesView',
  data() {
    return {
      news: [],
    }
  },
  methods: {
    getNews: async function () {
      let newsFilenames = require.context('../data/news', false, /\.json$/).keys();
      for (let i = newsFilenames.length-1; i>-1; i--) {
        let news = await import(`../data/news/${ newsFilenames[i].substring(2) }`).then(module => {
          return module.default;
        });
        this.news.push({
          "filename": newsFilenames[i].substring(2).slice(0, -5),
          "title": news.title,
          "date": news.date
        });
      }
    }
  },
  async created() {
    await this.getNews();
  }
}
</script>

<style scoped>
.news-link {
    font-weight: bold;
    color: white;
}

.news-link:hover {
    color: #0fc7f5;
}
</style>