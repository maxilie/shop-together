import { UserPost } from './UserPost';

export type UserData = {
  name: string;
  posts: Array<UserPost>;
  isFollowed: boolean;
  image;
};
