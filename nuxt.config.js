'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
    /**
     * Router config
     */
    router: {
        middleware: [
            'index-html-redirect'
        ]
    },

    /**
     * PWA manifest
     */
    manifest: {
        name: 'GOODSTART',
        lang: 'en',
        display: 'minimal-ui'
    },

    /**
     * Headers of the page
     */
    head: {
        title: 'GOODSTART',
        meta: [
            { charset: 'utf-8' },
            { name: 'theme-color', content: '#C9C9C9' },
            { name: 'author', content: 'GOODSTART' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },

    /**
     * Customize the progress bar color
     */
    loading: {
        color: '#C9C9C9'
    },

    /**
     * Custom plugins
     */
    plugins: [
        { src: '~/plugins/vuex-router-sync.js', ssr: false },
        { src: '~/plugins/event-bus.js', ssr: false },
        { src: '~/plugins/element-directives.js', ssr: true }
    ],

    /**
     * Global CSS
     */
    css: [
        'normalize.css'
    ],

    /**
     * Build configuration (webpack extension)
     */
    build: {
        babel: {
            presets: ['vue-app', 'stage-2'],
            plugins: [
                [
                    'component', [{
                        libraryName: 'element-ui',
                        styleLibraryName: '~theme' // 'theme-chalk'
                    }]
                ]
            ],
            comments: false
        },

        // Global imports (commons bundle)
        vendor: [
            'axios'
        ],

        postcss: [
            require('autoprefixer')(),
            require('postcss-clean')()
        ],

        plugins: [
            new webpack.NormalModuleReplacementPlugin(
                /element-ui[/\\]lib[/\\]locale[/\\]lang[/\\]zh-CN/,
                'element-ui/lib/locale/lang/en'
            )
        ],

        extend(config, { isDev }) {
            // SASS loader pipeline for Vue single file components
            const vueLoader = config.module.rules.find(rule => rule.loader === 'vue-loader')
            vueLoader.options.loaders.scss = 'vue-style-loader!css-loader!sass-loader?' + JSON.stringify({ includePaths: [path.resolve(__dirname), 'node_modules'] })

            // Run ESLint on save
            if (isDev && process.client) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    },

    generate: {
        dir: 'dist'
    },

    /**
     * NuxtJS proxy config in order to get round CORS issues
     */
    modules: [
        // ['@nuxtjs/proxy', { pathRewrite: { '^/api/': '/' }, secure: false }],
        '@nuxtjs/font-awesome',
        '@nuxtjs/apollo', ['@nuxtjs/pwa', { onesignal: false }]
    ],

    apollo: {
        clientConfigs: {
            default: {
                // required
                httpEndpoint: 'http://localhost:3000'
            }
        }
    },

    proxy: {
        // '/api/': 'https://hostname'
    },

    mode: 'spa'
}