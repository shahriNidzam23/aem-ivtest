import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Root, percent, Legend, p50, p100, Tooltip } from "@amcharts/amcharts5";
import { PieChart, PieSeries } from "@amcharts/amcharts5/percent";
import { XYChart, XYCursor, AxisRendererX, AxisRendererY, CategoryAxis, ValueAxis, ColumnSeries } from "@amcharts/amcharts5/xy";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  data: { chartBar: any[], chartDonut: any[], tableUsers: any[] } = {
    chartBar: [],
    chartDonut: [],
    tableUsers: [],
  };
  constructor(private api: ApiService) { }

  async ngOnInit() {
    this.data = await this.api.dashboard();
    this.donut(this.data.chartDonut);
    this.bar(this.data.chartBar);
  }

  donut(data: Array<{ name: string, value: number }>) {
    let root = Root.new("donut");
    // Set themes
    root.setThemes([
      am5themes_Animated.new(root)
    ]);


    // Create chart
    let chart = root.container.children.push(PieChart.new(root, {
      layout: root.verticalLayout,
      innerRadius: percent(50)
    }));


    // Create series
    let series = chart.series.push(PieSeries.new(root, {
      valueField: "value",
      categoryField: "name",
      alignLabels: false
    }));

    series.labels.template.setAll({
      textType: "circular",
      centerX: 0,
      centerY: 0
    });

    series.data.setAll(data);


    // Create legend
    let legend = chart.children.push(Legend.new(root, {
      centerX: percent(50),
      x: percent(50),
      marginTop: 15,
      marginBottom: 15,
    }));

    legend.data.setAll(series.dataItems);


    // Play initial series animation
    series.appear(1000, 100);
  }

  bar(data: Array<{ name: string, value: number }>) {
    let root = Root.new("bar");
    // Set themes
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart: any = root.container.children.push(XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true,
      paddingLeft: 0,
      paddingRight: 1
    }));

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = AxisRendererX.new(root, {
      minGridDistance: 30,
      minorGridEnabled: true
    });

    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: p50,
      centerX: p100,
      paddingRight: 15
    });

    xRenderer.grid.template.setAll({
      location: 1
    })

    let xAxis = chart.xAxes.push(CategoryAxis.new(root, {
      maxDeviation: 0.3,
      categoryField: "name",
      renderer: xRenderer,
      tooltip: Tooltip.new(root, {})
    }));

    let yRenderer = AxisRendererY.new(root, {
      strokeOpacity: 0.1
    })

    let yAxis = chart.yAxes.push(ValueAxis.new(root, {
      maxDeviation: 0.3,
      renderer: yRenderer
    }));

    // Create series
    let series = chart.series.push(ColumnSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      sequencedInterpolation: true,
      categoryXField: "name",
      tooltip: Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));

    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
    series.columns.template.adapters.add("fill", function (fill: any, target: any) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add("stroke", function (stroke: any, target: any) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });


    xAxis.data.setAll(data);
    series.data.setAll(data);

    series.appear(1000);
    chart.appear(1000, 100);

  }



}
