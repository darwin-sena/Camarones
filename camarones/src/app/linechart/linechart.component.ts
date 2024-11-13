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

  public lineConfig1: any = {
    type: 'line',
    data: {
      labels: ['ENERO','JUNIO', 'DICIEMBRE'],
      datasets: [
        {
          label: 'OXIGENO',
          data: [0.8, 35, 105],
          fill: false,
          borderColor: '#A8699F',
          tension: 0.1,
          borderWidth: 3,
          pointRadius: 5
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
          this.updateSemaforo('semaforo1', value);
        }
      },
    },
  };

  public lineConfig2: any = {
    type: 'line',
    data: {
      labels: ['ENERO','JUNIO', 'DICIEMBRE'],
      datasets: [
        {
          label: 'TEMPERATURA',
          data: [6, 70, 500],
          fill: false,
          borderColor: '#FF336B',
          tension: 0.1,
          borderWidth: 3,
          pointRadius: 5
        }
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
          this.updateSemaforo('semaforo2', value);
        }
      },
    },
  };

  public lineConfig3: any = {
    type: 'line',
    data: {
      labels: ['ENERO','JUNIO', 'DICIEMBRE'],
      datasets: [
        {
          label: 'SALINIDAD',
          data: [3.6, 60, 200],
          fill: false,
          borderColor: '#3498DB',
          tension: 0.1,
          borderWidth: 3,
          pointRadius: 5
        }
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
          this.updateSemaforo('semaforo3', value);
        }
      },
    },
  };

  public lineConfig4: any = {
    type: 'line',
    data: {
      labels: ['ENERO','JUNIO', 'DICIEMBRE'],
      datasets: [
        {
          label: 'PH',
          data: [0.5, 40, 100],
          fill: false,
          borderColor: '#2ECC71',
          tension: 0.1,
          borderWidth: 3,
          pointRadius: 5
        }
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
          this.updateSemaforo('semaforo4', value);
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

  updateSemaforo(semaforoId: string, value: number): void {
    const redLight = document.getElementById(`${semaforoId}-red`) as HTMLElement;
    const yellowLight = document.getElementById(`${semaforoId}-yellow`) as HTMLElement;
    const greenLight = document.getElementById(`${semaforoId}-green`) as HTMLElement;
    const semaforoMessage = document.getElementById(`${semaforoId}-message`) as HTMLElement;

    if (redLight && yellowLight && greenLight && semaforoMessage) {
      redLight.style.backgroundColor = 'grey';
      yellowLight.style.backgroundColor = 'grey';
      greenLight.style.backgroundColor = 'grey';

      semaforoMessage.textContent = "Estado del valor";

      if (value >= 100) {
        redLight.style.backgroundColor = 'red';
        semaforoMessage.textContent = "Valor negativo";
      } else if (value >= 35) {
        yellowLight.style.backgroundColor = 'yellow';
        semaforoMessage.textContent = "Valor regular";
      } else if (value >= 0.5) {
        greenLight.style.backgroundColor = 'green';
        semaforoMessage.textContent = "Valor positivo";
      }
    } else {
      console.error('No se pudieron encontrar los elementos del semáforo');
    }
  }
}
