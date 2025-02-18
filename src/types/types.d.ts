import { User } from 'firebase/auth';

export interface FirebaseUser extends User {
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
}

export interface Group {
  id?: string;
  groupName: string;
  groupDescription: string;
  groupPrivacy: string;
  admin: string | null | undefined;
  groupPassword?: string | null;
  members?: Array;
}