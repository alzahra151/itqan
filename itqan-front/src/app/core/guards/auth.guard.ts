import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
// import { Router } from 'express';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const token = localStorage.getItem('token') || null;
  console.log(token)
  if (!token) {
    router.navigate(['/'])
    return false
  }
  return true;
};
