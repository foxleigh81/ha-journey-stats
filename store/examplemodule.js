'use strict'

export const state = () => ({
  foo: null
})

export const types = {
  SET_FOO: 'SET_FOO'
}

export const getters = {
  status: state => !!state.foo
}

export const mutations = {
  [types.SET_FOO] (state, { foo }) {
    state.foo = foo || null
  }
}

export const actions = {
  setFoo ({ commit }, { foo }) {
    commit({
      type: types.SET_FOO,
      foo: foo
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
