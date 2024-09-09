import { Component, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {

  /*@Input() applicationData: any[] = [];

  chartLabels: Label[] = ['Submitted', 'Accepted', 'Rejected'];
  chartData: ChartDataset[] = [
    {
      data: [
        this.applicationData.filter(app => app.status === 'Submitted').length,
        this.applicationData.filter(app => app.status === 'Accepted').length,
        this.applicationData.filter(app => app.status === 'Rejected').length,
      ],
      label: 'Applications'
    }
  ];
  chartOptions: ChartOptions = {
    responsive: true,
  };
  chartLegend = true;
  chartType: ChartType = 'pie';*/
}
