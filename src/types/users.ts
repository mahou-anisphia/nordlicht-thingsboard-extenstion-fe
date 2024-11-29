// types/users.ts
export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  createdTime: string;
  additionalInfo: string | null;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UsersResponse {
  users: User[];
  pagination: Pagination;
}

export interface UserState {
  users: User[];
  pagination: Pagination;
  isLoading: boolean;
  error: string | null;
  count: number;
  fetchUsers: (page?: number, limit?: number) => Promise<void>;
  fetchCount: () => Promise<void>;
}
