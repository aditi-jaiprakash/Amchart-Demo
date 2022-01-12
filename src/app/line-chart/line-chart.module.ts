import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LineChartRoutingModule } from './line-chart-routing.module';
import { LineChartComponent } from './line-chart.component';


@NgModule({
  declarations: [
    LineChartComponent
  ],
  imports: [
    CommonModule,
    LineChartRoutingModule
  ]
})
export class LineChartModule { }
