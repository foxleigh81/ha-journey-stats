
# Front End Coding Standards

## Getting started

Please take a look at [README.md](README.md) for information on how to get the project up and running.

## Bug tracking

> Add your bug tracking information here

## Git usage

The [Git-flow Workflow](https://github.com/nvie/gitflow) method of managing branches is used. The following rules should be adhered to:

- no work should be carried out directly in `master` or `develop`
- merges into `develop` should be done via a pull request with at least one approval from a peer review
- merges from `develop` into `master` should only be done via `release/[semver]` branch with a PR with at least one approval from a peer review and a confirmation that all tests are passing. The `master` branch will automatically trigger a CI build so this process is for releases only.

### Git-flow conventions

A more thorough guide is available [here](https://jeffkreeftmeijer.com/git-flow), the following is a very brief overview:

In a nutshell, 'git-flow' is a workflow for managing branches in git. This is done by prefixing a branch name with one of the following at time of creation.

- `feature/`: A feature is anything that will add to the project.
- `hotfix/`: If you need to create a branch to fix an error or bug, then it's a hotfix.
- `release/`: Before merging into master, it's a good idea to create a release branch in order to a) capture the release version number in git and b) do the last-minute changes that releases often require (update package.json semver, run local tests/lints to ensure everything is fine, etc...) (You should also add the version number here e.g. `release/0.1.0`)

## Directory structure

The directory structure follows the pattern set by Nuxt so we will not repeat it here, for more information visit: https://nuxtjs.org/guide/directory-structure

## Components

Components live in the `/components` directory of our project. Each component should be a directory and contain the following files:

- `index.vue`
- `scripts.js`
- `styles.scss`

Any component specific assets may also be placed in this directory.

The only required file is index.vue, we use a minor variation on Vue's `SFC (Single File Components)` syntax.

The variation being that we import our style.scss and scripts.js files in instead of putting everything in one page.

An empty component should have an index.vue file that looks like this:

```html
<template>
  <!-- // Component HTML goes here -->
</template>
<script src="./scripts.js"></script>
<style lang="scss" src="./styles.scss" scoped></style>
```

## Coding styles

### General

- Use spaces for tabs
- Use 2 spaces for indentation
- Trim all trailing whitespace

For the simplest development process, please ensure youre development environment confirms to the project `.editorconfig` file. There are plugins for most (if not all popular editors), find yours [here](https://editorconfig.org/#download).

### Javascript (.js)

#### Coding style

There is little point in writing any specific documentation for JavaScript code style as we are simply using the rules defined by StandardJS.

Here is a link to that ruleset: https://standardjs.com/

#### Type checking

We use FlowJS for type checking, if you are unfamiliar with this, please review the docs at the link below:

https://flow.org/en/docs/

#### Unit testing

Jest is being used for unit testing. All tests can be found within the project root in the `__tests__` directory.

Component tests will be performed with the aid of the `vue-test-utils` library. Testing of the internal implementation detail of a component should be avoided instead focussing on the public interface:

https://vue-test-utils.vuejs.org/

Each presentational component should also include a Jest snapshot for regression testing:

https://jestjs.io/docs/en/snapshot-testing

Mocks should be created in a `__mocks__` directory and placed adjacent to the module being mocked with a matching filename.

#### E2E tests

E2E testing will be achivied by using a combination of Jest and Puppeeteer. Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol.

https://github.com/GoogleChrome/puppeteer

### HTML (.vue, .html)

Most HTML will be stored in `.vue` templates, however there are edge cases where plain `.html` is acceptable (excluding the entry `index.html` page of course).

Please code using standard HTML5 the only non-standard HTML elements used are Vue directives (e.g. `v-if`, `v-for` etc...). If for any reason you require a custom attribute, please use a data attribute

#### Acceptable

````html
<template>
  <section v-bind:class="magic" data-custom-attr="kinda">
    <span>It's a kinda magic</span>
  </section>
</template>
````

#### Unacceptable

````html
<template>
  <section v-bind:class="magic" custom-attr="kinda">
    <span>It's a kinda magic</span>
  </section>
</template>
````

The use of shorthand vue directives is encouraged:

#### e.g

```html
 <p :class="terse">
   `:class` is the same as `v-bind:class`
 </p>
```

### CSS (.sass, .css)

Sass is our preprocessor of choice, it should be specified in the component file. All component styles should be scoped by default.

#### ElementUI Theme Customisation

Application specific SCSS is encapsulated within single file `*.vue` components.

In addition to this the Element UI component library theme can be customised.

http://element.eleme.io/#/en-US/component/custom-theme#cli-theme-tool

```bash
# install CLI theme generator

$ npm install element-theme -g

# make appropriate modifications to `./element-variables.scss`

# generate theme CSS see `./theme`

$ et
```

The active theme can be set within the Nuxt WebPack extended build  configuration:

`./nuxt.config.js`

```javascript
  /**
   * Build configuration (webpack extension)
   */
  build: {
    babel: {
      presets: ['vue-app', 'stage-2'],
      plugins: [
        [
          'component',
          [
            {
              libraryName: 'element-ui',
              styleLibraryName: '~theme' // 'theme-chalk'
            }
          ]
        ]
      ],
      comments: false
    },
  }

  ...
```

#### Coding style

As we are using styles which are scoped to the component and each component should have a single task so BEM notation should not be required or used.

If you require the use of a modifier the `--modifier-state` syntax is still acceptable.

#### This is acceptable

```scss
.button {
  padding: $spacing;
  text-align: centre;
  background-color: #f00;
  color: #333;
  &--status-disabled {
    background-color: #ccc;
  }
}
```

#### This is unacceptable

```scss
 .form {
   &__button {
    padding: $spacing;
    text-align: centre;
    background-color: #f00;
    color: #333;
    &--status-disabled {
      background-color: #ccc;
    }
   }
 }
```

In the example above, form and button should be two components and therefor each have their own scoped styles.

#### Global CSS

Any CSS which is not specific to a component should live in the `/assets/styles` folder, exceptions to this are if styling is page or layout specific and if so, they should live in their respective subfolders in `/pages` or `/layouts`.

#### Variables

Regular sass-style variables are used in the project. Global variables are stored in `/assets/styles/_vars`.

Please keep variables scoped to their components where possible so as not to pollute the global scope.

#### Grid

`< TODO >`

#### Responsive

Breakpoint variables and mixins are set in `/assets/styles/_breakpoints.scss`.

There are global breakpoints set as follows:

name | size
---- | ----
`x-large` | `> 1600px`
`large` | `> 1024px`
`medium` | `> 800px`
`small` | `> 480px`
`x-small` | `> 280px`

Custom breakpoints should be added at any point the layout breaks, these should be scoped to the component/page/layout wherever possible.
