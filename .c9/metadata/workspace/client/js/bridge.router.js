{"filter":false,"title":"bridge.router.js","tooltip":"/client/js/bridge.router.js","undoManager":{"mark":59,"position":59,"stack":[[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":93,"column":5},"action":"insert","lines":["var Router = Backbone.Router = function(options) {","    options || (options = {});","    if (options.routes) this.routes = options.routes;","    this._bindRoutes();","    this.initialize.apply(this, arguments);","  };","","  // Cached regular expressions for matching named param parts and splatted","  // parts of route strings.","  var optionalParam = /\\((.*?)\\)/g;","  var namedParam    = /(\\(\\?)?:\\w+/g;","  var splatParam    = /\\*\\w+/g;","  var escapeRegExp  = /[\\-{}\\[\\]+?.,\\\\\\^$|#\\s]/g;","","  // Set up all inheritable **Backbone.Router** properties and methods.","  _.extend(Router.prototype, Events, {","","    // Initialize is an empty function by default. Override it with your own","    // initialization logic.","    initialize: function(){},","","    // Manually bind a single named route to a callback. For example:","    //","    //     this.route('search/:query/p:num', 'search', function(query, num) {","    //       ...","    //     });","    //","    route: function(route, name, callback) {","      if (!_.isRegExp(route)) route = this._routeToRegExp(route);","      if (_.isFunction(name)) {","        callback = name;","        name = '';","      }","      if (!callback) callback = this[name];","      var router = this;","      Backbone.history.route(route, function(fragment) {","        var args = router._extractParameters(route, fragment);","        router.execute(callback, args);","        router.trigger.apply(router, ['route:' + name].concat(args));","        router.trigger('route', name, args);","        Backbone.history.trigger('route', router, name, args);","      });","      return this;","    },","","    // Execute a route handler with the provided parameters.  This is an","    // excellent place to do pre-route setup or post-route cleanup.","    execute: function(callback, args) {","      if (callback) callback.apply(this, args);","    },","","    // Simple proxy to `Backbone.history` to save a fragment into the history.","    navigate: function(fragment, options) {","      Backbone.history.navigate(fragment, options);","      return this;","    },","","    // Bind all defined routes to `Backbone.history`. We have to reverse the","    // order of the routes here to support behavior where the most general","    // routes can be defined at the bottom of the route map.","    _bindRoutes: function() {","      if (!this.routes) return;","      this.routes = _.result(this, 'routes');","      var route, routes = _.keys(this.routes);","      while ((route = routes.pop()) != null) {","        this.route(route, this.routes[route]);","      }","    },","","    // Convert a route string into a regular expression, suitable for matching","    // against the current location hash.","    _routeToRegExp: function(route) {","      route = route.replace(escapeRegExp, '\\\\$&')","                   .replace(optionalParam, '(?:$1)?')","                   .replace(namedParam, function(match, optional) {","                     return optional ? match : '([^/?]+)';","                   })","                   .replace(splatParam, '([^?]*?)');","      return new RegExp('^' + route + '(?:\\\\?([\\\\s\\\\S]*))?$');","    },","","    // Given a route, and a URL fragment that it matches, return the array of","    // extracted decoded parameters. Empty or unmatched parameters will be","    // treated as `null` to normalize cross-browser behavior.","    _extractParameters: function(route, fragment) {","      var params = route.exec(fragment).slice(1);","      return _.map(params, function(param, i) {","        // Don't decode the search params.","        if (i === params.length - 1) return param || null;","        return param ? decodeURIComponent(param) : null;","      });","    }","","  });"]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":1,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":1,"column":0},"end":{"row":2,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":3,"column":4},"action":"insert","lines":["(function(){","    var root = this;","    var Bridge = root.Bridge;","    "]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":0},"end":{"row":5,"column":4},"action":"insert","lines":["    "]},{"start":{"row":6,"column":0},"end":{"row":6,"column":4},"action":"insert","lines":["    "]},{"start":{"row":7,"column":0},"end":{"row":7,"column":4},"action":"insert","lines":["    "]},{"start":{"row":8,"column":0},"end":{"row":8,"column":4},"action":"insert","lines":["    "]},{"start":{"row":9,"column":0},"end":{"row":9,"column":4},"action":"insert","lines":["    "]},{"start":{"row":10,"column":0},"end":{"row":10,"column":4},"action":"insert","lines":["    "]},{"start":{"row":11,"column":0},"end":{"row":11,"column":4},"action":"insert","lines":["    "]},{"start":{"row":12,"column":0},"end":{"row":12,"column":4},"action":"insert","lines":["    "]},{"start":{"row":13,"column":0},"end":{"row":13,"column":4},"action":"insert","lines":["    "]},{"start":{"row":14,"column":0},"end":{"row":14,"column":4},"action":"insert","lines":["    "]},{"start":{"row":15,"column":0},"end":{"row":15,"column":4},"action":"insert","lines":["    "]},{"start":{"row":16,"column":0},"end":{"row":16,"column":4},"action":"insert","lines":["    "]},{"start":{"row":17,"column":0},"end":{"row":17,"column":4},"action":"insert","lines":["    "]},{"start":{"row":18,"column":0},"end":{"row":18,"column":4},"action":"insert","lines":["    "]},{"start":{"row":19,"column":0},"end":{"row":19,"column":4},"action":"insert","lines":["    "]},{"start":{"row":20,"column":0},"end":{"row":20,"column":4},"action":"insert","lines":["    "]},{"start":{"row":21,"column":0},"end":{"row":21,"column":4},"action":"insert","lines":["    "]},{"start":{"row":22,"column":0},"end":{"row":22,"column":4},"action":"insert","lines":["    "]},{"start":{"row":23,"column":0},"end":{"row":23,"column":4},"action":"insert","lines":["    "]},{"start":{"row":24,"column":0},"end":{"row":24,"column":4},"action":"insert","lines":["    "]},{"start":{"row":25,"column":0},"end":{"row":25,"column":4},"action":"insert","lines":["    "]},{"start":{"row":26,"column":0},"end":{"row":26,"column":4},"action":"insert","lines":["    "]},{"start":{"row":27,"column":0},"end":{"row":27,"column":4},"action":"insert","lines":["    "]},{"start":{"row":28,"column":0},"end":{"row":28,"column":4},"action":"insert","lines":["    "]},{"start":{"row":29,"column":0},"end":{"row":29,"column":4},"action":"insert","lines":["    "]},{"start":{"row":30,"column":0},"end":{"row":30,"column":4},"action":"insert","lines":["    "]},{"start":{"row":31,"column":0},"end":{"row":31,"column":4},"action":"insert","lines":["    "]},{"start":{"row":32,"column":0},"end":{"row":32,"column":4},"action":"insert","lines":["    "]},{"start":{"row":33,"column":0},"end":{"row":33,"column":4},"action":"insert","lines":["    "]},{"start":{"row":34,"column":0},"end":{"row":34,"column":4},"action":"insert","lines":["    "]},{"start":{"row":35,"column":0},"end":{"row":35,"column":4},"action":"insert","lines":["    "]},{"start":{"row":36,"column":0},"end":{"row":36,"column":4},"action":"insert","lines":["    "]},{"start":{"row":37,"column":0},"end":{"row":37,"column":4},"action":"insert","lines":["    "]},{"start":{"row":38,"column":0},"end":{"row":38,"column":4},"action":"insert","lines":["    "]},{"start":{"row":39,"column":0},"end":{"row":39,"column":4},"action":"insert","lines":["    "]},{"start":{"row":40,"column":0},"end":{"row":40,"column":4},"action":"insert","lines":["    "]},{"start":{"row":41,"column":0},"end":{"row":41,"column":4},"action":"insert","lines":["    "]},{"start":{"row":42,"column":0},"end":{"row":42,"column":4},"action":"insert","lines":["    "]},{"start":{"row":43,"column":0},"end":{"row":43,"column":4},"action":"insert","lines":["    "]},{"start":{"row":44,"column":0},"end":{"row":44,"column":4},"action":"insert","lines":["    "]},{"start":{"row":45,"column":0},"end":{"row":45,"column":4},"action":"insert","lines":["    "]},{"start":{"row":46,"column":0},"end":{"row":46,"column":4},"action":"insert","lines":["    "]},{"start":{"row":47,"column":0},"end":{"row":47,"column":4},"action":"insert","lines":["    "]},{"start":{"row":48,"column":0},"end":{"row":48,"column":4},"action":"insert","lines":["    "]},{"start":{"row":49,"column":0},"end":{"row":49,"column":4},"action":"insert","lines":["    "]},{"start":{"row":50,"column":0},"end":{"row":50,"column":4},"action":"insert","lines":["    "]},{"start":{"row":51,"column":0},"end":{"row":51,"column":4},"action":"insert","lines":["    "]},{"start":{"row":52,"column":0},"end":{"row":52,"column":4},"action":"insert","lines":["    "]},{"start":{"row":53,"column":0},"end":{"row":53,"column":4},"action":"insert","lines":["    "]},{"start":{"row":54,"column":0},"end":{"row":54,"column":4},"action":"insert","lines":["    "]},{"start":{"row":55,"column":0},"end":{"row":55,"column":4},"action":"insert","lines":["    "]},{"start":{"row":56,"column":0},"end":{"row":56,"column":4},"action":"insert","lines":["    "]},{"start":{"row":57,"column":0},"end":{"row":57,"column":4},"action":"insert","lines":["    "]},{"start":{"row":58,"column":0},"end":{"row":58,"column":4},"action":"insert","lines":["    "]},{"start":{"row":59,"column":0},"end":{"row":59,"column":4},"action":"insert","lines":["    "]},{"start":{"row":60,"column":0},"end":{"row":60,"column":4},"action":"insert","lines":["    "]},{"start":{"row":61,"column":0},"end":{"row":61,"column":4},"action":"insert","lines":["    "]},{"start":{"row":62,"column":0},"end":{"row":62,"column":4},"action":"insert","lines":["    "]},{"start":{"row":63,"column":0},"end":{"row":63,"column":4},"action":"insert","lines":["    "]},{"start":{"row":64,"column":0},"end":{"row":64,"column":4},"action":"insert","lines":["    "]},{"start":{"row":65,"column":0},"end":{"row":65,"column":4},"action":"insert","lines":["    "]},{"start":{"row":66,"column":0},"end":{"row":66,"column":4},"action":"insert","lines":["    "]},{"start":{"row":67,"column":0},"end":{"row":67,"column":4},"action":"insert","lines":["    "]},{"start":{"row":68,"column":0},"end":{"row":68,"column":4},"action":"insert","lines":["    "]},{"start":{"row":69,"column":0},"end":{"row":69,"column":4},"action":"insert","lines":["    "]},{"start":{"row":70,"column":0},"end":{"row":70,"column":4},"action":"insert","lines":["    "]},{"start":{"row":71,"column":0},"end":{"row":71,"column":4},"action":"insert","lines":["    "]},{"start":{"row":72,"column":0},"end":{"row":72,"column":4},"action":"insert","lines":["    "]},{"start":{"row":73,"column":0},"end":{"row":73,"column":4},"action":"insert","lines":["    "]},{"start":{"row":74,"column":0},"end":{"row":74,"column":4},"action":"insert","lines":["    "]},{"start":{"row":75,"column":0},"end":{"row":75,"column":4},"action":"insert","lines":["    "]},{"start":{"row":76,"column":0},"end":{"row":76,"column":4},"action":"insert","lines":["    "]},{"start":{"row":77,"column":0},"end":{"row":77,"column":4},"action":"insert","lines":["    "]},{"start":{"row":78,"column":0},"end":{"row":78,"column":4},"action":"insert","lines":["    "]},{"start":{"row":79,"column":0},"end":{"row":79,"column":4},"action":"insert","lines":["    "]},{"start":{"row":80,"column":0},"end":{"row":80,"column":4},"action":"insert","lines":["    "]},{"start":{"row":81,"column":0},"end":{"row":81,"column":4},"action":"insert","lines":["    "]},{"start":{"row":82,"column":0},"end":{"row":82,"column":4},"action":"insert","lines":["    "]},{"start":{"row":83,"column":0},"end":{"row":83,"column":4},"action":"insert","lines":["    "]},{"start":{"row":84,"column":0},"end":{"row":84,"column":4},"action":"insert","lines":["    "]},{"start":{"row":85,"column":0},"end":{"row":85,"column":4},"action":"insert","lines":["    "]},{"start":{"row":86,"column":0},"end":{"row":86,"column":4},"action":"insert","lines":["    "]},{"start":{"row":87,"column":0},"end":{"row":87,"column":4},"action":"insert","lines":["    "]},{"start":{"row":88,"column":0},"end":{"row":88,"column":4},"action":"insert","lines":["    "]},{"start":{"row":89,"column":0},"end":{"row":89,"column":4},"action":"insert","lines":["    "]},{"start":{"row":90,"column":0},"end":{"row":90,"column":4},"action":"insert","lines":["    "]},{"start":{"row":91,"column":0},"end":{"row":91,"column":4},"action":"insert","lines":["    "]},{"start":{"row":92,"column":0},"end":{"row":92,"column":4},"action":"insert","lines":["    "]},{"start":{"row":93,"column":0},"end":{"row":93,"column":4},"action":"insert","lines":["    "]},{"start":{"row":94,"column":0},"end":{"row":94,"column":4},"action":"insert","lines":["    "]},{"start":{"row":95,"column":0},"end":{"row":95,"column":4},"action":"insert","lines":["    "]},{"start":{"row":96,"column":0},"end":{"row":96,"column":4},"action":"insert","lines":["    "]},{"start":{"row":97,"column":0},"end":{"row":97,"column":4},"action":"insert","lines":["    "]},{"start":{"row":98,"column":0},"end":{"row":98,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":4},"end":{"row":4,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":17},"end":{"row":4,"column":25},"action":"remove","lines":["Backbone"]},{"start":{"row":4,"column":17},"end":{"row":4,"column":23},"action":"insert","lines":["Bridge"]}]}],[{"group":"doc","deltas":[{"start":{"row":97,"column":9},"end":{"row":98,"column":0},"action":"insert","lines":["",""]},{"start":{"row":98,"column":0},"end":{"row":98,"column":6},"action":"insert","lines":["      "]}]}],[{"group":"doc","deltas":[{"start":{"row":98,"column":5},"end":{"row":98,"column":6},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":98,"column":4},"end":{"row":98,"column":5},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":98,"column":0},"end":{"row":98,"column":4},"action":"remove","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":97,"column":9},"end":{"row":98,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":97,"column":9},"end":{"row":98,"column":0},"action":"insert","lines":["",""]},{"start":{"row":98,"column":0},"end":{"row":98,"column":6},"action":"insert","lines":["      "]}]}],[{"group":"doc","deltas":[{"start":{"row":98,"column":5},"end":{"row":98,"column":6},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":98,"column":4},"end":{"row":98,"column":5},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":98,"column":0},"end":{"row":98,"column":4},"action":"remove","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":98,"column":0},"end":{"row":98,"column":14},"action":"insert","lines":["}).call(this);"]}]}],[{"group":"doc","deltas":[{"start":{"row":97,"column":9},"end":{"row":98,"column":0},"action":"insert","lines":["",""]},{"start":{"row":98,"column":0},"end":{"row":98,"column":6},"action":"insert","lines":["      "]}]}],[{"group":"doc","deltas":[{"start":{"row":98,"column":5},"end":{"row":98,"column":6},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":98,"column":4},"end":{"row":98,"column":5},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":98,"column":0},"end":{"row":98,"column":4},"action":"remove","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":5},"end":{"row":9,"column":6},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":4},"end":{"row":9,"column":5},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":97,"column":4},"end":{"row":97,"column":6},"action":"remove","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":95,"column":4},"end":{"row":95,"column":8},"action":"remove","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":95,"column":4},"end":{"row":95,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":11,"column":6},"end":{"row":11,"column":7},"action":"remove","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":11,"column":5},"end":{"row":11,"column":6},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":11,"column":4},"end":{"row":11,"column":5},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":11,"column":4},"end":{"row":11,"column":5},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":12,"column":5},"end":{"row":12,"column":6},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":12,"column":4},"end":{"row":12,"column":5},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":13,"column":5},"end":{"row":13,"column":6},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":13,"column":4},"end":{"row":13,"column":5},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":14,"column":5},"end":{"row":14,"column":6},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":14,"column":4},"end":{"row":14,"column":5},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":5},"end":{"row":15,"column":6},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":4},"end":{"row":15,"column":5},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":16,"column":5},"end":{"row":16,"column":6},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":16,"column":4},"end":{"row":16,"column":5},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":18,"column":5},"end":{"row":18,"column":6},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":18,"column":4},"end":{"row":18,"column":5},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":19,"column":5},"end":{"row":19,"column":6},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":19,"column":4},"end":{"row":19,"column":5},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":57,"column":10},"end":{"row":57,"column":11},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":57,"column":11},"end":{"row":57,"column":12},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":52,"column":10},"end":{"row":52,"column":11},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":52,"column":11},"end":{"row":52,"column":12},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":52,"column":11},"end":{"row":52,"column":12},"action":"remove","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":52,"column":10},"end":{"row":52,"column":11},"action":"remove","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":38,"column":28},"end":{"row":39,"column":0},"action":"insert","lines":["",""]},{"start":{"row":39,"column":0},"end":{"row":39,"column":10},"action":"insert","lines":["          "]}]}],[{"group":"doc","deltas":[{"start":{"row":39,"column":10},"end":{"row":39,"column":11},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":39,"column":11},"end":{"row":39,"column":12},"action":"insert","lines":["\""]}]}],[{"group":"doc","deltas":[{"start":{"row":39,"column":11},"end":{"row":39,"column":12},"action":"remove","lines":["\""]}]}],[{"group":"doc","deltas":[{"start":{"row":39,"column":11},"end":{"row":39,"column":12},"action":"insert","lines":["\""]}]}],[{"group":"doc","deltas":[{"start":{"row":39,"column":11},"end":{"row":39,"column":12},"action":"remove","lines":["\""]}]}],[{"group":"doc","deltas":[{"start":{"row":39,"column":11},"end":{"row":39,"column":12},"action":"insert","lines":["*"]}]}],[{"group":"doc","deltas":[{"start":{"row":46,"column":13},"end":{"row":47,"column":0},"action":"insert","lines":["",""]},{"start":{"row":47,"column":0},"end":{"row":47,"column":10},"action":"insert","lines":["          "]}]}],[{"group":"doc","deltas":[{"start":{"row":47,"column":10},"end":{"row":47,"column":11},"action":"insert","lines":["*"]}]}],[{"group":"doc","deltas":[{"start":{"row":47,"column":11},"end":{"row":47,"column":12},"action":"insert","lines":["/"]}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":17,"column":4},"end":{"row":17,"column":4},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1430472944256,"hash":"a084cc5e91b26e760bec32f40c9f521ef07f8665"}