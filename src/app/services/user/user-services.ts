import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  private apiUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) {}
  getUserDetails(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}`);
  }
  updateUserDetails(userId: string, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, userData);
  }
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }
  addUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, userData);
  }
  updateUserPassword(userId: string, passwordData: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/users/${userId}/password`,
      passwordData
    );
  }
  resetUserPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/reset-password`, { email });
  }
  verifyUserEmail(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/verify-email/${token}`);
  }
  resendVerificationEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/resend-verification`, {
      email,
    });
  }

  getUserRoles(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}/roles`);
  }
  assignUserRole(userId: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${userId}/roles`, { role });
  }
  removeUserRole(userId: string, role: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}/roles/${role}`);
  }
  getUserPermissions(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}/permissions`);
  }
  assignUserPermission(userId: string, permission: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${userId}/permissions`, {
      permission,
    });
  }
  removeUserPermission(userId: string, permission: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/users/${userId}/permissions/${permission}`
    );
  }
  getUserActivityLogs(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}/activity-logs`);
  }
  getUserNotifications(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}/notifications`);
  }
  signup(userData: any): Observable<any> {
    console.log('int refgister backend');
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}
