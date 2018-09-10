'use strict'

import Vuex from 'vuex'

import examplemodule from '@/store/examplemodule'

export const state = () => ({
  //
})

export const types = {
  //
}

export const getters = {
  //
}

export const mutations = {
  //
}

export const actions = {
  //
}

let store

const initStore = () => {
  return store || (store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
      examplemodule
    }
  }))
}

export default initStore
