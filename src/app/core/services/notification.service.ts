import { Injectable, signal, computed } from '@angular/core';
import { Notification } from '../models';
import { MOCK_NOTIFICATIONS, MOCK_ANNOUNCEMENTS, MOCK_ACTIVITY_LOG, MOCK_MATCHES } from '../mock-data/notifications.data';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  notifications = signal<Notification[]>([...MOCK_NOTIFICATIONS]);
  announcements = signal(MOCK_ANNOUNCEMENTS);
  activityLog = signal(MOCK_ACTIVITY_LOG);
  matches = signal(MOCK_MATCHES);

  unreadCount = computed(() => this.notifications().filter(n => !n.read).length);

  markAsRead(id: string) {
    this.notifications.update(n => n.map(x => x.id === id ? { ...x, read: true } : x));
  }

  markAllAsRead() {
    this.notifications.update(n => n.map(x => ({ ...x, read: true })));
  }

  addNotification(notification: Omit<Notification, 'id' | 'date' | 'read'>) {
    const newNotif: Notification = {
      ...notification,
      id: 'n' + Date.now(),
      date: new Date().toISOString(),
      read: false,
    };
    this.notifications.update(n => [newNotif, ...n]);
  }

  dismissMatch(matchId: string) {
    this.matches.update(m => m.map(x => x.id === matchId ? { ...x, status: 'dismissed' as const } : x));
  }

  confirmMatch(matchId: string) {
    this.matches.update(m => m.map(x => x.id === matchId ? { ...x, status: 'confirmed' as const } : x));
  }
}
