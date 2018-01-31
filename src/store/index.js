import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'

/* eslint-disable */
Vue.use(Vuex)

const state = {
  user: ''
};

export default new Vuex.Store({
  state: state,
  mutations,
  getters
})
