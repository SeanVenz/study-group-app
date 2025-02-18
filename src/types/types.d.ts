import { User } from 'firebase/auth';

export interface FirebaseUser extends User {
  uid: string;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
}

export interface Group {
  adminUid?: string;
  id?: string; 
  groupName: string;
  groupDescription: string;
  groupPrivacy: string;
  admin: string | null | undefined;
  groupPassword?: string | null;
  members?: string[];
}

export interface PrivateGroup {
  groupName: string;
  groupPassword: string;
}