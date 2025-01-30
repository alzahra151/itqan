import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    CarouselModule
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  itemShow: any[] = [];
  responsiveOptions: any[] | undefined;
  constructor() { }
  ngOnInit() {
    this.itemShow = [{
      title: "برنامج ادارة الجمعبات والمؤسسات الخدمية ",
      descrition: "افضل برنامج لاضافة خططك وبرامجك الخاصة بادراة مؤسستك الخدمية ",
      button: "انضم الينا الآن",
      imgSrc: '../../../../assets/imags/welcome.png'
    },
    {
      title: "نساعدك في تقدم خدماتك كما ترغب",
      descrition: "افضل برنامج لاضافة خططك وبرامجك الخاصة بادراة مؤسستك الخدمية ",
      button: "انضم الينا الآن",
      imgSrc: '../../../../assets/imags/download__1_-removebg-preview (1).png'
    }
    ]
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }



}
