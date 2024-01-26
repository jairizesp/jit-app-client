import { HttpHeaders } from '@angular/common/http';

export function getHttpOptions() {
  const token = localStorage.getItem('token');
  return {
    headers: new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }),
  };
}
