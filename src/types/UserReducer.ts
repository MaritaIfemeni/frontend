import { AdminUser } from "./AdminUser";
import { User } from "./User";

export interface UserReducer {
  users: User[];
  currentUser?: User | AdminUser | null;
  userResponse: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    postcode: string;
    phone: string;
    avatar: string;
    userRole: string;
  };
  loading: boolean;
  error: string;
}
