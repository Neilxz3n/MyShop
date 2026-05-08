import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../models';
import { MOCK_USERS, CURRENT_USER } from '../mock-data/users.data';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  currentUser = signal<User | null>(null);
  isAuthenticated = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('currentUser');
      if (saved) {
        try {
          const user = JSON.parse(saved) as User;
          this.currentUser.set(user);
          this.isAuthenticated.set(true);
        } catch { /* ignore */ }
      }
    }
  }

  login(email: string, _password: string, _remember: boolean): boolean {
    const user = MOCK_USERS.find(u => u.email === email);
    if (user) {
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
      if (isPlatformBrowser(this.platformId)) localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  register(data: { name: string; email: string; role: User['role'] }): boolean {
    const newUser: User = {
      id: 'u' + Date.now(),
      name: data.name,
      email: data.email,
      role: data.role,
      joinedDate: new Date().toISOString().split('T')[0],
    };
    this.currentUser.set(newUser);
    this.isAuthenticated.set(true);
    if (isPlatformBrowser(this.platformId)) localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  }

  logout() {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    if (isPlatformBrowser(this.platformId)) localStorage.removeItem('currentUser');
  }

  updateProfile(data: Partial<User>) {
    const user = this.currentUser();
    if (user) {
      const updated = { ...user, ...data };
      this.currentUser.set(updated);
      if (isPlatformBrowser(this.platformId)) localStorage.setItem('currentUser', JSON.stringify(updated));
    }
  }

  getAllUsers(): User[] { return MOCK_USERS; }
}
