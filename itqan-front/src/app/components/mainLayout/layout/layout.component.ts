import { Component } from '@angular/core';
import { SidbarComponent } from '../sidbar/sidbar.component';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoaderComponent } from '../loader/loader.component';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    SidbarComponent,
    SidebarModule, ButtonModule,
    RouterOutlet,
    NavbarComponent,
    LoaderComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  gfg: boolean = false

}
