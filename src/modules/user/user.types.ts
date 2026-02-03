export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  isDeleted: number;
  createdAt: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}