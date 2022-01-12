import { AfterViewInit, Component, NgZone, OnDestroy } from '@angular/core';
import * as am4Core from '@amcharts/amcharts4/core';
import * as am4Chart from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4Core.useTheme(am4themes_animated);
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css', '../app.component.css']
})
export class BarChartComponent implements AfterViewInit, OnDestroy {

  constructor(private zone: NgZone) { }
  private chart: am4Chart.XYChart;

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(()=> {
      let chart = am4Core.create('barChartContainer', am4Chart.XYChart)
      let title = chart.titles.create();
      title.text = 'Sales by area';

      chart.paddingRight = 20;

      let data = [
        { 'state': 'Delhi', 'computer': 200, 'bike': 100, 'car': 50 },
        { 'state': 'Bihar', 'computer': 100, 'bike': 100, 'car': 70  },
        { 'state': 'Uttar Pradesh', 'computer': 200, 'bike': 800, 'car': 30 },
        { 'state': 'Rajasthan', 'computer': 300, 'bike': 120, 'car': 40  },
        { 'state': 'West Bengal', 'computer': 100, 'bike': 800, 'car': 30 },
        { 'state': 'Gujrat', 'computer': 600, 'bike': 140, 'car': 70  }
      ];

      chart.data = data;

      let categoryAxis = chart.xAxes.push(new am4Chart.CategoryAxis());
       categoryAxis.title.text = 'State';
       categoryAxis.dataFields.category = 'state';
       categoryAxis.renderer.labels.template.rotation = -60;

       let valueAxis = chart.yAxes.push(new am4Chart.ValueAxis());
       valueAxis.title.text = 'Sales';
       valueAxis.renderer.minWidth = 20;

       let series = chart.series.push(new am4Chart.ColumnSeries());
       series.dataFields.categoryX = 'state';
       series.dataFields.valueY = 'computer';
       series.name = 'Computer';
       series.columns.template.tooltipText = "Category: {name}\nArea: {categoryX}\nValue: {valueY}";
      //  series.columns.template.fill = am4Core.color("#104547");

      this.chart = chart;
    });
  }

  ngOnDestroy(): void {
      
  }

}
