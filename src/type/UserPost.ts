export type UserPost = {
  postID: string;
  timePosted: number;
  productID: string;
  hasBought: boolean;
  message: string;
  comments: [Comment];
};
