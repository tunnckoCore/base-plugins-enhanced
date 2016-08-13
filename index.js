/*!
 * base-plugins-enhanced <https://github.com/tunnckoCore/base-plugins-enhanced>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var utils = require('./utils')

/**
 * > Upgrade the built-in plugin system or that
 * comes from [base-plugins][] to have error handling
 * and some little extra stuff. Like you can pass array
 * of plugins to `.use` method and also `options` object
 * as second argument.
 *
 * **Example**
 *
 * ```js
 * var plugins = require('base-plugins-enhanced')
 * var Base = require('base')
 * var app = new Base()
 *
 * app
 *   .use(plugins())
 *   .use(function foo () {}, { aa: 'bb' })
 *   .use(function bar () {}, { xx: 'yy' })
 *   .use([
 *     function pluginOne () {},
 *     function pluginTwo () {},
 *   ], opts)
 * ```
 *
 * @param  {Object} `options` object merge with `app.options`
 * @return {Function} plugin executed by `.use` method
 * @api public
 */
module.exports = function basePluginsEnhanced (options) {
  return function enhancedUseMethod (app) {
    if (app.isRegistered('base-plugins-enhanced')) return

    var originalUse = app.use.bind(app)
    app.options = utils.extend({}, app.options, options)

    /**
     * > Add plugin to your [base][] application. See Base's or
     * the [base-plugins][] documentation.
     *
     * **Example**
     *
     * ```js
     * app.use([
     *   function one () {},
     *   function two () {}
     * ], { foo: 'bar' })
     * ```
     *
     * @name   .use
     * @param  {Function|Array} `fn` function or array of functions
     * @param  {Object} `opts` options to be merged with `app.options`
     * @return {Base} instance for chaining
     * @api public
     */

    app.define('use', function use (fn, opts) {
      if (utils.isObject(opts)) {
        app.options = utils.extend({}, app.options, opts)
      }
      if (utils.isArray(fn)) {
        fn.forEach(function (plugin) {
          try {
            originalUse(plugin)
          } catch (err) {
            app.emit('error', err)
          }
        })
        return app
      }
      if (typeof fn === 'function') {
        try {
          originalUse(fn)
        } catch (err) {
          app.emit('error', err)
        }
        return app
      }
    })

    if (app.run) {
      var originalRun = app.run.bind(app)

      /**
       * > Run the stack of plugins. See more on [base-plugins][]
       * documentation on `.run` method.
       *
       * **Example**
       *
       * ```js
       * app
       *   .use(function foo (app) {
       *     return function (ctx) {
       *       ctx.foo = 'fooooo'
       *     }
       *   }, { first: 'yes' })
       *   .use([
       *     function bar (app) {
       *       return function (ctx) {
       *         ctx.bar = 'barrr'
       *       }
       *     }
       *     function baz (app) {
       *       return function (ctx) {
       *         ctx.qux = 123
       *       }
       *     }
       *   ], { multiple: true })
       *   .use(function qux (app) {
       *     app.zzz = 'yyyy'
       *   }, { aaa: bbb })
       *
       * var obj = { charlike: 'mike' }
       * app.run(obj)
       *
       * console.log(app.zzz)
       * // => 'yyyy'
       *
       * console.log(obj)
       * // => { foo: 'fooooo', bar: 'barrr', qux: 123 }
       *
       * console.log(app.options)
       * // => { first: 'yes', multiple: true, aaa: 'bbb', charlike: 'mike' }
       * ```
       *
       * @name   .run
       * @param  {Object} `val` object to be passed to each smart plugin
       * @return {Base} instance for chaining
       * @api public
       */

      app.define('run', function run (val) {
        try {
          originalRun(val)
        } catch (err) {
          app.emit('error', err)
        }
        return app
      })
    }
  }
}
