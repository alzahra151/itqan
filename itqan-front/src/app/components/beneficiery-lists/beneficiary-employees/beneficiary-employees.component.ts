import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-beneficiary-employees',
  standalone: true,
  imports: [TableModule],
  templateUrl: './beneficiary-employees.component.html',
  styleUrl: './beneficiary-employees.component.scss'
})
export class BeneficiaryEmployeesComponent {
  @Input() data: any[] = [];
  // @Input() columns: { field: string; header: string }[] = [];
  @Input() paginator: boolean = true;
  @Input() rows: number = 5;
  @Input() tableStyle: any = { 'min-width': '70rem' };
}
