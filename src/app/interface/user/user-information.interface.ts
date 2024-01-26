export interface UserDetails {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface UserInformation extends UserDetails {
  token: string;
}
