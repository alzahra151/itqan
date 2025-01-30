import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  data: any;

  options: any;
  basicData: any;

  basicOptions: any;
  basicData2: any;

  basicOptions2: any;
  constructor(@Inject(PLATFORM_ID) private platformId: object) { }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.data = {
        labels: ['مكتمل', 'غير مكتمل'],
        datasets: [
          {
            data: [50, 200],
            backgroundColor: ['#826aca', '#ad88f1'],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
          }
        ]
      };
      this.options = {
        cutout: '55%',
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        }
      };
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.basicData = {
        labels: ['web', 'email', 'instgram', 'tik tok', 'pinterest'],
        datasets: [
          {
            label: 'Sales',
            data: [550, 425, 300, 120, 250],
            backgroundColor: ['rgba(82,113,255,255)', '#30327d', '#594da3', '#31327c', '#01195c'],
            borderColor: ['rgba(82,113,255,255)', '#30327d', '#594da3', '#31327c', '#01195c'],
            borderWidth: 1
          }
        ]
      };

      this.basicOptions = {
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          },
          x: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          }
        }
      };
      this.basicData2 = {
        labels: ['Jan',
          'Feb',
          'Mar',
          'April',
          'May',
          'June',
          'July',
          'Aug',
          'Sept',
          'Oct',
          'Nov',
          'Dec'],
        datasets: [
          {
            label: 'Sales',
            data: [30, 35, 30, 33, 28, 25, 20, 18, 15, 20, 11, 3],
            backgroundColor: ['rgba(82,113,255,255)'],
            borderColor: ['rgba(82,113,255,255)'],
            borderWidth: 1
          }
        ]
      };

      this.basicOptions2 = {
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          },
          x: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          }
        },
        // Adjust bar width and make borders rounded
        indexAxis: 'x', // To change the bar width, you can switch the index axis to 'y'
        elements: {
          bar: {
            // borderWidth: .2,
            borderRadius: 5, // Adjust the border radius to make it rounded
            barPercentage: 1 // Adjust the bar width as a percentage of the available space
          }
        }
      };
    }


  }
}
