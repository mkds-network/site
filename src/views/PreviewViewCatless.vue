<template>
  <div id="preview">
    <p id="preview-text" v-if="this.extension === 'testExtension'">
      Hi !<br><br>
      This is a test extension to allow the developers to make sure everything is going well on the website.
      If you're not one of them, consider this an easter egg, congratulations on finding it !
    </p>
    <p id="preview-text" v-else>
      <!-- The text of the future extensions will go there -->
    </p>
    <div id="preview-table">
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
              <router-link class="seeDetailsLink" v-if="track['3lap']['WR'] != null" :to="
                { name: 'trackDetailsCatless',
                  params: { 
                    extension: `${ this.extension }`,
                    format: '3lap',
                    track: `${ track.id }`
                  }
                }"
              >See rankings for 3lap</router-link>
            </td>
          </tr>
          <tr>
            <td>{{ track['Flap']['WR'] }}</td>
            <td>{{ track['Flap']['Holder'] }}</td>
            <td>
              <router-link class="seeDetailsLink" v-if="track['Flap']['WR'] != null" :to="
                { name: 'trackDetailsCatless',
                  params: { 
                    extension: `${ this.extension }`,
                    format: 'Flap',
                    track: `${ track.id }`
                  }
                }"
              >See rankings for Flap</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
          extension: route.params.extension
      }
  },
  methods: {
      getPreviewData : async function () {
          this.preview = await import(`../data/times/${ this.extension }/preview.json`).then(module => {
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

#preview-table {
  overflow-x:auto;
}

#row-category {
  width: 60%;
  margin: 15px auto 15px auto;
}
.col-category {
  text-align: center;
  color: #0fc7f5;
}

.category-link {
  text-decoration: none;
  color: white;
  font-size: 17px;
}

.category-link-selected {
  color: red;
  font-weight: bold;
}

.seeDetailsLink {
  color: white;
}

.category-link:hover, .seeDetailsLink:hover {
  color: #0fc7f5;
  cursor: pointer;
}

table, th, tr, td {
  border: 1px solid white;
  border-collapse: collapse;
}

th {
  color: black;
  background-color: rgba(255,255,255,0.7);
}

#ranking-table-preview {
  width: 100%;
  text-align: center;
}
</style>