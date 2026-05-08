export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  avatar?: string;
  department?: string;
  campusId?: string;
  phone?: string;
  joinedDate: string;
}

export interface Item {
  id: string;
  name: string;
  category: ItemCategory;
  description: string;
  location: string;
  date: string;
  department: string;
  campus: string;
  status: ItemStatus;
  type: 'lost' | 'found';
  image?: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  reportedBy: string;
  reportedDate: string;
  verificationNotes?: string;
  pickupLocation?: string;
}

export type ItemCategory =
  | 'Electronics'
  | 'Books'
  | 'Clothing'
  | 'Accessories'
  | 'ID/Cards'
  | 'Keys'
  | 'Bags'
  | 'Sports Equipment'
  | 'Stationery'
  | 'Other';

export type ItemStatus = 'pending' | 'matched' | 'claimed' | 'returned';

export interface Claim {
  id: string;
  itemId: string;
  itemName: string;
  claimantId: string;
  claimantName: string;
  claimantEmail: string;
  description: string;
  proofDescription: string;
  status: ClaimStatus;
  submittedDate: string;
  reviewedDate?: string;
  reviewedBy?: string;
  adminNotes?: string;
}

export type ClaimStatus = 'pending' | 'approved' | 'rejected';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  date: string;
  link?: string;
  icon?: string;
}

export type NotificationType =
  | 'match_found'
  | 'claim_approved'
  | 'claim_rejected'
  | 'item_update'
  | 'announcement';

export interface MatchSuggestion {
  id: string;
  lostItem: Item;
  foundItem: Item;
  matchPercentage: number;
  matchedFields: string[];
  status: 'pending' | 'confirmed' | 'dismissed';
}

export interface DashboardStats {
  totalLost: number;
  totalFound: number;
  totalClaimed: number;
  pendingClaims: number;
  matchRate: number;
  activeUsers: number;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  author: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  user: string;
  details: string;
  date: string;
  type: 'report' | 'claim' | 'match' | 'admin' | 'system';
}
