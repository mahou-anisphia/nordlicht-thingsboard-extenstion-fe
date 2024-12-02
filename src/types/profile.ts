export interface Profile {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  authority: string;
  phone: string | null;
  createdTime: string;
  additionalInfo: string;
}

export interface AdditionalInfo {
  failedLoginAttempts: number;
  lastLoginTs: number;
}
