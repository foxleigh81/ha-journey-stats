'use strict'

import {
  state,
  types,
  getters,
  mutations,
  actions
} from '@/store/examplemodule'

let mockState

beforeEach(() => {
  mockState = state()
})

describe('mutations', () => {
  it('SET_FOO', () => {
    expect(mockState.foo).toBeNull()
    mutations[types.SET_FOO](mockState, { foo: {} })
    expect(mockState.foo).not.toBeNull()
  })
})

describe('getters', () => {
  it('isFoo returns boolean based on foo state', () => {
    expect(getters.status(mockState)).toBe(false)
    mutations[types.SET_FOO](mockState, { foo: {} })
    expect(getters.status(mockState)).toBe(true)
  })
})

describe('actions', () => {
  let commit

  beforeEach(() => {
    commit = jest.fn()
  })

  it('setFoo commits SET_FOO mutation', () => {
      actions.setFoo({ commit: commit }, { foo: {} })

      expect(commit).toBeCalledWith({
        type: types.SET_FOO,
        foo: {}
      })
  })
})
