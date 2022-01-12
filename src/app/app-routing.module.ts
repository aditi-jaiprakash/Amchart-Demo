import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarChartComponent } from './bar-chart/bar-chart.component';

const routes: Routes = [
  {
    path: 'bar-chart',
    loadChildren: () => import('./bar-chart/bar-chart.module').then(m => m.BarChartModule)
  },
  {
    path: 'line-chart',
    loadChildren: () => import('./line-chart/line-chart.module').then(m => m.LineChartModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
