<template>
  <div id="track-details">
    <div id="track-text">
      <b>{{ this.$route.params.track }}</b> : {{ this.$route.params.format }} in {{ this.$route.params.category }}
    </div>
    <div id="track-table">
      <table id="ranking-table-details">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Time</th>
          <th v-if="this.times != null && Object.keys(this.times[0]).includes('std')">Std</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody v-for="time in this.times" v-bind:key="time.rank">
          <tr>
              <td class="td-limited-width">{{ time['rank'] }}</td>
              <td>{{ time['player'] }}</td>
              <td v-if="time['video'] != null" v-bind:class="[time['isCr?'] ? 'gold' : '']">
                  <a :href="`${ time['video'] }`" target="_blank" v-bind:class="'track-details-video-link'">{{ time['time'] }}</a>
              </td>
              <td v-else v-bind:class="[time['isCr?'] ? 'gold' : '']">{{ time['time'] }}</td>
              <td v-if="Object.keys(time).includes('std')" class="td-limited-width" v-bind:class="['std' + time['std'][0]]">{{ time['std'] }}</td>
              <td>{{ time['country'] }}</td>
          </tr>
      </tbody>
    </table>
    </div>
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
#track-text {
  text-align: center;
  padding: 10px 0 20px 0;
}

#track-table {
  overflow-x: auto;
}

table, th, tr, td {
  border: 1px solid white;
  border-collapse: collapse;
}

th {
  color: black;
  background-color: rgba(255,255,255,0.7);
}

#ranking-table-details {
  width: 100%;
  text-align: center;
}

.td-limited-width {
  width: 50px;
}

.track-details-video-link {
  color: inherit
}

.track-details-video-link:hover {
  color: #0fc7f5;
}

.gold {
  color: gold;
}

.stdG {
  background-color: rgba(24,191,245,0.7);
}

.stdM {
  background-color: rgba(0,153,255,0.7);
}

.stdT {
  background-color: rgba(48,111,209,0.7);
}

.stdH {
  background-color: rgba(114,98,231,0.7);
}

.stdE {
  background-color: rgba(180,78,180,0.7);
}

.stdA {
  background-color: rgba(189,70,130,0.7);
}

.stdI {
  background-color: rgba(211,69,92,0.7);
}

.stdB {
  background-color: rgba(234,57,63,0.7);
}

.stdN {
  background-color: rgba(201,44,32,0.7);
}
</style>