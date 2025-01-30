import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RoleService } from '../services/role/role.service';
import { tap } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {
  const roleService = inject(RoleService)
  const router = inject(Router)
  const requiredRole = route.data['requiredRole'] as string;
  const employee = JSON.parse(localStorage.getItem('employee') || '');
  return roleService.hasRole(requiredRole, employee.role_id).pipe(
    tap(hasRole => {
      if (!hasRole) {
        // Redirect to a different route if the user doesn't have the required role
        router.navigate(['/home/unauthorized']);
      }
    })
  );
};
