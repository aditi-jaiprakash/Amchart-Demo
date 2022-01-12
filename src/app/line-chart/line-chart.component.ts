import { AfterViewInit, Component, NgZone } from '@angular/core';
import * as am4Core from '@amcharts/amcharts4/core';
import * as am4Chart from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';


am4Core.useTheme(am4themes_animated);
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css', '../app.component.css']
})
export class LineChartComponent implements AfterViewInit {

  constructor(private zone: NgZone) { }
  private chart: am4Chart.XYChart;

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4Core.create('lineChartContainer', am4Chart.XYChart);
      let title = chart.titles.create();
      title.text = 'Population by State (in lakhs)';

      chart.paddingRight = 20;

      let data = [
        { 'state': 'Delhi', 'male': 200, 'female': 100, 'kids': 50 },
        { 'state': 'Bihar', 'male': 100, 'female': 100, 'kids': 70  },
        { 'state': 'Uttar Pradesh', 'male': 200, 'female': 800, 'kids': 30 },
        { 'state': 'Rajasthan', 'male': 300, 'female': 120, 'kids': 40  }
      ];

      chart.data = data;

      let categoryAxis = chart.xAxes.push(new am4Chart.CategoryAxis());
      categoryAxis.title.text = 'State';
      categoryAxis.dataFields.category = 'state';

      let valueAxis = chart.yAxes.push(new am4Chart.ValueAxis());
      valueAxis.title.text = 'Population';
      valueAxis.renderer.minWidth = 20;

      let seriesNames = ['male', 'female', 'kids'];

      for(let i = 0; i < 3; i++) {
        let series = chart.series.push(new am4Chart.LineSeries());
        series.dataFields.categoryX = 'state';
        series.dataFields.valueY = seriesNames[i];
        series.name = seriesNames[i].charAt(0).toUpperCase() + seriesNames[i].substring(1);

        let bullet = series.bullets.push(new am4Chart.CircleBullet())
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4
        bullet.tooltipText ='State: {categoryX} \n Population: {valueY} \n Category: {name}';
      }

      chart.legend = new am4Chart.Legend();
      this.chart =  chart;
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(()=> {
      if(this.chart) {
        this.chart.dispose();
      }
    })
  }

}


