import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { Chart, registerables } from 'chart.js/auto';
Chart.register(...registerables);

@Component({
  selector: 'app-linechart',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './linechart.component.html',
  styleUrl: './linechart.component.css'
})
export class LinechartComponent implements OnInit {

  public lineConfig: any = {
    type: 'line',
    data: {
      labels: ['CANTIDAD', 'PESO'],
      datasets: [
        {
          label: 'COMPRAS',
          data: ['467', '576', '600', '574'],
          fill: false,
          borderColor: '#A8699F',
          tension: 0.1,
        },
        {
          label: 'PERDIDAS',
          data: ['250', '350', '670', '450'],
          fill: false,
          borderColor: '#8D6EB1',
          tension: 0.1,
        },
        {
          label: 'BODEGA',
          data: ['300', '750', '800', '500'],
          fill: false,
          borderColor: '#FF336B',
          tension: 0.1,
        }
      ],
    },

  };

  public barConfig: any = {
    type: 'bar',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
      datasets: [
        {
          label: 'VENTAS',
          data: [300, 500, 400, 700],
          backgroundColor: '#3498DB',
        },
        {
          label: 'PERDIDAS',
          data: [50, 200, 150, 250],
          backgroundColor: '#E74C3C',
        },
      ],
    },
    options: {
      aspectRatio: 2,
    },
  };

  ngOnInit(): void {
    const canvas = document.getElementById('MyLineChart') as HTMLCanvasElement;
    if (canvas) {
      new Chart(canvas, this.lineConfig);
    }

    const barCanvas = document.getElementById('MyBarChart') as HTMLCanvasElement;
    if (barCanvas) {
      new Chart(barCanvas, this.barConfig);
    }
  }

}
