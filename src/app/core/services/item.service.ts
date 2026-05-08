import { Injectable, signal, computed } from '@angular/core';
import { Item, ItemCategory, DashboardStats } from '../models';
import { MOCK_LOST_ITEMS, MOCK_FOUND_ITEMS } from '../mock-data/items.data';

@Injectable({ providedIn: 'root' })
export class ItemService {
  lostItems = signal<Item[]>([...MOCK_LOST_ITEMS]);
  foundItems = signal<Item[]>([...MOCK_FOUND_ITEMS]);

  allItems = computed(() => [...this.lostItems(), ...this.foundItems()]);

  stats = computed<DashboardStats>(() => {
    const lost = this.lostItems();
    const found = this.foundItems();
    const all = [...lost, ...found];
    return {
      totalLost: lost.length,
      totalFound: found.length,
      totalClaimed: all.filter(i => i.status === 'claimed' || i.status === 'returned').length,
      pendingClaims: all.filter(i => i.status === 'pending').length,
      matchRate: all.length ? Math.round((all.filter(i => i.status === 'matched').length / all.length) * 100) : 0,
      activeUsers: 8,
    };
  });

  categories: ItemCategory[] = ['Electronics', 'Books', 'Clothing', 'Accessories', 'ID/Cards', 'Keys', 'Bags', 'Sports Equipment', 'Stationery', 'Other'];
  departments = ['Computer Science', 'Engineering', 'Business Administration', 'Sciences', 'Arts & Design', 'Student Affairs', 'Other'];
  campuses = ['Main Campus', 'North Campus', 'South Campus'];

  addLostItem(item: Partial<Item>) {
    const newItem: Item = {
      id: 'L' + String(this.lostItems().length + 1).padStart(3, '0'),
      name: item.name || '',
      category: item.category || 'Other',
      description: item.description || '',
      location: item.location || '',
      date: item.date || new Date().toISOString().split('T')[0],
      department: item.department || '',
      campus: item.campus || 'Main Campus',
      status: 'pending',
      type: 'lost',
      image: item.image,
      contactName: item.contactName || '',
      contactEmail: item.contactEmail || '',
      contactPhone: item.contactPhone,
      reportedBy: item.reportedBy || '',
      reportedDate: new Date().toISOString().split('T')[0],
    };
    this.lostItems.update(items => [newItem, ...items]);
    return newItem;
  }

  addFoundItem(item: Partial<Item>) {
    const newItem: Item = {
      id: 'F' + String(this.foundItems().length + 1).padStart(3, '0'),
      name: item.name || '',
      category: item.category || 'Other',
      description: item.description || '',
      location: item.location || '',
      date: item.date || new Date().toISOString().split('T')[0],
      department: item.department || '',
      campus: item.campus || 'Main Campus',
      status: 'pending',
      type: 'found',
      image: item.image,
      contactName: item.contactName || '',
      contactEmail: item.contactEmail || '',
      contactPhone: item.contactPhone,
      reportedBy: item.reportedBy || '',
      reportedDate: new Date().toISOString().split('T')[0],
      pickupLocation: item.pickupLocation,
      verificationNotes: item.verificationNotes,
    };
    this.foundItems.update(items => [newItem, ...items]);
    return newItem;
  }

  getItemById(id: string): Item | undefined {
    return this.allItems().find(i => i.id === id);
  }

  updateItemStatus(id: string, status: Item['status']) {
    this.lostItems.update(items => items.map(i => i.id === id ? { ...i, status } : i));
    this.foundItems.update(items => items.map(i => i.id === id ? { ...i, status } : i));
  }
}
