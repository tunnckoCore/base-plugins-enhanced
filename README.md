# [base-plugins-enhanced][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] [![npm downloads][downloads-img]][downloads-url] 

> Error handling and extras for `.use` and `.run` methods of your Base apps. Modifies `.use` method to be able to 1) accept array of functions, 2) options object as second argument. Emits `error` event if some plugin fails.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]

## Install
```
npm i base-plugins-enhanced --save
```

## Usage
> For more use-cases see the [tests](./test.js)

```js
const basePluginsEnhanced = require('base-plugins-enhanced')
```

### [basePluginsEnhanced](index.js#L41)
> Upgrade the built-in plugin system or that comes from [base-plugins][] to have error handling and some little extra stuff. Like you can pass array of plugins to `.use` method and also `options` object as second argument.

**Params**

* `options` **{Object}**: object merge with `app.options`    
* `returns` **{Function}**: plugin executed by `.use` method  

**Example**

```js
var plugins = require('base-plugins-enhanced')
var Base = require('base')
var app = new Base()

app
  .use(plugins())
  .use(function foo () {}, { aa: 'bb' })
  .use(function bar () {}, { xx: 'yy' })
  .use([
    function pluginOne () {},
    function pluginTwo () {},
  ], opts)
```

### [.use](index.js#L67)
> Add plugin to your [base][] application. See Base's or the [base-plugins][] documentation.

**Params**

* `fn` **{Function|Array}**: function or array of functions    
* `opts` **{Object}**: options to be merged with `app.options`    
* `returns` **{Base}**: instance for chaining  

**Example**

```js
app.use([
  function one () {},
  function two () {}
], { foo: 'bar' })
```

### [.run](index.js#L142)
> Run the stack of plugins. See more on [base-plugins][] documentation on `.run` method.

**Params**

* `val` **{Object}**: object to be passed to each smart plugin    
* `returns` **{Base}**: instance for chaining  

**Example**

```js
app
  .use(function foo (app) {
    return function (ctx) {
      ctx.foo = 'fooooo'
    }
  }, { first: 'yes' })
  .use([
    function bar (app) {
      return function (ctx) {
        ctx.bar = 'barrr'
      }
    }
    function baz (app) {
      return function (ctx) {
        ctx.qux = 123
      }
    }
  ], { multiple: true })
  .use(function qux (app) {
    app.zzz = 'yyyy'
  }, { aaa: bbb })

var obj = {a: 'b'}
app.run(obj)

console.log(app.zzz)
// => 'yyyy'

console.log(obj)
// => { foo: 'fooooo', bar: 'barrr', qux: 123 }

console.log(app.options)
// => { first: 'yes', multiple: true, aaa: 'bbb', }
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/base-plugins-enhanced/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckoCore.tk][author-www-img]][author-www-url] [![keybase tunnckoCore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]

[base-plugins]: https://github.com/node-base/base-plugins
[base]: https://github.com/node-base/base

[npmjs-url]: https://www.npmjs.com/package/base-plugins-enhanced
[npmjs-img]: https://img.shields.io/npm/v/base-plugins-enhanced.svg?label=base-plugins-enhanced

[license-url]: https://github.com/tunnckoCore/base-plugins-enhanced/blob/master/LICENSE
[license-img]: https://img.shields.io/npm/l/base-plugins-enhanced.svg

[downloads-url]: https://www.npmjs.com/package/base-plugins-enhanced
[downloads-img]: https://img.shields.io/npm/dm/base-plugins-enhanced.svg

[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/base-plugins-enhanced
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/base-plugins-enhanced.svg

[travis-url]: https://travis-ci.org/tunnckoCore/base-plugins-enhanced
[travis-img]: https://img.shields.io/travis/tunnckoCore/base-plugins-enhanced/master.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/base-plugins-enhanced
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/base-plugins-enhanced.svg

[david-url]: https://david-dm.org/tunnckoCore/base-plugins-enhanced
[david-img]: https://img.shields.io/david/tunnckoCore/base-plugins-enhanced.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg

