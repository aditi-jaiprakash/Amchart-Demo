import { AfterViewInit, Component, NgZone } from '@angular/core';
import * as am4Core from '@amcharts/amcharts4/core';
import * as am4Chart from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4Core.useTheme(am4themes_animated);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'DemoChartApp';
  private chart: am4Chart.XYChart;

  constructor(private zone: NgZone) { }
  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4Core.create('chartContainer', am4Chart.XYChart);
      let title = chart.titles.create();
      title.text = 'Population by State (in lakhs)';

      let data = [
        { state: 'Delhi', population: 200 },
        { state: 'Bihar', population: 300 },
        { state: 'Uttar Pradesh', population: 400},
        { state: 'Rajasthan', population: 100 }
      ];

      chart.data = data;

      let categoryAxis = chart.xAxes.push(new am4Chart.CategoryAxis());
      categoryAxis.title.text = 'State';
      categoryAxis.dataFields.category = 'state';

      let valueAxis = chart.yAxes.push(new am4Chart.ValueAxis());
      valueAxis.title.text = 'Population';
      valueAxis.renderer.minWidth = 20;

      let series = chart.series.push(new am4Chart.ColumnSeries());
      series.dataFields.categoryX = "state";
      series.dataFields.valueY = "population";
      series.tooltipText = "{valueY.population}";

      // chart.cursor = new am4Chart.XYCursor();

      // let scrollbarX = new am4Chart.XYChartScrollbar();
      // scrollbarX.series.push(series);
      // chart.scrollbarX = scrollbarX;

      chart.legend = new am4Chart.Legend();
      this.chart = chart;
    });
  }
}
