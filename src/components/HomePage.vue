<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="left">
        <v-ons-toolbar-button @click="$store.commit('splitter/toggle')">
          <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center">{{ msg }}</div>
    </v-ons-toolbar>

    <div class="center" v-if="getLoadingStatus">
      <v-ons-icon icon="ion-load-b" spin size="150px"></v-ons-icon>
    </div>

    <div v-if="!getLoadingStatus">
      <CurrencyInfo
       v-for="crypto in getCryptoData"

       :name = "crypto.name"
       :symbol = "crypto.symbol"
       :price_usd = "crypto.price_usd"
       :price_btc = "crypto.price_btc"
       :percent_change_1h = "crypto.percent_change_1h"
       :percent_change_24h = "crypto.percent_change_24h"
       :percent_change_7d = "crypto.percent_change_7d"
       :last_updated = "crypto.last_updated"
      ></CurrencyInfo>
    </div>
{{getCryptoData}}
  </v-ons-page>
</template>

<script>
import CurrencyInfo from './CurrencyInfo.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      msg: 'kryptAPPcjusz'
    }
  },
  components: {
    CurrencyInfo
  },
  computed: {
    ...mapGetters([
      'getCryptoData',
      'getLoadingStatus',
      'getMockData'
    ])
  },
  methods: {
    goTo (url) {
      window.open(url, '_blank')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  text-align: center;
}

.home-toolbar{
  /*background-color: #e5eaef;*/
}

img {
  max-width: 300px;
}

ons-list-title {
  text-transform: none;
}

ons-list-title:not(:first-of-type) {
  margin-top: 30px;
}

ons-card {
  text-align: center;
}

ons-list-item, ons-card {
  cursor: pointer;
}

.center {
  text-align: center;
}
</style>
