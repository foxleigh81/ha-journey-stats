'use strict'

import { shallow } from 'vue-test-utils'
import { createRenderer } from 'vue-server-renderer'

import AppLogo from '@/components/presentational/AppLogo'

describe('AppLogo.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(AppLogo)
  })

  it('snapshot: has same HTML structure', () => {
    const renderer = createRenderer()

    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) {
        throw new Error(err)
      }

      expect(str).toMatchSnapshot()
    })
  })
})
