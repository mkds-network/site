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
    <div id="row-category" class="row" v-if="this.category !== undefined">
      <div class="col col-category">
        <span v-on:click="changeCategory('Non-PRB')" class="category-link" v-bind:class="[this.category === 'Non-PRB' ? 'category-link-selected' : '']">Non-PRB</span>
      </div>
      <div class="col col-category">
        <span v-on:click="changeCategory('PRB')" class="category-link" v-bind:class="[this.category === 'PRB' ? 'category-link-selected' : '']">PRB</span>
      </div>
      <div class="col col-category">
        <span v-on:click="changeCategory('SC')" class="category-link" v-bind:class="[this.category === 'SC' ? 'category-link-selected' : '']">SC</span>
      </div>
    </div>
    <div id="preview-table">
      <table id="ranking-table-preview">
        <thead>
          <tr id="rankings-table-head">
            <th>Track</th>
            <th>WR</th>
            <th>Holder</th>
            <th>See more</th>
          </tr>
        </thead>
        <tbody v-for="track in this.preview" v-bind:key="track.id">
          <tr v-if="track['3lap']['WR'] != null">
            <td v-bind:rowspan="track['Flap']['WR'] != null ? 2 : 1">{{ track['name'] }}</td>
            <td>{{ track['3lap']['WR'] }}</td>
            <td>{{ track['3lap']['Holder'] }}</td>
            <td>
              <router-link class="seeDetailsLink" v-if="track['3lap']['WR'] != null" :to="
                this.category === undefined ?
                { name: 'trackDetailsWithoutCategory',
                  params: { 
                    extension: `${ this.extension }`,
                    format: '3lap',
                    track: `${ track.id }`
                  }
                } :
                { name: 'trackDetails',
                  params: { 
                    extension: `${ this.extension }`,
                    category: `${ this.category }`,
                    format: '3lap',
                    track: `${ track.id }`
                  }
                }"
              >See rankings for 3lap</router-link>
            </td>
          </tr>
          <tr v-if="track['Flap']['WR'] != null">
            <td v-if="track['3lap']['WR'] == null">{{ track['name'] }}</td>
            <td>{{ track['Flap']['WR'] }}</td>
            <td>{{ track['Flap']['Holder'] }}</td>
            <td>
              <router-link class="seeDetailsLink" v-if="track['Flap']['WR'] != null" :to="
                this.category === undefined ?
                { name: 'trackDetailsWithoutCategory',
                  params: { 
                    extension: `${ this.extension }`,
                    format: 'Flap',
                    track: `${ track.id }`
                  }
                } :
                { name: 'trackDetails',
                  params: { 
                    extension: `${ this.extension }`,
                    category: `${ this.category }`,
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
      extension: route.params.extension,
      category: route.params.category
    }
  },
  methods: {
    getPreviewData : async function () {
      if(this.category === undefined) {
        this.preview = await import(`../data/times/${ this.extension }/preview.json`).then(module => {
          return module.default;
        });
      }
      else {
        this.preview = await import(`../data/times/${ this.extension }/${ this.category }/preview.json`).then(module => {
          return module.default;
        });
      }
    },
    changeCategory($category) {
      this.category = $category;
      this.getPreviewData();
    }
  },
  async created(){
    await this.getPreviewData();
  },
}
</script>

<style scoped>
#preview-table {
  overflow-x: auto;
  width: 100%;
  border-radius: 10px;
  border: thin solid white;
  padding: 5px 10px;
}

#rankings-table-head {
  border: none;
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

tr {
  border-top: thin solid darkgray;
}

th {
  padding: 5px;
  font-weight: bolder;
  font-size: 14px;
}

td {
  padding: 3px;
  position: relative;
}

#ranking-table-preview {
  width: 100%;
  text-align: center;
}
</style>