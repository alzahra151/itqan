import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    CarouselModule,
    ButtonModule,
    TagModule,
    RouterLink,
    RouterModule
  ],
  // host: { ngSkipHydration: 'true' },
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {


  constructor() { }

  ngOnInit() {
    // this.productService.getProductsSmall().then((products) => {
    //   this.products = products;
    // });

  }
}
