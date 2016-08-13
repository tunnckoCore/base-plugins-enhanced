/*!
 * base-plugins-enhanced <https://github.com/tunnckoCore/base-plugins-enhanced>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var test = require('mukla')
var plugins = require('./index')
var Base = require('base')

test('should `.use` be able to accept array of functions', function (done) {
  var app = new Base()
  app.use(plugins())

  // test multiple plugins in one `.use`
  app.use([
    function addFoo (app) {
      app.foo = 'bar'
    },
    function addBar (app) {
      app.bar = 'qux'
    }
  ])
  test.strictEqual(app.foo, 'bar')
  test.strictEqual(app.bar, 'qux')
  done()
})

test('should be able to pass options to each plugin', function (done) {
  var app = new Base(null, { x: 'y' })
  app.use(plugins({ aa: 'aaa' }))

  // test options as second argument
  app
    .use(function foobar (app) {
      app.foobar = 123
    }, {
      a: 'b', c: 'd'
    })
    .use(function qux (app) {
      app.options.qux = 456
    }, {
      q: 'zzz'
    })

  test.deepEqual(app.options, {
    x: 'y',
    aa: 'aaa',
    a: 'b',
    c: 'd',
    qux: 456,
    q: 'zzz'
  })
  done()
})

test('should emit `error` event when error occures', function (done) {
  var app = new Base()
  app
    .once('error', function (err) {
      test.strictEqual(err instanceof Error, true)
      test.strictEqual(err.message, '~~err plugin~~')
      done()
    })
    .use(plugins())

  app.use(function erroredPlugin (app) {
    throw new Error('~~err plugin~~')
  })
})

test('should `.use` be able to accept array of functions', function (done) {
  var app = new Base()
  var cnt = 0

  app.use(plugins())
  app.on('error', function () {
    cnt++
  })

  // test multiple plugins in one `.use`
  app.use([
    function addFoo (app) {
      throw new Error('~~plugin one~~')
    },
    function addBar (app) {
      throw new Error('~~plugin one~~')
    }
  ])
  test.strictEqual(cnt, 2)
  done()
})

test('should work with `base-plugins`', function (done) {
  var app = new Base()
  app
    .use(require('base-plugins')())
    .use(plugins())

  app.use([
    function aaa (app) {
      return function (ctx) {
        ctx.aaa = 'bbb'
      }
    },
    function bbb (app) {
      return function (ctx) {
        ctx.ccc = 'ddd'
      }
    }
  ])
  var foo = { foo: 'bar' }
  app.run(foo)
  test.strictEqual(foo.foo, 'bar')
  test.strictEqual(foo.aaa, 'bbb')
  test.strictEqual(foo.ccc, 'ddd')
  done()
})

test('should emit error (when using `base-plugins`)', function (done) {
  var app = new Base()
  app
    .on('error', function (err) {
      test.strictEqual(err instanceof Error, true)
      test.strictEqual(err.message, 'foo err bar')
      done()
    })
    .use(require('base-plugins')())
    .use(plugins())
    .use(function aaa (app) {
      return function (ctx) {
        test.strictEqual(ctx.aaa, 111)
        throw new Error('foo err bar')
      }
    })
    .run({ aaa: 111 })
})
