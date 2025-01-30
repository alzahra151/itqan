import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoleService } from '../../../core/services/role/role.service';
import { ApiResponse } from '../../../core/models/api-response';
import { IRole, IRoleResponse } from '../../../core/models/role';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth/auth.service';
import { AssociationService } from '../../../core/services/association/association.service';
import { Console } from 'console';


@Component({
  selector: 'app-sidbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './sidbar.component.html',
  styleUrl: './sidbar.component.scss'
})
export class SidbarComponent implements OnInit {
  roleService = inject(RoleService)
  http = inject(HttpClient)
  emplyeeRole: IRole = {}
  authService = inject(AuthService)
  associatonServive = inject(AssociationService)
  associationId = localStorage.getItem('associationId') || ''
  ngOnInit() {
    console.log(this.associationId)
    const employee = JSON.parse(localStorage.getItem('employee') || '');
    this.roleService.getEmployeeRole(employee.role_id).subscribe({
      next: (response) => {
        console.log(response)
        this.emplyeeRole = response
      },
      error: (error) => {
        console.log(error.error.message)
      }
    })
    this.associatonServive.associationId$.subscribe(value => {
      console.log(value)
      this.associationId = JSON.parse(value || '');
      console.log(this.associationId)
    });
  }

  logout() {
    this.authService.logOut()
  }
}
