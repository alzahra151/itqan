import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AssociationService } from '../../core/services/association/association.service';
import { Association } from '../../core/models/association';
// import { error } from 'console';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AssociationComponent } from '../association/AssociationComponent';

@Component({
  selector: 'app-add-association',
  standalone: true,
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
    AssociationComponent
  ],
  providers: [AssociationService],
  templateUrl: './add-association.component.html',
  styleUrl: './add-association.component.scss'
})
export class AddAssociationComponent {
  associationForm: FormGroup;
  selectedFile!: File
  photoSrc = ''
  value: string | undefined
  message: any
  manager = localStorage.getItem('employee') || ''
  // association:
  checkAssociation: boolean = false
  associationId = JSON.parse(localStorage.getItem('associationId') || '')
  constructor(private fb: FormBuilder, private associationService: AssociationService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.associationForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      number: ['', Validators.required],
      address: ['', Validators.required],
      mobile: ['', [Validators.required]], // Assuming mobile number is 10 digits
      mobile2: [''],
      phone: [''],
      phone2: [''],
      CR_number: ['', Validators.required],
      tax_number: ['', Validators.required],
      image: ['']
    });
  }
  get name() {
    return this.associationForm.get('name')
  }
  ngOnInit(): void {
    console.log(JSON.parse(this.manager).id)
    this.associationService.associationId$.subscribe(value => {
      console.log(value)
      this.associationId = JSON.parse(value || '');
      console.log(this.associationId)
    });

  }
  setFileData(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.photoSrc = reader.result as string;
      });
      reader.readAsDataURL(this.selectedFile);
      this.associationForm.get('image')?.patchValue(this.selectedFile);
      console.log(this.associationForm.get('image')?.value)
    }
  }
  addAssociation() {
    const associationData = new FormData();
    associationData.append('name', this.associationForm.get('name')?.value)
    associationData.append('address', this.associationForm.get('address')?.value)
    associationData.append('mobile', this.associationForm.get('mobile')?.value)
    associationData.append('phone', this.associationForm.get('phone')?.value)
    associationData.append('number', this.associationForm.get('number')?.value)
    associationData.append('CR_number', this.associationForm.get('CR_number')?.value)
    associationData.append('tax_number', this.associationForm.get('tax_number')?.value)
    associationData.append('image', this.selectedFile)
    associationData.append('manager_Id', JSON.parse(this.manager).id)

    this.associationService.addAssociation(associationData).subscribe({
      next: (data) => {
        console.log(data)
        // localStorage.setItem('associationId', JSON.stringify(data.id))
        this.associationService.updateAssociation(JSON.stringify(data.id));
        // this.checkAssociation = true
        this.associationForm.reset()
        // this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
        //   this.router.navigate(['/home/association']);
        // });
        this.router.navigate(['/home/association'])
      },
      error: (error) => {
        console.log(error)
        this.message = error.error.message
        console.log(this.message)
      }
    })
  }
  updateValue(newValue: string) {

  }
}
