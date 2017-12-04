<template>
  <v-ons-page :infinite-scroll="loadMore">
    <v-ons-toolbar class="home-toolbar">
      <div class="left">
        <v-ons-toolbar-button @click="$store.commit('splitter/toggle')">
          <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center">{{ msg }}</div>
    </v-ons-toolbar>

    <v-ons-pull-hook
      :action="loadData"
      @changestate="pullState = $event.state"
    >
      <span v-show="pullState === 'initial'"> Pull to refresh </span>
      <span v-show="pullState === 'preaction'"> Release </span>
      <span v-show="pullState === 'action'"> Loading... </span>
    </v-ons-pull-hook>

    <div class="center" v-show="getLoadingStatus || pullState === 'action'">
      <v-ons-icon icon="ion-load-b" spin size="150px"></v-ons-icon>
    </div>

    <div v-if="!getLoadingStatus">
      <CurrencyInfo
       v-for = "crypto in getCryptoData"
       :key = "crypto.id"
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

    <div class="after-list">
      <v-ons-icon icon="fa-spinner" size="26px" spin></v-ons-icon>
    </div>
  </v-ons-page>
</template>

<script>
import CurrencyInfo from './CurrencyInfo.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      msg: 'kryptAPPcjusz',
      pullState: 'initial',
      maxIndex: 10
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
    },
    loadData (done) {
      console.log('ladowanko')
      this.$store.dispatch('obtainCryptoData')
      console.log(this.getLoadingStatus)
      let interval = setInterval(() => {
        if (!this.getLoadingStatus) {
          done()
          clearInterval(interval)
        }
        console.log(this.getLoadingStatus)
      }, 100)
    },
    loadMore (done) {
      console.log('dej wincyj')
      this.$store.dispatch('obtainMoreCryptoData', this.maxIndex)
      this.maxIndex += 10
      done()
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

.after-list{
  text-align: center;
}
</style>
