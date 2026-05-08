import { Notification, Announcement, ActivityLog, MatchSuggestion } from '../models';
import { MOCK_LOST_ITEMS, MOCK_FOUND_ITEMS } from './items.data';

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'match_found', title: 'Possible Match Found!', message: 'Your lost "Student ID Card" may match a found item reported near the Cafeteria.', read: false, date: '2026-05-06T14:30:00', link: '/matching', icon: '🔗' },
  { id: 'n2', type: 'claim_approved', title: 'Claim Approved', message: 'Your claim for "Student ID Card" has been approved. Please pick it up at Student Affairs Office.', read: false, date: '2026-05-06T10:15:00', link: '/claims', icon: '✅' },
  { id: 'n3', type: 'item_update', title: 'Item Status Updated', message: 'The status of "MacBook Pro 14\\"" has been updated to "Under Review".', read: true, date: '2026-05-05T16:45:00', link: '/lost-items', icon: '📋' },
  { id: 'n4', type: 'announcement', title: 'Campus Announcement', message: 'Lost & Found office hours extended: Mon-Fri 8AM-6PM during finals week.', read: true, date: '2026-05-04T09:00:00', icon: '📢' },
  { id: 'n5', type: 'claim_rejected', title: 'Claim Rejected', message: 'Your claim for "Calculator (TI-84)" was not approved. See admin notes for details.', read: false, date: '2026-05-06T11:30:00', link: '/claims', icon: '❌' },
  { id: 'n6', type: 'match_found', title: 'New Match Suggestion', message: 'A newly found item might match your lost "Blue Backpack".', read: false, date: '2026-05-07T08:20:00', link: '/matching', icon: '🔗' },
  { id: 'n7', type: 'item_update', title: 'New Found Item Reported', message: 'A "Water Bottle (Hydro Flask)" was reported found at the Gymnasium.', read: true, date: '2026-05-05T13:00:00', link: '/found-items', icon: '📋' },
  { id: 'n8', type: 'announcement', title: 'System Maintenance', message: 'The Lost & Found portal will undergo maintenance on May 10, 2AM-4AM.', read: true, date: '2026-05-03T15:00:00', icon: '📢' },
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  { id: 'a1', title: 'Finals Week Extended Hours', message: 'The Lost & Found office will be open Mon-Fri 8AM-6PM during finals week (May 12-23). Please bring your student ID for item pickup.', date: '2026-05-06', priority: 'high', author: 'Maria Santos' },
  { id: 'a2', title: 'Unclaimed Items Donation Drive', message: 'Items unclaimed for over 60 days will be donated to the campus charity drive on June 1st. Please check and claim your items before then.', date: '2026-05-04', priority: 'medium', author: 'Maria Santos' },
  { id: 'a3', title: 'New Smart Matching Feature', message: 'We\'ve improved our matching algorithm! Lost and found items are now automatically compared for potential matches.', date: '2026-05-01', priority: 'low', author: 'System' },
];

export const MOCK_ACTIVITY_LOG: ActivityLog[] = [
  { id: 'act1', action: 'Item Reported Lost', user: 'Alex Rivera', details: 'MacBook Pro 14" reported lost at Library', date: '2026-05-06T14:30:00', type: 'report' },
  { id: 'act2', action: 'Claim Submitted', user: 'Tom Baker', details: 'Claim submitted for Silver Watch', date: '2026-05-06T13:20:00', type: 'claim' },
  { id: 'act3', action: 'Match Detected', user: 'System', details: 'Potential match: Lost ID Card ↔ Found ID Card', date: '2026-05-06T10:00:00', type: 'match' },
  { id: 'act4', action: 'Claim Approved', user: 'Maria Santos', details: 'Approved claim for Student ID Card by Sarah Chen', date: '2026-05-06T09:15:00', type: 'admin' },
  { id: 'act5', action: 'Item Reported Found', user: 'David Kim', details: 'Water Bottle (Hydro Flask) found at Gymnasium', date: '2026-05-05T13:00:00', type: 'report' },
  { id: 'act6', action: 'Claim Rejected', user: 'Maria Santos', details: 'Rejected claim for Calculator (TI-84) by David Kim', date: '2026-05-05T11:30:00', type: 'admin' },
  { id: 'act7', action: 'User Registered', user: 'Emily Nguyen', details: 'New student account created', date: '2026-05-04T08:45:00', type: 'system' },
  { id: 'act8', action: 'Item Returned', user: 'Maria Santos', details: 'Car Keys (Toyota) returned to Prof. Linda Okafor', date: '2026-05-03T16:00:00', type: 'admin' },
];

export const MOCK_MATCHES: MatchSuggestion[] = [
  { id: 'm1', lostItem: MOCK_LOST_ITEMS[1], foundItem: MOCK_FOUND_ITEMS[0], matchPercentage: 92, matchedFields: ['Category', 'Description', 'Location', 'Date Range'], status: 'confirmed' },
  { id: 'm2', lostItem: MOCK_LOST_ITEMS[4], foundItem: MOCK_FOUND_ITEMS[2], matchPercentage: 68, matchedFields: ['Category', 'Location Area'], status: 'pending' },
  { id: 'm3', lostItem: MOCK_LOST_ITEMS[2], foundItem: MOCK_FOUND_ITEMS[5], matchPercentage: 45, matchedFields: ['Campus', 'Date Range'], status: 'pending' },
  { id: 'm4', lostItem: MOCK_LOST_ITEMS[6], foundItem: MOCK_FOUND_ITEMS[1], matchPercentage: 35, matchedFields: ['Category'], status: 'dismissed' },
];
