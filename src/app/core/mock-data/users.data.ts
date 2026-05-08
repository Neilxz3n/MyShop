import { User } from '../models';

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alex Rivera', email: 'alex.rivera@campus.edu', role: 'student', department: 'Computer Science', campusId: 'CS-2024-0451', phone: '+1 555-0101', joinedDate: '2024-08-15', avatar: '' },
  { id: 'u2', name: 'Sarah Chen', email: 'sarah.chen@campus.edu', role: 'student', department: 'Business Administration', campusId: 'BA-2024-0322', phone: '+1 555-0102', joinedDate: '2024-08-15', avatar: '' },
  { id: 'u3', name: 'Dr. James Wilson', email: 'j.wilson@campus.edu', role: 'faculty', department: 'Engineering', campusId: 'FAC-2020-0089', phone: '+1 555-0201', joinedDate: '2020-06-01', avatar: '' },
  { id: 'u4', name: 'Maria Santos', email: 'maria.santos@campus.edu', role: 'admin', department: 'Student Affairs', campusId: 'ADM-2019-0012', phone: '+1 555-0301', joinedDate: '2019-03-10', avatar: '' },
  { id: 'u5', name: 'David Kim', email: 'david.kim@campus.edu', role: 'student', department: 'Arts & Design', campusId: 'AD-2025-0178', phone: '+1 555-0103', joinedDate: '2025-01-10', avatar: '' },
  { id: 'u6', name: 'Prof. Linda Okafor', email: 'l.okafor@campus.edu', role: 'faculty', department: 'Sciences', campusId: 'FAC-2018-0056', phone: '+1 555-0202', joinedDate: '2018-09-01', avatar: '' },
  { id: 'u7', name: 'Tom Baker', email: 'tom.baker@campus.edu', role: 'student', department: 'Engineering', campusId: 'EN-2024-0612', phone: '+1 555-0104', joinedDate: '2024-08-15', avatar: '' },
  { id: 'u8', name: 'Emily Nguyen', email: 'emily.nguyen@campus.edu', role: 'student', department: 'Computer Science', campusId: 'CS-2025-0099', phone: '+1 555-0105', joinedDate: '2025-01-10', avatar: '' },
];

export const CURRENT_USER: User = MOCK_USERS[0];
