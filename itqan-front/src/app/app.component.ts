import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './components/mainLayout/layout/layout.component';
import { initFlowbite } from 'flowbite';
import { LoaderComponent } from './components/mainLayout/loader/loader.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    LayoutComponent,
    LoaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Itqan_Front';

  ngOnInit(): void {
    // initFlowbite();
  }
}
