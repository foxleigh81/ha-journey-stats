'use strict'

import axios from 'axios'

export const BASE_URI = 'https://hostname'

export default class RESTfulAPIService {
  constructor (baseURI = BASE_URI) {
    this._setupClient(baseURI)
    this._registerInterceptors()
  }

  async handleRequest (request, errorCallback = null) {
    this._setAuthorizationHeader()

    try {
      return await this._client.request(request)
    } catch ({ response }) {
      errorCallback
        ? errorCallback(response)
        : this._handleError(response)
    }
  }

  _setAuthorizationHeader () {
    this._client.defaults.headers.Authorization = `Bearer JWT` // Must be populated with auth JWT
  }

  _setupClient (baseURI) {
    this._client = axios.create({
      baseURL: baseURI
    })
  }

  _registerInterceptors () {
    this._interceptorRemoveLinksObject()
  }

  /**
   * http://jsonapi.org/format/#document-links
   */
  _interceptorRemoveLinksObject () {
    this._client.interceptors.response.use((response) => {
      // No `data` in response - exit early
      if (!response.data.hasOwnProperty('data')) {
        return response
      }

      // Clean up response
      if (Array.isArray(response.data.data)) {
        for (const item of response.data.data) {
          if (item.hasOwnProperty('links')) {
            delete item.links
          }
        }
      } else if (response.data.data.hasOwnProperty('links')) {
        delete response.data.data.links
      }

      return response
    })
  }

  _handleError ({ data, status }) {
    const { error } = data

    // NOTE: Do something with the error

    if (status === 403) { // Forbidden
      this._handleSignOut()
    }
  }

  _handleSignOut () {
    // NOTE: Handle sign out
  }
}
