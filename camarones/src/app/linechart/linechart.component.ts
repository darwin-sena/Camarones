import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { Chart, registerables } from 'chart.js/auto';
Chart.register(...registerables);

@Component({
  selector: 'app-linechart',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './linechart.component.html',
  styleUrl: './linechart.component.css',
})
export class LinechartComponent implements OnInit {
  // Configuración de gráficos
  public lineConfig1: any = {
    type: 'line',
    data: {
      labels: ['SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'],
      datasets: [
        {
          label: 'OXIGENO',
          data: [0.8, 35, 105, 50],
          fill: false,
          borderColor: '#A8699F',
          tension: 0.1,
          borderWidth: 3,
          pointRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.5,
      onClick: (event: any, elements: any) => {
        if (elements.length > 0) {
          const datasetIndex = elements[0].datasetIndex;
          const dataIndex = elements[0].index;
          const value = this.lineConfig1.data.datasets[datasetIndex].data[dataIndex];
          this.updateSemaforo('semaforo1', value, { red: [100, 150], yellow: [50, 99], green: [0.5, 49] });
        }
      },
    },
  };

  public lineConfig2: any = {
    type: 'line',
    data: {
      labels: ['SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'],
      datasets: [
        {
          label: 'TEMPERATURA',
          data: [25, 24, 30, 35],
          fill: false,
          borderColor: '#FF336B',
          tension: 0.1,
          borderWidth: 3,
          pointRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.5,
      onClick: (event: any, elements: any) => {
        if (elements.length > 0) {
          const datasetIndex = elements[0].datasetIndex;
          const dataIndex = elements[0].index;
          const value = this.lineConfig2.data.datasets[datasetIndex].data[dataIndex];
          this.updateSemaforo('semaforo2', value, { red: [31, 35], yellow: [16, 24], green: [25, 30] });
        }
      },
    },
  };

  public lineConfig3: any = {
    type: 'line',
    data: {
      labels: ['SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'],
      datasets: [
        {
          label: 'SALINIDAD',
          data: [25, 16, 35, 40],
          fill: false,
          borderColor: '#3498DB',
          tension: 0.1,
          borderWidth: 3,
          pointRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.5,
      onClick: (event: any, elements: any) => {
        if (elements.length > 0) {
          const datasetIndex = elements[0].datasetIndex;
          const dataIndex = elements[0].index;
          const value = this.lineConfig3.data.datasets[datasetIndex].data[dataIndex];
          this.updateSemaforo('semaforo3', value, { red: [36, 40], yellow: [16, 24], green: [25, 35] });
        }
      },
    },
  };

  public lineConfig4: any = {
    type: 'line',
    data: {
      labels: ['SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'],
      datasets: [
        {
          label: 'PH',
          data: [7.5, 8.5, 14, 6.5],
          fill: false,
          borderColor: '#2ECC71',
          tension: 0.1,
          borderWidth: 3,
          pointRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.5,
      onClick: (event: any, elements: any) => {
        if (elements.length > 0) {
          const datasetIndex = elements[0].datasetIndex;
          const dataIndex = elements[0].index;
          const value = this.lineConfig4.data.datasets[datasetIndex].data[dataIndex];
          this.updateSemaforo('semaforo4', value, { red: [9, 14], yellow: [6.5, 7.4], green: [7.5, 8.5] });
        }
      },
    },
  };

  ngOnInit(): void {
    const canvas1 = document.getElementById('MyLineChart1') as HTMLCanvasElement;
    if (canvas1) {
      new Chart(canvas1, this.lineConfig1);
    }

    const canvas2 = document.getElementById('MyLineChart2') as HTMLCanvasElement;
    if (canvas2) {
      new Chart(canvas2, this.lineConfig2);
    }

    const canvas3 = document.getElementById('MyLineChart3') as HTMLCanvasElement;
    if (canvas3) {
      new Chart(canvas3, this.lineConfig3);
    }

    const canvas4 = document.getElementById('MyLineChart4') as HTMLCanvasElement;
    if (canvas4) {
      new Chart(canvas4, this.lineConfig4);
    }
  }

  updateSemaforo(
    semaforoId: string,
    value: number,
    thresholds: { red: [number, number]; yellow: [number, number]; green: [number, number] }
  ): void {
    const redLight = document.getElementById(`${semaforoId}-red`) as HTMLElement;
    const yellowLight = document.getElementById(`${semaforoId}-yellow`) as HTMLElement;
    const greenLight = document.getElementById(`${semaforoId}-green`) as HTMLElement;
    const semaforoMessage = document.getElementById(`${semaforoId}-message`) as HTMLElement;

    if (redLight && yellowLight && greenLight && semaforoMessage) {
      // Resetear colores
      redLight.style.backgroundColor = 'grey';
      yellowLight.style.backgroundColor = 'grey';
      greenLight.style.backgroundColor = 'grey';

      semaforoMessage.textContent = 'Estado del valor';

      // Evaluar rango de valores
      if (value >= thresholds.red[0] && value <= thresholds.red[1]) {
        redLight.style.backgroundColor = 'red';
        semaforoMessage.textContent = 'Valor negativo';
      } else if (value >= thresholds.yellow[0] && value <= thresholds.yellow[1]) {
        yellowLight.style.backgroundColor = 'yellow';
        semaforoMessage.textContent = 'Valor regular';
      } else if (value >= thresholds.green[0] && value <= thresholds.green[1]) {
        greenLight.style.backgroundColor = 'green';
        semaforoMessage.textContent = 'Valor positivo';
      }
    } else {
      console.error('No se pudieron encontrar los elementos del semáforo');
    }
  }
}
