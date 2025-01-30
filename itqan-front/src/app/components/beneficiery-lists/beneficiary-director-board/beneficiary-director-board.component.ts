import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-beneficiary-director-board',
  standalone: true,
  imports: [TableModule],
  templateUrl: './beneficiary-director-board.component.html',
  styleUrl: './beneficiary-director-board.component.scss'
})
export class BeneficiaryDirectorBoardComponent {
  @Input() data: any[] = [];
  // @Input() columns: { field: string; header: string }[] = [];
  @Input() paginator: boolean = true;
  @Input() rows: number = 5;
  @Input() tableStyle: any = { 'min-width': '70rem' };
}
