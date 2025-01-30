import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BeneficiaryService } from '../../core/services/beneficiary/beneficiary.service';
import { Beneficiary } from '../../core/models/beneficiary';
import { RadioButtonModule } from 'primeng/radiobutton';
import { switchMap } from 'rxjs';
import { CommonModule, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@Component({
  selector: 'app-get-benficiary-details',
  standalone: true,
  imports: [RadioButtonModule, NgSwitch, CommonModule],
  templateUrl: './get-benficiary-details.component.html',
  styleUrl: './get-benficiary-details.component.scss'
})
export class GetBenficiaryDetailsComponent implements OnInit {
  beneficiaryId: number = 0
  beneficiary: Beneficiary = {}
  constructor(private route: ActivatedRoute, private beneficiaryService: BeneficiaryService) { }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.beneficiaryId = params['id'];
        console.log(' parameter:', this.beneficiaryId);
        this.getBeneficiaryById()

      }
    })
  }
  getBeneficiaryById() {

    this.beneficiaryService.getBeneficiaryById(this.beneficiaryId).subscribe({
      next: (data) => {
        this.beneficiary = data.result.beneficiary!
        console.log(this.beneficiary)

      }, error: (error) => {
        console.log(error)
      }
    })
  }
  convertToArray(urls: any) {
    console.log(typeof urls)
    if (typeof urls === 'string') {
      try {
        return JSON.parse(urls); // Parse if it's a JSON string
      } catch (error) {
        console.error("Error parsing URLs JSON:", error);
        return []; // Return an empty array on parse error
      }
    } else if (Array.isArray(urls)) {
      // If urls is already an array, return it as is
      return urls;
    } else {
      // Handle unexpected input (not a string or an array)
      console.warn("URLs is not a string or array:", urls);
      return [];
    }

  }
  getFileType(fileUrl: any): string {
    const extension = fileUrl.split('.').pop()?.toLowerCase();
    return extension || '';
  }
  decodeFileName(encodedName: string): string {
    return decodeURIComponent(escape(encodedName)); // Use escape to handle the encoded string
  }
}
