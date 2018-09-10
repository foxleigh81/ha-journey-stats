'use strict'

import RESTfulAPIService from '@/api/RESTfulAPIService'

class ExampleService extends RESTfulAPIService {
  constructor () {
    super('https://hostname')
  }

  getExample () {
    return this.handleRequest({
      url: '/example/endpoint',
      method: 'GET'
    })
  }

  postExample ({ foo, bar }) {
    return this.handleRequest({
      url: `/example/${foo}`,
      method: 'POST',
      data: bar
    }, () => {
      throw new Error('Throwing a custom error')
    })
  }
}

export default new ExampleService()
