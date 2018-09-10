'use strict'

/**
 * Redirect to trailing slash equivalent
 *
 * This middleware is required when deploying to some cloud buckets
 * GCP redirects URLs without a trailing slash to `index.html`
 *
 * https://stackoverflow.com/questions/47910941/gcp-static-hosting-redirects-to-index-html
 */

export default function ({ route, redirect }) {
  if (route.path.includes('index.html')) {
    redirect(route.path.replace('index.html', ''))
  }
}
