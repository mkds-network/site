<template>
  <div id="news" v-if="this.news">
    <div id="news-header">
      <div id="news-title">{{ this.news.title }}</div>
      <div class="line"></div>
      <div id="news-author">
        <img id="news-author-image" v-bind:src="require('../assets/authorsImages/' + this.authorImage)" />
        <span id="news-author-text"><b>{{ this.news.author }}</b>, {{ this.news.date }}</span>
      </div>
    </div>
    <div id="news-body">
      <img id="news-image" v-bind:src="require('../data/news/images/' + this.news.mainPicture)">
      <div class="news-paragraph" v-for="paragraph in this.news.paragraphs" v-bind:key="paragraph.title">
        <div class="news-paragraph-title">{{ paragraph.title }} :</div>
        <div class="news-paragraph-content" v-html="paragraph.content"></div>
      </div>
    </div>
    <div class="news-archives-link-container">
      <router-link class="news-archives-link" to="/newsArchives">News archives >>></router-link>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  name: 'NewsView',
  data() {
    const route = useRoute();
    return {
      news: null,
      authorImage: null,
      selectedNews: route.params.news,
    }
  },
  methods: {
    getNews: async function () {
      var allNews = require.context('../data/news', false, /\.json$/);
      if (this.selectedNews != undefined) {
        this.news = await import(`../data/news/${ this.selectedNews }.json`).then(module => {
          return module.default;
        });
      }
      else {
        this.news = await import(`../data/news/${ allNews.keys()[allNews.keys().length-1].substring(2) }`).then(module => {
          return module.default;
        });
      }
      this.authorImage = this.news.author + '.png';
    }
  },
  async created() {
    await this.getNews();
  }
}
</script>
  
<style scoped>
#news-title {
  font-size: 28px;
  font-weight: bold;
}

.line {
  height: 0px;
  margin: 0 0 10px 0;
  border-top: solid 1px white;
}

#news-author {
  font-size: 14px;
}

#news-author-image {
  width: 30px;
  height: 30px;
  border: solid 1px white;
}

#news-author-text {
  margin-left: 5px;
}

#news-body {
  margin-top: 30px;
}

#news-image {
  display: block;
  margin: 10px auto;
  max-width: 480px;
  max-height: 270px;
}

@media screen and (max-width: 600px) {
  #news-image {
    display: block;
    margin: 10px auto;
    max-width: 240px;
    max-height: 135px;
  }
}

.news-paragraph {
  margin-top: 25px;
}

.news-paragraph-title {
  font-size: 14px;
  font-weight: bold;
  text-decoration: underline;
}

.news-paragraph-content {
  margin-top: 5px;
}

.news-paragraph-content:deep(a) {
  font-weight: bold;
  color: white;
}

.news-paragraph-content:deep(a:hover) {
  color: #0fc7f5;
}

.news-paragraph-content:deep(ul) {
  list-style-type: none;
  padding-left: 10px;
  margin: 5px 0;
}

.news-paragraph-content:deep(.stdG) {
  font-weight: bold;
  color: #18bff5;
}

.news-paragraph-content:deep(.stdM) {
  font-weight: bold;
  color: #0099ff;
}

.news-paragraph-content:deep(.stdT) {
  font-weight: bold;
  color: #306fd1;
}

.news-paragraph-content:deep(.stdH) {
  font-weight: bold;
  color: #7262e7;
}

.news-paragraph-content:deep(.stdE) {
  font-weight: bold;
  color: #b44eb4;
}

.news-paragraph-content:deep(.stdA) {
  font-weight: bold;
  color: #bd4682;
}

.news-paragraph-content:deep(.stdI) {
  font-weight: bold;
  color: #d3455c;
}

.news-paragraph-content:deep(.stdB) {
  font-weight: bold;
  color: #ea4335;
}

.news-paragraph-content:deep(.stdN) {
  font-weight: bold;
  color: #c92c20;
}

.news-archives-link-container {
  width: 115px;
  margin-left: auto;
  margin-top: 20px;
}

.news-archives-link {
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.news-archives-link:hover {
  color: #0fc7f5;
}
</style>