export interface UserModel {
  name?: string;
  email: string;
  role?: Role;
  password?: string;
  passwordConfirm?: string;
  createDate?: Date;
  remember?: boolean;
}

export enum Role {
  ADMIN = 'admin', USER = 'user'
}
