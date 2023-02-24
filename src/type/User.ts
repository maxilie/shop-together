import { UserData } from './UserData';

export type User = {
  signedIn: boolean;
  userData: UserData | undefined;
};
