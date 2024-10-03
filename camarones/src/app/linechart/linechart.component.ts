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

    options: {
      aspectRatio: 4,
      onClick: (event: any, elements: any) => {
        if (elements.length > 0) {
          const datasetIndex = elements[0].datasetIndex;
          const dataIndex = elements[0].index;

          const value = this.lineConfig.data.datasets[datasetIndex].data[dataIndex];

          this.updateSemaforo(value);
        }
      },
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

  updateSemaforo(value: number): void {
    const redLight = document.getElementById('red-light') as HTMLElement;
    const yellowLight = document.getElementById('yellow-light') as HTMLElement;
    const greenLight = document.getElementById('green-light') as HTMLElement;
    const semaforoMessage = document.getElementById('semaforo-message') as HTMLElement;

    if (redLight && yellowLight && greenLight && semaforoMessage) {

      redLight.style.backgroundColor = 'grey';
      yellowLight.style.backgroundColor = 'grey';
      greenLight.style.backgroundColor = 'grey';

      semaforoMessage.textContent = "Estado del valor";

      if (value >= 600) {
        redLight.style.backgroundColor = 'red';
        semaforoMessage.textContent = "Valor negativo";
      } else if (value >= 400) {
        yellowLight.style.backgroundColor = 'yellow';
        semaforoMessage.textContent = "Valor regular";
      } else if (value >= 200) {
        greenLight.style.backgroundColor = 'green';
        semaforoMessage.textContent = "Valor positivo";
      }
    } else {
      console.error('No se pudieron encontrar los elementos del semáforo');
    }
  }

}
