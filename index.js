/*!
 * base-plugins-enhanced <https://github.com/tunnckoCore/base-plugins-enhanced>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var utils = require('./utils')

module.exports = function basePluginsEnhanced (options) {
  return function enhancedUseMethod (app) {
    if (app.isRegistered('base-plugins-enhanced')) return

    var originalUse = app.use.bind(app)
    app.options = utils.extend({}, app.options, options)
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
