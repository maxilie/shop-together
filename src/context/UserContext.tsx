import { createContext } from 'react';
import { UserData } from '../type/UserData';

// The extra prop which can be accessed by wrapping a component with `withUser`
export type UserProp = {
  user: UserProps;
}

export type UserProps = {
  signedIn: boolean;
  userData?: UserData;
}

const UserContext = createContext<UserProps>({ signedIn: false, userData: undefined, });

export const UserProvider = UserContext.Provider;

export const UserConsumer = UserContext.Consumer;

export const withUser = (Component) => (props) =>
  <UserConsumer>{(state) => <Component{...props} user={state} />}</UserConsumer>;
