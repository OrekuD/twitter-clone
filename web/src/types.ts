export type AppContext = {
  isLoggedIn: boolean;
  userDetails: User;
  setUserDetails: (details: User) => void;
  setIsLoggedIn: (state: boolean) => void;
};

export type User = {
  image: string;
  fullname: string;
  username: string;
  bio: string;
  location: string;
  email: string;
};
