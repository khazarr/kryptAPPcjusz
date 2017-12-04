import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    splitter: {
      namespaced: true,
      state: {
        open: false
      },
      mutations: {
        toggle (state, shouldOpen) {
          if (typeof shouldOpen === 'boolean') {
            state.open = shouldOpen
          } else {
            state.open = !state.open
          }
        }
      }
    },
    core: {
      state: {
        cryptoData: null,
        loading: true,
        mockData: [
          {
            id: 'bitcoin',
            name: 'Bitcoin',
            symbol: 'BTC',
            rank: '1',
            price_usd: '11784.5',
            price_btc: '1.0',
            volume_usd: '5508190000.0',
            market_cap_usd: '197009146425',
            available_supply: '16717650.0',
            total_supply: '16717650.0',
            max_supply: '21000000.0',
            percent_change_1h: '-0.5',
            percent_change_24h: '6.38',
            percent_change_7d: '26.78',
            last_updated: '1512328753'
          }
        ]
      },
      mutations: {
        setCryptoData (state, payload) {
          state.cryptoData = payload
          console.log(state)
        },
        concatCryptoData (state, payload) {
          state.cryptoData = state.cryptoData.concat(payload)
          console.log('concating')
          console.log(state)
        },
        setLoading (state, payload) {
          state.loading = payload
          console.log('loading: ' + payload)
        }
      },
      actions: {
        obtainCryptoData ({commit}) {
          commit('setLoading', true)
          // check if data is stored in IndexedDB
          axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=10')
            .then(response => {
              commit('setCryptoData', response.data)
            })
            .catch(e => {
              console.log(e)
              commit('setLoading', false)
            })
          commit('setLoading', false)
        },
        obtainMoreCryptoData ({commit}, payload) {
          // check if data is stored in IndexedDB
          const start = payload
          const end = payload + 10
          const url = `https://api.coinmarketcap.com/v1/ticker/?start=${start}&limit=${end}`

          axios.get(url)
            .then(response => {
              console.log(response.data)
              commit('concatCryptoData', response.data)
            })
            .catch(e => {
              console.log(e)
            })
        }
      },
      getters: {
        getCryptoData (state) {
          return state.cryptoData
          // return state.mockData
        },
        getLoadingStatus (state) {
          return state.loading
        },
        getMockData (state) {
          return state.mockData
        }
      }
    }
  }
})
