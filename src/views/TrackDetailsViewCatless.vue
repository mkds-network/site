<template>
  <div id="track-details">
    <h1><h1>{{ this.$route.params.track }}: {{ this.$route.params.format }}</h1></h1>
  </div>
  <div>
    <div class="table-border">
      <table class="rankings-table">
        <thead>
          <tr>
            <th class="th-limited-width">Rank</th>
            <th>Player</th>
            <th>Time</th>
            <th v-if="this.times != null && Object.keys(this.times[0]).includes('std')">Std</th>
            <th class="th-limited-width">#</th>
            <th>Country</th>
            <th v-if="this.times != null && Object.keys(this.times[0]).includes('date')">Date</th>
          </tr>
        </thead>
        <tbody v-for="time in this.times" v-bind:key="time.rank">
          <tr>
            <td>{{ time['rank'] }}</td>
            <td>{{ time['player'] }}</td>
            <td v-if="time['video'] != null">
              {{ time['time'] }}
              <a :href="`${time['video'][0]}`">
                <img :class="`${time['video'][1]} icon`">
              </a>
              <img v-bind:class="[time['isFwrHolder?'] ? 'former-world-record-holder space icon' : '']">
            </td>
            <td v-else>
              {{ time['time'] }}
              <img v-bind:class="[time['isFwrHolder?'] ? 'former-world-record-holder icon' : '']">
            </td>
            <td v-if="Object.keys(time).includes('std')" v-bind:class="['std' + time['std'][0]]">
              {{ time['std'] }}
            </td>
            <td>
              <img :class="`country-flag ${time['country']}`">
            </td>
            <td>
              {{ time['country'] }}
              <img v-bind:class="[time['isCr?'] ? 'country-record icon' : '']">
            </td>
            <td v-if="Object.keys(time).includes('date')">{{ time['date'] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>

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
    getTrackData: async function () {
      const route = useRoute()
      this.times = await import(`../data/times/${route.params.extension}/${route.params.format}/${route.params.track}.json`).then(module => {
        return module.default;
      });
    }
  },
  async created() {
    await this.getTrackData();
  }
}
</script>

<style scoped>
#track-details {
  margin: 8px 16px;
}

.rankings-table {
  text-align: center;
  width: 99%;
  border-collapse: collapse;
  margin: auto;
  position: relative;
}

.table-border {
  border-radius: 10px;
  border: thin solid white;
  margin: 15px 10px;
  width: 70%;
  background-color: rgba(0, 0, 0, 0.2);
}

.th-limited-width {
  width: 40px;
}

tr {
  border-top: thin solid darkgray;
  border-radius: 10px;
}

th {
  padding: 6px;
  font-weight: bolder;
  font-size: 14px;
}

td {
  padding: 3px;
  position: relative;
}

.icon {
  height: 16px;
  position: absolute;
}

.country-record {
  content: url('../assets/country-record.png');
  right: 0;
}

.former-world-record-holder {
  content: url('../assets/former-world-record-holder.png');
  right: 0;
  margin-right: 5px;
}

.video {
  content: url('../assets/video.png');
  right: 0;
  margin-right: 5px;
}

.image {
  content: url('../assets/image.png');
  right: 0;
  margin-right: 5px;
}

.country-flag {
  border: thin solid darkgrey;
  height: 16px;
  margin-bottom: 1px;
}

.Japan {
  content: url('../assets/countries/Japan.png');
}

.Italy {
  content: url('../assets/countries/Italy.png');
}

.USA {
  content: url('../assets/countries/USA.png');
}

.Germany {
  content: url('../assets/countries/Germany.png');
}

.Spain {
  content: url('../assets/countries/Spain.png');
}

.space {
  margin-right: 24px;
}

.stdG {
  background-color: rgba(24, 191, 245, 0.4);
}

.stdM {
  background-color: rgba(0, 153, 255, 0.4);
}

.stdT {
  background-color: rgba(48, 111, 209, 0.4);
}

.stdH {
  background-color: rgba(114, 98, 231, 0.4);
}

.stdE {
  background-color: rgba(180, 78, 180, 0.4);
}

.stdA {
  background-color: rgba(189, 70, 130, 0.4);
}

.stdI {
  background-color: rgba(211, 69, 92, 0.4);
}

.stdB {
  background-color: rgba(234, 57, 63, 0.4);
}

.stdN {
  background-color: rgba(201, 44, 32, 0.4);
}
</style>