export interface UpdateUser {
  id: string;
  data: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    postcode: string;
    phone: string;
    avatar: string;
  };
}
