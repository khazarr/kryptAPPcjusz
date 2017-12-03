<template>
<v-ons-card>
  <div class="title">
    {{symbol}} | {{name}}
  </div>
  <div class="content">
      <v-ons-list>
        <v-ons-list-item>
          <div class="left">
            Price USD
          </div>

          <div class="right price">
            {{price_usd}} $
          </div>
        </v-ons-list-item>
        <v-ons-list-item>
          <div class="left">
            Price BTC
          </div>

          <div class="right price">
           {{price_btc}} BTC
          </div>
        </v-ons-list-item>
        <v-ons-list-item>
          <div class="left">
            Percent change
          </div>

          <div class="right">
            <span class="percent-change" :class="{positive: isPositive1h, negative: !isPositive1h}">
              1h: {{percent_change_1h}}%
            </span>
            <span class="percent-change" :class="{positive: isPositive24h, negative: !isPositive24h}">
              24h: {{percent_change_24h}}%
            </span>
          </div>
        </v-ons-list-item>
      </v-ons-list>
  </div>
</v-ons-card>
</template>

<script>
export default {
  data () {
    return {
      isPositive1h: false,
      isPositive24h: false
    }
  },
  props: [
    'name',
    'symbol',
    'price_usd',
    'price_btc',
    'percent_change_1h',
    'percent_change_24h',
    'percent_change_7d',
    'last_updated'
  ],
  created () {
    this.percent_change_1h > 0 ? this.isPositive1h = true : this.isPositive1h = false
    this.percent_change_24h > 0 ? this.isPositive24h = true : this.isPositive24h = false
  }
}
</script>

<style scoped>
.positive {
  color: #7FFF00;
  font-size: 16px;
  font-weight: 600;
  margin-left: 20px;
}
.negative {
  color: #DC143C;
  font-size: 16px;
  font-weight: 600;
  margin-left: 20px;
}

.price {
  font-size: 16px;
  font-weight: 600;
}
</style>
