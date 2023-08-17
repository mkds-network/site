<template>
  <div id="track-details" class="row">
    <h2 v-if="this.category == undefined" id="track-title"><b>{{ this.name }}</b> : {{ this.format }}</h2>
    <h2 v-else id="track-title"><b>{{ this.name }}</b> : {{ this.format }} ({{ this.category }})</h2>
    <div class="col-md-3 order-md-2">
      <div id="track-statistics">
        Hi Pika !<br><br>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec hendrerit nulla dignissim dui vulputate gravida.
          Maecenas aliquam a leo non viverra. Morbi facilisis justo erat, vel sollicitudin quam gravida vitae. Donec cursus consequat neque.
          Aenean non pellentesque ante. Mauris imperdiet fringilla pharetra. Etiam non dui et purus lobortis viverra et eu quam.
          <br><br>
          Proin velit ante, fermentum at lectus nec, pretium ullamcorper ipsum. Phasellus facilisis arcu at nisi lobortis, tincidunt viverra ante lobortis.
          In ullamcorper nec augue in tempor. Donec quis mollis justo. Nullam luctus non ex nec pellentesque. Praesent at blandit tortor.
          In libero ex, aliquam ut imperdiet sed, imperdiet id felis. Aenean id finibus nisl. Sed semper bibendum metus non vehicula.
        </p>
      </div>
    </div>
    <div class="col-md-9 order-md-1">
      <div id="track-table">
        <table id="rankings-table">
          <thead>
            <tr id="rankings-table-head">
              <th class="limited-width">Rank</th>
              <th>Player</th>
              <th class="minimal-width">Time</th>
              <th v-if="this.times != null && Object.keys(this.times[0]).includes('std')">Std</th>
              <th class="limited-width">#</th>
              <th class="minimal-width">Country</th>
              <th v-if="this.times != null && Object.keys(this.times[0]).includes('date')">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="time in this.times" v-bind:key="time.rank">
              <td>{{ time['rank'] }}</td>
              <td>{{ time['player'] }}</td>
              <td v-if="time['proof'] != null">
                <span></span>{{ time['time'] }}
                <a target="_blank" :href="`${time['proof'][0]}`">
                  <img :class="`${time['proof'][1]} icon`" title="See Proof">
                </a>
                <img v-if="time['isFwrHolder?']" class="former-world-record-holder space icon" title="Former World Record">
              </td>
              <td v-else>
                {{ time['time'] }}
                <img v-if="time['isFwrHolder?']" class="former-world-record-holder icon" title="Former World Record">
              </td>
              <td v-if="Object.keys(time).includes('std')" v-bind:class="['std' + time['std'][0]]">
                {{ time['std'] }}
              </td>
              <td>
                <img v-bind:src="require('../assets/countries/' + loadFlag(time.country) + '.png')" class="country-flag" >
              </td>
              <td style="min-width:130px;">
                {{ time['country'] }}
                <img v-if="time['isCr']" class="country-record icon" title="Country Record">
              </td>
              <td v-if="Object.keys(time).includes('date')">{{ time['date'] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
    
    
<script>
import { useRoute } from 'vue-router';

export default {
  name: 'TrackDetailsView',
  data() {
    const route = useRoute();
    return {
      times: null,
      name: null,
      extension: route.params.extension,
      category: route.params.category,
      format: route.params.format,
      track: route.params.track,
    }
  },
  methods: {
    getTrackData: async function () {
      let preview = null;
      if(this.category == undefined) {
        this.times = await import(`../data/times/${ this.extension }/${ this.format}/${ this.track }.json`).then(module => {
          return module.default;
        });
        preview = await import(`../data/times/${ this.extension }/preview.json`).then(module => {
          return module.default;
        });
      }
      else {
        this.times = await import(`../data/times/${ this.extension }/${ this.category }/${ this.format}/${ this.track }.json`).then(module => {
          return module.default;
        });
        preview = await import(`../data/times/${ this.extension }/${ this.category }/preview.json`).then(module => {
          return module.default;
        });
      }
      this.name = preview.filter(p => p.id === this.track)[0].name;
    },
    loadFlag(country) {
      var countries = require.context('../assets/countries', false, /\.png$/);
      if(!countries.keys().includes('./' + country + '.png')) {
        return 'MissingFlag';
      }
      return country;
    }
  },
  async created() {
    await this.getTrackData();
  }
}
</script>

<style scoped>
#track-details {
  margin: 2px;
}

#track-title {
  text-align: center;
  margin: 15px 0;
}

#track-statistics {
  overflow-x: auto;
  border-radius: 10px;
  border: thin solid white;
  padding: 5px 10px;
  margin: 5px 0;
}

#track-table {
  overflow-x: auto;
  border-radius: 10px;
  border: thin solid white;
  padding: 5px 10px;
  margin: 5px 0;
}

#rankings-table {
  text-align: center;
  border-collapse: collapse;
  width: 100%;
  margin: auto;
}

#rankings-table-head {
  border: none;
}

.limited-width {
  width: 40px;
}

.minimal-width {
  min-width: 135px;
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