import {
  DUMMY_COMMENTS,
  DUMMY_POSTS,
  DUMMY_PRODUCTS,
  DUMMY_PRODUCTS_IN_CATEGORY,
  DUMMY_USERS,
  getDummyPost
} from '../../../src/constant/DummyData';
import { UserPost } from '../../../src/type/UserPost';

describe('DummyData.DUMMY_COMMENTS', () => {
  it('every dummy comment\'s userID is contained in DUMMY_USERS', () => {
    const validUserIDs = new Set(Object.keys(DUMMY_USERS));
    const commenterIDs = DUMMY_COMMENTS.map(comment => comment.userID);
    expect(commenterIDs.every(commenterID => validUserIDs.has(commenterID))).toBe(true);
  });
});

describe('DummyData.DUMMY_POSTS', () => {
  it('every product ID in DUMMY_POSTS is valid', () => {
    const validProductIDs = new Set(Object.keys(DUMMY_PRODUCTS));
    const productsInCategoryProductID = DUMMY_POSTS.map(post => post.productID);
    expect(productsInCategoryProductID.every(productID => validProductIDs.has(productID))).toBe(true);
  });
});

describe('DummyData.getDummyPost', () => {
  it('returns unique post IDs', () => {
    const N = 100;
    const sampleDummyPosts: Array<UserPost> = [];
    for (let i = 0;i < N;i += 1) {
      sampleDummyPosts.push(getDummyPost());
    }
    const uniquePostIDs = new Set(sampleDummyPosts.map(post => post.postID));
    expect(uniquePostIDs.size).toBe(N);
  });
});

describe('DummyData.DUMMY_PRODUCTS_IN_CATEGORY', () => {
  it('every product ID in DUMMY_PRODUCTS_IN_CATEGORY is valid', () => {
    const validProductIDs = new Set(Object.keys(DUMMY_PRODUCTS));
    const productsInCategoryProductID = Object.values(DUMMY_PRODUCTS_IN_CATEGORY).flat();
    expect(productsInCategoryProductID.every(productID => validProductIDs.has(productID))).toBe(true);
  });
});
