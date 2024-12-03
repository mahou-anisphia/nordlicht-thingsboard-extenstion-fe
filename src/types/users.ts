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
  pageSize: number;
  totalPages: number;
}

export interface UsersResponse {
  users: User[];
  pagination: Pagination;
}

export interface UserState {
  users: User[];
  pagination: Pagination;
  loading: boolean;
  error: string | null;
  counts: number;
  fetchUsers: (page?: number, pageSize?: number) => Promise<void>;
  fetchCounts: () => Promise<void>;
}
