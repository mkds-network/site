<template>
  <div id="trackDetails">
    <span>Hi, I'm the track details view !</span>
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
              <td v-if="time['video'] != null" v-bind:style="[time['isCr?'] ? {'color':'lime'} : {'color':'inherit'}]">
                  <a :href="`${ time['video'] }`" target="_blank" v-bind:style="'color: inherit'">{{ time['time'] }}</a>
              </td>
              <td v-else v-bind:style="[time['isCr?'] ? {'color':'lime'} : {'color':'inherit'}]">{{ time['time'] }}</td>
              <td v-if="Object.keys(time).includes('std')" class="td-limited-width" v-bind:class="['std' + time['std'][0]]">{{ time['std'] }}</td>
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
#trackDetails {
  overflow-x:auto;
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

.stdG {
  background-color: rgba(0,255,0,0.5);
}

.stdM {
  background-color: rgba(255,0,0,0.5);
}

.stdT {
  background-color: rgba(0,0,255,0.5);
}

.stdH {
  background-color: rgba(255,255,0,0.5);
}

.stdE {
  background-color: rgba(255,0,255,0.5);
}

.stdA {
  background-color: rgba(127,0,0,0.5);
}

.stdI {
  background-color: rgba(0,127,0,0.5);
}

.stdB {
  background-color: rgba(0,0,127,0.5);
}

.stdN {
  background-color: rgba(127,127,0,0.5);
}
</style>