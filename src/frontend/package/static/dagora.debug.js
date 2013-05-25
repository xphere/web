(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __Model.Query = (function(_super) {

    __extends(Query, _super);

    function Query() {
      return Query.__super__.constructor.apply(this, arguments);
    }

    Query.fields("title", "source", "unit", "data");

    return Query;

  })(Monocle.Model);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __View.GraphBar = (function(_super) {
    var instance;

    __extends(GraphBar, _super);

    instance = void 0;

    GraphBar.prototype.container = "section > article #bar";

    GraphBar.prototype.template = "<div data-graph=\"bar\">\n  <h4 class=\"text bold color theme uppercase\">{{title}} <span class=\"text book color default italic\">({{source}})</span></h4>\n  <div class=\"graph\"></div>\n</div>";

    function GraphBar() {
      var data, options;
      GraphBar.__super__.constructor.apply(this, arguments);
      this.html(this.model);
      options = {
        animation: {
          duration: 1000,
          easing: "linear"
        },
        areaOpacity: 0.1,
        backgroundColor: "#ecf0f1",
        chartArea: {
          width: "100%"
        },
        colors: ["#bdc3c7"],
        fontName: "Oswald",
        fontSize: 12,
        legend: {
          position: 'none'
        },
        pointSize: 16,
        hAxis: {
          baselineColor: "#f00",
          textStyle: {
            color: "#aaa"
          }
        },
        vAxis: {
          gridlines: {
            color: "#ecf0f1",
            count: 0
          }
        },
        width: "100%",
        height: 292
      };
      data = google.visualization.arrayToDataTable(this.model.data);
      this.instance = new google.visualization.ColumnChart(this.el.find(".graph").get(0));
      this.instance.draw(data, options);
    }

    return GraphBar;

  })(Monocle.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  __View.GraphPie = (function(_super) {
    var instance;

    __extends(GraphPie, _super);

    instance = void 0;

    GraphPie.prototype.container = "section > article #pie";

    GraphPie.prototype.template = "<li data-graph=\"pie\">\n  <h4 class=\"text bold color theme uppercase\">{{title}}</h4>\n  <div class=\"graph\"></div>\n</li>";

    function GraphPie() {
      var data, options;
      GraphPie.__super__.constructor.apply(this, arguments);
      this.append(this.model);
      console.error(this.model);
      options = {
        colors: ["3498db", "#ddd"],
        legend: {
          position: 'none'
        },
        fontName: "Oswald",
        chartArea: {
          width: "75%",
          height: "75%",
          top: 0
        },
        tooltip: {
          trigger: "focus",
          showColorCode: true
        }
      };
      data = google.visualization.arrayToDataTable([['Value', 'Value'], [this.model.name, this.model.percent], ['Available', 100 - this.model.percent]]);
      this.instance = new google.visualization.PieChart(this.el.find(".graph").get(0));
      this.instance.draw(data, options);
    }

    return GraphPie;

  })(Monocle.View);

}).call(this);

(function() {
  var QueryCtrl,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  QueryCtrl = (function(_super) {

    __extends(QueryCtrl, _super);

    function QueryCtrl() {
      var mock, query;
      QueryCtrl.__super__.constructor.apply(this, arguments);
      console.error("hello world :)");
      mock = [['Year', 'Sales'], ['Apr/20', 1000], ['xxx/XX', 1234], ['xxx/XX', 1170], ['xxx/XX', 1170], ['xxx/XX', 1170], ['xxx/XX', 1170], ['xxx/XX', 1170], ['xxx/XX', 1170], ['xxx/XX', 1170], ['xxx/XX', 1170], ['xxx/XX', 1170], ['xxx/XX', 1170], ['xxx/XX', 1170], ['xxx/XX', 1170], ['xxx/XX', 1170]];
      query = __Model.Query.create({
        title: "TITULO DE CONSULTA",
        source: "Publico.es",
        unit: "people",
        data: mock
      });
      new __View.GraphBar({
        model: query
      });
      new __View.GraphPie({
        model: {
          title: "Percent.1",
          percent: 25
        }
      });
      new __View.GraphPie({
        model: {
          title: "Percent.2",
          percent: 75
        }
      });
      new __View.GraphPie({
        model: {
          title: "Percent.3",
          percent: 34
        }
      });
      new __View.GraphPie({
        model: {
          title: "Percent.4",
          percent: 17
        }
      });
    }

    return QueryCtrl;

  })(Monocle.Controller);

  $(function() {
    return __Controller.Query = new QueryCtrl("body");
  });

}).call(this);
