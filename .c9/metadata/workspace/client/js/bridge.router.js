{"changed":true,"filter":false,"title":"bridge.router.js","tooltip":"/client/js/bridge.router.js","value":"(function(){\n    var root = this;\n    var Bridge = root.Bridge;\n    \n    var Router = Bridge.Router = function(options) {\n        this.handlers = [];\n        options || (options = {});\n        if (options.routes) this.routes = options.routes;\n        this._bindRoutes();\n        this.initialize.apply(this, arguments);\n    };\n    \n    // Cached regular expressions for matching named param parts and splatted\n    // parts of route strings.\n    var optionalParam = /\\((.*?)\\)/g;\n    var namedParam    = /(\\(\\?)?:\\w+/g;\n    var splatParam    = /\\*\\w+/g;\n    var escapeRegExp  = /[\\-{}\\[\\]+?.,\\\\\\^$|#\\s]/g;\n    \n    // Set up all inheritable **Backbone.Router** properties and methods.\n    _.extend(Router.prototype, {\n    \n        // Initialize is an empty function by default. Override it with your own\n        // initialization logic.\n        initialize: function(){},\n    \n        // Manually bind a single named route to a callback. For example:\n        //\n        //     this.route('search/:query/p:num', 'search', function(query, num) {\n        //       ...\n        //     });\n        //\n        route: function(route, name, callback) {\n          if (!_.isRegExp(route)) route = this._routeToRegExp(route);\n          if (_.isFunction(name)) {\n            callback = nam\n            name = '';\n          }\n          if (!callback) callback = this[name];\n          \n          var router = this;\n          this.handlers.unshift({route: route, callback: function(fragment) {\n            var args = router._extractParameters(route, fragment);\n            router.execute(callback, args);\n            //router.trigger.apply(router, ['route:' + name].concat(args));\n            //router.trigger('route', name, args);\n            //Backbone.history.trigger('route', router, name, args);\n          }});\n          //var router = this;\n          /*\n          Backbone.history.route(route, function(fragment) {\n            var args = router._extractParameters(route, fragment);\n            router.execute(callback, args);\n            router.trigger.apply(router, ['route:' + name].concat(args));\n            router.trigger('route', name, args);\n            Backbone.history.trigger('route', router, name, args);\n          });\n          */\n          return this;\n        },\n        \n        // Execute a route handler with the provided parameters.  This is an\n        // excellent place to do pre-route setup or post-route cleanup.\n        execute: function(callback, args) {\n          if (callback) callback.apply(this, args);\n        },\n    \n        // Simple proxy to `Backbone.history` to save a fragment into the history.\n        navigate: function(fragment, options) {\n          //Backbone.history.navigate(fragment, options);\n          return this;\n        },\n    \n        start: function(options) {\n            \n            //_.bindAll(this, 'checkUrl');\n            \n            //this.root             = this.options.root;\n            //this._wantsHashChange = this.options.hashChange !== false;\n            this._hasPushState    = window.history && window.history.pushState;\n            \n            if (this._hasPushState) {\n                $(window).on('popstate', this.checkUrl);\n            } else if ('onhashchange' in window) {\n                $(window).on('hashchange', this.checkUrl);\n            //} else if (this._wantsHashChange) {\n                //this._checkUrlInterval = setInterval(this.checkUrl, this.interval);\n            }\n            \n            this.checkUrl();\n        },\n    \n        stop: function() {\n            \n        },\n    \n    \n        // Checks the current URL to see if it has changed, and if it has,\n        // calls `loadUrl`, normalizing across the hidden iframe.\n        checkUrl: function(e) {\n          this.loadUrl(this.getHash());\n        },\n    \n        // Attempt to load the current URL fragment. If a route succeeds with a\n        // match, returns `true`. If no defined routes matches the fragment,\n        // returns `false`.\n        loadUrl: function(fragment) {\n          //fragment = this.fragment;\n          return _.any(this.handlers, function(handler) {\n            if (handler.route.test(fragment)) {\n              handler.callback(fragment);\n              return true;\n            }\n          });\n        },\n    \n        getHash: function() {\n            var match = window.location.href.match(/#(.*)$/);\n            return match ? match[1] : '';\n        },\n    \n    \n        // Bind all defined routes to `Backbone.history`. We have to reverse the\n        // order of the routes here to support behavior where the most general\n        // routes can be defined at the bottom of the route map.\n        _bindRoutes: function() {\n          if (!this.routes) return;\n          this.routes = _.result(this, 'routes');\n          var route, routes = _.keys(this.routes);\n          while ((route = routes.pop()) != null) {\n            this.route(route, this.routes[route]);\n          }\n        },\n    \n        // Convert a route string into a regular expression, suitable for matching\n        // against the current location hash.\n        _routeToRegExp: function(route) {\n          route = route.replace(escapeRegExp, '\\\\$&')\n                       .replace(optionalParam, '(?:$1)?')\n                       .replace(namedParam, function(match, optional) {\n                         return optional ? match : '([^/?]+)';\n                       })\n                       .replace(splatParam, '([^?]*?)');\n          return new RegExp('^' + route + '(?:\\\\?([\\\\s\\\\S]*))?$');\n        },\n    \n        // Given a route, and a URL fragment that it matches, return the array of\n        // extracted decoded parameters. Empty or unmatched parameters will be\n        // treated as `null` to normalize cross-browser behavior.\n        _extractParameters: function(route, fragment) {\n          var params = route.exec(fragment).slice(1);\n          return _.map(params, function(param, i) {\n            // Don't decode the search params.\n            if (i === params.length - 1) return param || null;\n            return param ? decodeURIComponent(param) : null;\n          });\n        }\n    \n    });\n\n    Router.extend = Bridge.extendObject;\n    \n    \n\n\n\n\n\n\n\n\n/*\n\n  // Backbone.History\n  // ----------------\n\n  // Handles cross-browser history management, based on either\n  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or\n  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)\n  // and URL fragments. If the browser supports neither (old IE, natch),\n  // falls back to polling.\n  var History = Backbone.History = function() {\n    this.handlers = [];\n    _.bindAll(this, 'checkUrl');\n\n    // Ensure that `History` can be used outside of the browser.\n    if (typeof window !== 'undefined') {\n      this.location = window.location;\n      this.history = window.history;\n    }\n  };\n\n  // Cached regex for stripping a leading hash/slash and trailing space.\n  var routeStripper = /^[#\\/]|\\s+$/g;\n\n  // Cached regex for stripping leading and trailing slashes.\n  var rootStripper = /^\\/+|\\/+$/g;\n\n  // Cached regex for detecting MSIE.\n  var isExplorer = /msie [\\w.]+/;\n\n  // Cached regex for removing a trailing slash.\n  var trailingSlash = /\\/$/;\n\n  // Cached regex for stripping urls of hash.\n  var pathStripper = /#.*$/;\n\n  // Has the history handling already been started?\n  History.started = false;\n\n  // Set up all inheritable **Backbone.History** properties and methods.\n  _.extend(History.prototype, Events, {\n\n    // The default interval to poll for hash changes, if necessary, is\n    // twenty times a second.\n    interval: 50,\n\n    // Are we at the app root?\n    atRoot: function() {\n      return this.location.pathname.replace(/[^\\/]$/, '$&/') === this.root;\n    },\n\n    // Gets the true hash value. Cannot use location.hash directly due to bug\n    // in Firefox where location.hash will always be decoded.\n    getHash: function(window) {\n      var match = (window || this).location.href.match(/#(.*)$/);\n      return match ? match[1] : '';\n    },\n\n    // Get the cross-browser normalized URL fragment, either from the URL,\n    // the hash, or the override.\n    getFragment: function(fragment, forcePushState) {\n      if (fragment == null) {\n        if (this._hasPushState || !this._wantsHashChange || forcePushState) {\n          fragment = decodeURI(this.location.pathname + this.location.search);\n          var root = this.root.replace(trailingSlash, '');\n          if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);\n        } else {\n          fragment = this.getHash();\n        }\n      }\n      return fragment.replace(routeStripper, '');\n    },\n\n    // Start the hash change handling, returning `true` if the current URL matches\n    // an existing route, and `false` otherwise.\n    start: function(options) {\n      if (History.started) throw new Error(\"Backbone.history has already been started\");\n      History.started = true;\n\n      // Figure out the initial configuration. Do we need an iframe?\n      // Is pushState desired ... is it available?\n      this.options          = _.extend({root: '/'}, this.options, options);\n      this.root             = this.options.root;\n      this._wantsHashChange = this.options.hashChange !== false;\n      this._wantsPushState  = !!this.options.pushState;\n      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);\n      var fragment          = this.getFragment();\n      var docMode           = document.documentMode;\n      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));\n\n      // Normalize root to always include a leading and trailing slash.\n      this.root = ('/' + this.root + '/').replace(rootStripper, '/');\n\n      if (oldIE && this._wantsHashChange) {\n        var frame = Backbone.$('<iframe src=\"javascript:0\" tabindex=\"-1\">');\n        this.iframe = frame.hide().appendTo('body')[0].contentWindow;\n        this.navigate(fragment);\n      }\n\n      // Depending on whether we're using pushState or hashes, and whether\n      // 'onhashchange' is supported, determine how we check the URL state.\n      if (this._hasPushState) {\n        Backbone.$(window).on('popstate', this.checkUrl);\n      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {\n        Backbone.$(window).on('hashchange', this.checkUrl);\n      } else if (this._wantsHashChange) {\n        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);\n      }\n\n      // Determine if we need to change the base url, for a pushState link\n      // opened by a non-pushState browser.\n      this.fragment = fragment;\n      var loc = this.location;\n\n      // Transition from hashChange to pushState or vice versa if both are\n      // requested.\n      if (this._wantsHashChange && this._wantsPushState) {\n\n        // If we've started off with a route from a `pushState`-enabled\n        // browser, but we're currently in a browser that doesn't support it...\n        if (!this._hasPushState && !this.atRoot()) {\n          this.fragment = this.getFragment(null, true);\n          this.location.replace(this.root + '#' + this.fragment);\n          // Return immediately as browser will do redirect to new url\n          return true;\n\n        // Or if we've started out with a hash-based route, but we're currently\n        // in a browser where it could be `pushState`-based instead...\n        } else if (this._hasPushState && this.atRoot() && loc.hash) {\n          this.fragment = this.getHash().replace(routeStripper, '');\n          this.history.replaceState({}, document.title, this.root + this.fragment);\n        }\n\n      }\n\n      if (!this.options.silent) return this.loadUrl();\n    },\n\n    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,\n    // but possibly useful for unit testing Routers.\n    stop: function() {\n      Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);\n      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);\n      History.started = false;\n    },\n\n    // Add a route to be tested when the fragment changes. Routes added later\n    // may override previous routes.\n    route: function(route, callback) {\n      this.handlers.unshift({route: route, callback: callback});\n    },\n\n    // Checks the current URL to see if it has changed, and if it has,\n    // calls `loadUrl`, normalizing across the hidden iframe.\n    checkUrl: function(e) {\n      var current = this.getFragment();\n      if (current === this.fragment && this.iframe) {\n        current = this.getFragment(this.getHash(this.iframe));\n      }\n      if (current === this.fragment) return false;\n      if (this.iframe) this.navigate(current);\n      this.loadUrl();\n    },\n\n    // Attempt to load the current URL fragment. If a route succeeds with a\n    // match, returns `true`. If no defined routes matches the fragment,\n    // returns `false`.\n    loadUrl: function(fragment) {\n      fragment = this.fragment = this.getFragment(fragment);\n      return _.any(this.handlers, function(handler) {\n        if (handler.route.test(fragment)) {\n          handler.callback(fragment);\n          return true;\n        }\n      });\n    },\n\n    // Save a fragment into the hash history, or replace the URL state if the\n    // 'replace' option is passed. You are responsible for properly URL-encoding\n    // the fragment in advance.\n    //\n    // The options object can contain `trigger: true` if you wish to have the\n    // route callback be fired (not usually desirable), or `replace: true`, if\n    // you wish to modify the current URL without adding an entry to the history.\n    navigate: function(fragment, options) {\n      if (!History.started) return false;\n      if (!options || options === true) options = {trigger: !!options};\n\n      var url = this.root + (fragment = this.getFragment(fragment || ''));\n\n      // Strip the hash for matching.\n      fragment = fragment.replace(pathStripper, '');\n\n      if (this.fragment === fragment) return;\n      this.fragment = fragment;\n\n      // Don't include a trailing slash on the root.\n      if (fragment === '' && url !== '/') url = url.slice(0, -1);\n\n      // If pushState is available, we use it to set the fragment as a real URL.\n      if (this._hasPushState) {\n        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);\n\n      // If hash changes haven't been explicitly disabled, update the hash\n      // fragment to store history.\n      } else if (this._wantsHashChange) {\n        this._updateHash(this.location, fragment, options.replace);\n        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {\n          // Opening and closing the iframe tricks IE7 and earlier to push a\n          // history entry on hash-tag change.  When replace is true, we don't\n          // want this.\n          if(!options.replace) this.iframe.document.open().close();\n          this._updateHash(this.iframe.location, fragment, options.replace);\n        }\n\n      // If you've told us that you explicitly don't want fallback hashchange-\n      // based history, then `navigate` becomes a page refresh.\n      } else {\n        return this.location.assign(url);\n      }\n      if (options.trigger) return this.loadUrl(fragment);\n    },\n\n    // Update the hash location, either replacing the current entry, or adding\n    // a new one to the browser history.\n    _updateHash: function(location, fragment, replace) {\n      if (replace) {\n        var href = location.href.replace(/(javascript:|#).*$/, '');\n        location.replace(href + '#' + fragment);\n      } else {\n        // Some browsers require that `hash` contains a leading #.\n        location.hash = '#' + fragment;\n      }\n    }\n\n  });\n\n  // Create the default Backbone.history.\n  Backbone.history = new History;\n\n\n\n*/\n\n\n}).call(this);","undoManager":{"mark":98,"position":100,"stack":[[{"group":"doc","deltas":[{"start":{"row":146,"column":2},"end":{"row":146,"column":4},"action":"insert","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":146,"column":20},"end":{"row":146,"column":21},"action":"insert","lines":["B"]}]}],[{"group":"doc","deltas":[{"start":{"row":146,"column":21},"end":{"row":146,"column":22},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":146,"column":22},"end":{"row":146,"column":23},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":146,"column":23},"end":{"row":146,"column":24},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":146,"column":24},"end":{"row":146,"column":25},"action":"insert","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":146,"column":25},"end":{"row":146,"column":26},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":146,"column":26},"end":{"row":146,"column":27},"action":"insert","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":146,"column":40},"end":{"row":147,"column":0},"action":"insert","lines":["",""]},{"start":{"row":147,"column":0},"end":{"row":147,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":147,"column":4},"end":{"row":148,"column":0},"action":"insert","lines":["",""]},{"start":{"row":148,"column":0},"end":{"row":148,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":167,"column":2},"end":{"row":167,"column":3},"action":"insert","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":167,"column":3},"end":{"row":167,"column":4},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":167,"column":4},"end":{"row":167,"column":5},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":167,"column":5},"end":{"row":167,"column":6},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":167,"column":6},"end":{"row":167,"column":7},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":167,"column":7},"end":{"row":167,"column":8},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":167,"column":8},"end":{"row":167,"column":10},"action":"insert","lines":["()"]}]}],[{"group":"doc","deltas":[{"start":{"row":167,"column":2},"end":{"row":167,"column":3},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":167,"column":3},"end":{"row":168,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":168,"column":0},"end":{"row":169,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":169,"column":0},"end":{"row":169,"column":6},"action":"insert","lines":["Router"]}]}],[{"group":"doc","deltas":[{"start":{"row":146,"column":33},"end":{"row":146,"column":39},"action":"remove","lines":["Object"]}]}],[{"group":"doc","deltas":[{"start":{"row":19,"column":4},"end":{"row":19,"column":10},"action":"remove","lines":["Bridge"]},{"start":{"row":19,"column":4},"end":{"row":19,"column":5},"action":"insert","lines":["_"]}]}],[{"group":"doc","deltas":[{"start":{"row":169,"column":0},"end":{"row":169,"column":6},"action":"remove","lines":["Router"]},{"start":{"row":169,"column":0},"end":{"row":169,"column":1},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":169,"column":1},"end":{"row":169,"column":2},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":169,"column":2},"end":{"row":169,"column":3},"action":"insert","lines":["w"]}]}],[{"group":"doc","deltas":[{"start":{"row":169,"column":3},"end":{"row":169,"column":4},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":169,"column":4},"end":{"row":169,"column":13},"action":"insert","lines":["Workspace"]}]}],[{"group":"doc","deltas":[{"start":{"row":169,"column":13},"end":{"row":169,"column":15},"action":"insert","lines":["()"]}]}],[{"group":"doc","deltas":[{"start":{"row":146,"column":33},"end":{"row":146,"column":34},"action":"insert","lines":["O"]}]}],[{"group":"doc","deltas":[{"start":{"row":146,"column":34},"end":{"row":146,"column":35},"action":"insert","lines":["b"]}]}],[{"group":"doc","deltas":[{"start":{"row":146,"column":35},"end":{"row":146,"column":36},"action":"insert","lines":["j"]}]}],[{"group":"doc","deltas":[{"start":{"row":146,"column":36},"end":{"row":146,"column":37},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":146,"column":37},"end":{"row":146,"column":38},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":146,"column":38},"end":{"row":146,"column":39},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":65,"column":12},"end":{"row":65,"column":13},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":65,"column":13},"end":{"row":65,"column":14},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":169,"column":0},"end":{"row":169,"column":1},"action":"insert","lines":["v"]}]}],[{"group":"doc","deltas":[{"start":{"row":169,"column":1},"end":{"row":169,"column":2},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":169,"column":2},"end":{"row":169,"column":3},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":169,"column":3},"end":{"row":169,"column":4},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":169,"column":4},"end":{"row":169,"column":5},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":169,"column":5},"end":{"row":169,"column":6},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":169,"column":5},"end":{"row":169,"column":6},"action":"remove","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":169,"column":4},"end":{"row":169,"column":5},"action":"remove","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":169,"column":4},"end":{"row":169,"column":5},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":169,"column":5},"end":{"row":169,"column":6},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":169,"column":6},"end":{"row":169,"column":7},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":169,"column":7},"end":{"row":169,"column":8},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":169,"column":8},"end":{"row":169,"column":9},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":169,"column":9},"end":{"row":169,"column":10},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":169,"column":10},"end":{"row":169,"column":11},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":169,"column":11},"end":{"row":169,"column":12},"action":"insert","lines":["="]}]}],[{"group":"doc","deltas":[{"start":{"row":169,"column":12},"end":{"row":169,"column":13},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":168,"column":0},"end":{"row":169,"column":37},"action":"remove","lines":["","var router = new Workspace().start();"]}]}],[{"group":"doc","deltas":[{"start":{"row":150,"column":0},"end":{"row":169,"column":0},"action":"remove","lines":["","var Workspace = Bridge.Router.extend({","","  routes: {","    \"help\":                 \"help\",    // #help","    \"search/:query\":        \"search\",  // #search/kiwis","    \"search/:query/p:page\": \"search\"   // #search/kiwis/p7","  },","","  help: function() {","    console.log('help');","  },","","  search: function(query, page) {","    console.log('search');","  }","","});","",""]}]}],[{"group":"doc","deltas":[{"start":{"row":75,"column":13},"end":{"row":76,"column":0},"action":"insert","lines":["",""]},{"start":{"row":76,"column":0},"end":{"row":76,"column":12},"action":"insert","lines":["            "]}]}],[{"group":"doc","deltas":[{"start":{"row":76,"column":12},"end":{"row":77,"column":0},"action":"insert","lines":["",""]},{"start":{"row":77,"column":0},"end":{"row":77,"column":12},"action":"insert","lines":["            "]}]}],[{"group":"doc","deltas":[{"start":{"row":64,"column":12},"end":{"row":65,"column":0},"action":"insert","lines":["",""]},{"start":{"row":65,"column":0},"end":{"row":65,"column":12},"action":"insert","lines":["            "]}]}],[{"group":"doc","deltas":[{"start":{"row":65,"column":12},"end":{"row":66,"column":0},"action":"insert","lines":["",""]},{"start":{"row":66,"column":0},"end":{"row":66,"column":12},"action":"insert","lines":["            "]}]}],[{"group":"doc","deltas":[{"start":{"row":65,"column":12},"end":{"row":65,"column":40},"action":"insert","lines":["_.bindAll(this, 'checkUrl');"]}]}],[{"group":"doc","deltas":[{"start":{"row":65,"column":12},"end":{"row":65,"column":13},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":65,"column":13},"end":{"row":65,"column":14},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":12},"end":{"row":79,"column":20},"action":"insert","lines":["checkUrl"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":20},"end":{"row":79,"column":22},"action":"insert","lines":["()"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":22},"end":{"row":79,"column":23},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":12},"end":{"row":79,"column":13},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":13},"end":{"row":79,"column":14},"action":"insert","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":14},"end":{"row":79,"column":15},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":15},"end":{"row":79,"column":16},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":16},"end":{"row":79,"column":17},"action":"insert","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":97,"column":10},"end":{"row":97,"column":11},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":97,"column":11},"end":{"row":97,"column":12},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":278,"column":0},"end":{"row":278,"column":1},"action":"insert","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":278,"column":1},"end":{"row":278,"column":2},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":278,"column":2},"end":{"row":278,"column":3},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":278,"column":2},"end":{"row":278,"column":3},"action":"remove","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":278,"column":1},"end":{"row":278,"column":2},"action":"remove","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":278,"column":0},"end":{"row":278,"column":1},"action":"remove","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":50,"column":4},"end":{"row":52,"column":6},"action":"insert","lines":["    route: function(route, callback) {","      this.handlers.unshift({route: route, callback: callback});","    },"]}]}],[{"group":"doc","deltas":[{"start":{"row":49,"column":10},"end":{"row":52,"column":6},"action":"remove","lines":["","        route: function(route, callback) {","      this.handlers.unshift({route: route, callback: callback});","    },"]}]}],[{"group":"doc","deltas":[{"start":{"row":49,"column":10},"end":{"row":50,"column":0},"action":"insert","lines":["",""]},{"start":{"row":50,"column":0},"end":{"row":50,"column":8},"action":"insert","lines":["        "]}]}],[{"group":"doc","deltas":[{"start":{"row":37,"column":47},"end":{"row":38,"column":0},"action":"insert","lines":["",""]},{"start":{"row":38,"column":0},"end":{"row":38,"column":10},"action":"insert","lines":["          "]}]}],[{"group":"doc","deltas":[{"start":{"row":38,"column":10},"end":{"row":39,"column":0},"action":"insert","lines":["",""]},{"start":{"row":39,"column":0},"end":{"row":39,"column":10},"action":"insert","lines":["          "]}]}],[{"group":"doc","deltas":[{"start":{"row":39,"column":10},"end":{"row":39,"column":68},"action":"insert","lines":["this.handlers.unshift({route: route, callback: callback});"]}]}],[{"group":"doc","deltas":[{"start":{"row":39,"column":57},"end":{"row":39,"column":65},"action":"remove","lines":["callback"]},{"start":{"row":39,"column":57},"end":{"row":45,"column":11},"action":"insert","lines":["function(fragment) {","            var args = router._extractParameters(route, fragment);","            router.execute(callback, args);","            router.trigger.apply(router, ['route:' + name].concat(args));","            router.trigger('route', name, args);","            Backbone.history.trigger('route', router, name, args);","          }"]}]}],[{"group":"doc","deltas":[{"start":{"row":38,"column":10},"end":{"row":39,"column":0},"action":"insert","lines":["",""]},{"start":{"row":39,"column":0},"end":{"row":39,"column":10},"action":"insert","lines":["          "]}]}],[{"group":"doc","deltas":[{"start":{"row":39,"column":10},"end":{"row":39,"column":28},"action":"insert","lines":["var router = this;"]}]}],[{"group":"doc","deltas":[{"start":{"row":45,"column":12},"end":{"row":45,"column":13},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":45,"column":13},"end":{"row":45,"column":14},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":52},"end":{"row":5,"column":0},"action":"insert","lines":["",""]},{"start":{"row":5,"column":0},"end":{"row":5,"column":6},"action":"insert","lines":["      "]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":6},"end":{"row":5,"column":25},"action":"insert","lines":["this.handlers = [];"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":4},"end":{"row":5,"column":6},"action":"remove","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":4},"end":{"row":5,"column":6},"action":"insert","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":6},"end":{"row":5,"column":8},"action":"insert","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":44,"column":12},"end":{"row":44,"column":13},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":44,"column":13},"end":{"row":44,"column":14},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":45,"column":12},"end":{"row":45,"column":13},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":45,"column":13},"end":{"row":45,"column":14},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":35,"column":27},"end":{"row":35,"column":28},"action":"remove","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":35,"column":26},"end":{"row":35,"column":27},"action":"remove","lines":["e"]}]}]]},"ace":{"folds":[],"scrolltop":1195.5,"scrollleft":0,"selection":{"start":{"row":50,"column":48},"end":{"row":50,"column":48},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":1086,"mode":"ace/mode/javascript"}},"timestamp":1430706640589}