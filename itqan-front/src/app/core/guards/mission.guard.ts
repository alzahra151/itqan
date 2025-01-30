import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';
import { RoleService } from '../services/role/role.service';
import { inject } from '@angular/core';


export const missionGuard: CanActivateFn = (route, state) => {
  const roleService = inject(RoleService)
  const router = inject(Router)
  const expectedRole = route.data['requiredRole'] as string;
  const id = route.paramMap.get('id'); // Access the 'id' parameter
  const emplyee = localStorage.getItem('employee') || ''
  console.log(expectedRole, id, emplyee)
  const employee = JSON.parse(localStorage.getItem('employee') || '');
  // roleService.hasRole(expectedRole).pipe(
  //   tap(() => console.log('Observable created')),

  //   map(hasRole => {
  //     console.log(hasRole, "tttestttt")
  //     if (hasRole) {
  //       console.log(hasRole, ",,,,,,")
  //       return true;
  //     } else {
  //       console.log(hasRole, "hhh")

  //       return false;
  //     }
  //   }),
  //   catchError(error => {
  //     console.error('Error checking role:', error);
  //     // router.navigate(['/access-denied']);
  //     return of(false);
  //   })
  // );
  roleService.hasRole(expectedRole, employee.role_id).pipe(
    tap(hasRole => {
      console.log("has role test ")
      if (!hasRole) {
        console.log(hasRole)
        // Redirect to a different route if the user doesn't have the required role
        // router.navigate(['/home/phased-plans', id, 'employee', JSON.parse(emplyee).id]);
      }
    })
  );
  return true


}

