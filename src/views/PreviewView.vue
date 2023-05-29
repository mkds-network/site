<template>
  <div class="preview">
    <span>Hi, I'm the preview view !</span>
    <div>
      <a :href="`/site/times/${ this.extension }/Non-PRB`">Non-PRB</a>
      <a :href="`/site/times/${ this.extension }/PRB`">PRB</a>
      <a :href="`/site/times/${ this.extension }/SC`">SC</a>
    </div>
    <table id="ranking-table-preview">
      <thead>
        <tr>
          <th>Track</th>
          <th>WR</th>
          <th>Holder</th>
          <th>See more</th>
        </tr>
      </thead>
      <tbody v-for="track in this.preview" v-bind:key="track.id">
        <tr>
          <td rowspan="2">{{ track['name'] }}</td>
          <td>{{ track['3lap']['WR'] }}</td>
          <td>{{ track['3lap']['Holder'] }}</td>
          <td>
            <router-link v-if="track['3lap']['WR'] != null" :to="
              { name: 'trackDetails',
                params: { 
                  extension: `${ this.extension }`,
                  category: `${ this.category }`,
                  format: '3lap',
                  track: `${ track.id }`
                }
              }"
            >See details for 3lap</router-link>
          </td>
        </tr>
        <tr>
          <td>{{ track['Flap']['WR'] }}</td>
          <td>{{ track['Flap']['Holder'] }}</td>
          <td>
            <router-link v-if="track['Flap']['WR'] != null" :to="
              { name: 'trackDetails',
                params: { 
                  extension: `${ this.extension }`,
                  category: `${ this.category }`,
                  format: 'Flap',
                  track: `${ track.id }`
                }
              }"
            >See details for Flap</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script>
import { useRoute } from 'vue-router';

export default {
  name: 'PreviewView',
  data() {
      const route = useRoute()
      return {
          preview: null,
          extension: route.params.extension,
          category: route.params.category
      }
  },
  methods: {
      getPreviewData : async function () {
          const route = useRoute()
          this.preview = await import(`../data/times/${ route.params.extension }/${ route.params.category }/preview.json`).then(module => {
              return module.default;
          });
      }
  },
  async created(){
      await this.getPreviewData();
  }
}
</script>

<style scoped>
#ranking-table-preview {
  width: 100%;
}
</style>