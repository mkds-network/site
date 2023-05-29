<template>
  <div class="trackDetails">
    <span>Hi, I'm the track details view !</span>
    <table id="ranking-table-details">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Time</th>
          <th v-if="this.times != null && Object.keys(this.times[0]).includes('std')">Standard</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody v-for="time in this.times" v-bind:key="time.rank">
          <tr>
              <td>{{ time['rank'] }}</td>
              <td>{{ time['player'] }}</td>
              <td v-if="time['video'] != null" v-bind:style="[time['isCr?'] ? {'color':'lime'} : {'color':'inherit'}]">
                  <a :href="`${ time['video'] }`" target="_blank" v-bind:style="'color: inherit'">{{ time['time'] }}</a>
              </td>
              <td v-else v-bind:style="[time['isCr?'] ? {'color':'lime'} : {'color':'inherit'}]">{{ time['time'] }}</td>
              <td v-if="Object.keys(time).includes('std')">{{ time['std'] }}</td>
              <td>{{ time['country'] }}</td>
          </tr>
      </tbody>
    </table>
  </div>
</template>
    
    
<script>
import { useRoute } from 'vue-router';
  
export default {
  name: 'TrackDetailsView',
  data() {
    return {
        times: null,
    }
  },
  methods: {
      getTrackData : async function () {
          const route = useRoute()
          this.times = await import(`../data/times/${ route.params.extension }/${ route.params.category }/${ route.params.format }/${ route.params.track }.json`).then(module => {
              return module.default;
          });
      }
  },
  async created(){
      await this.getTrackData();
  }
}
</script>

<style scoped>
#ranking-table-details {
  width: 100%;
}
</style>