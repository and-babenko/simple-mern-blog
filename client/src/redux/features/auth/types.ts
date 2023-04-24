export interface IUser {
  userName: string;
  password: string;
  posts: [];
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
}

export interface ILoginData {
  user: IUser;
  token: string;
  message: string;
}

export interface IFormData {
  userName: string;
  password: string;
}

export type AuthSliceType = {
  isLoading: boolean;
  user: IUser | null;
  token: string | null;
  status: string | null;
};
