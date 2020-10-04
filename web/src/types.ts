export type AppContext = {
  isLoggedIn: boolean;
  userDetails: User;
  setUserDetails: (details: User) => void;
  setIsLoggedIn: (state: boolean) => void;
};

export type User = {
  image: string | null;
  fullname: string | null;
  username: string;
  bio: string | null;
  location: string | null;
  email: string | null;
};
