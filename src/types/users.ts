// types/users.ts
export interface UserCountResponse {
  count: number;
}

export interface UserState {
  count: number;
  isLoading: boolean;
  error: string | null;
}
