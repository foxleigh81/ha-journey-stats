'use strict'

export default {
  get: jest.fn((url) => {
    return Promise.resolve({
      data: 'data'
    })
  }),
  post: jest.fn((url) => {
    return Promise.resolve({
      data: 'data'
    })
  }),
  create: jest.fn(function () {
    return this
  })
}
