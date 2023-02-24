import { UserData } from '../type/UserData';
import { UserPost } from '../type/UserPost';
import {
  DUMMY_PRODUCT_CATEGORIES,
  DUMMY_PRODUCTS,
  DUMMY_PRODUCTS_IN_CATEGORY,
  DUMMY_USERS
} from '../constant/DummyData';
import { Product } from '../type/Product';

export type UserPostResponse = {
  userData: UserData;
  postData: UserPost;
}

const httpGET = (endpoint: string, params: never): Promise<object> | undefined => {
  /**
   * Checks for a cached response, or else makes a new HTTP GET request.
   * @returns the result, or undefined if the request failed.
   */
  // TODO Use query API for caching
  return undefined;
};

export const fetchMyPosts = async (myUserData: UserData): Promise<Array<UserPostResponse>> => {
  /**
   * Simulates fetching the user's posts from the backend, sorted by most recent.
   */

    // Format dummy posts into UserPostResponse's
  const myPosts = myUserData.posts
      .map(postData => {
        return {
          userData: { ...myUserData, },
          postData: { ...postData, },
        };
      });

  // TODO Fetch real products and replace dummy products with them

  return myPosts.sort((data1, data2) => data2.postData.timePosted - data1.postData.timePosted);
};

export const fetchFollowingPosts = async (): Promise<Array<UserPostResponse>> => {
  /**
   * Simulates fetching followers' posts from the backend.
   */

    // Format dummy posts into UserPostResponse's
  const followingPosts: Array<UserPostResponse> = [];
  const usersFollowing = Object.keys(DUMMY_USERS)
    .filter(key => DUMMY_USERS[key].isFollowed)
    .map(key => DUMMY_USERS[key]);
  usersFollowing.forEach(userData => {
    userData.posts.forEach(postData => followingPosts.push({
      userData,
      postData,
    }));
  });

  // TODO Fetch a real product for each dummy post

  return followingPosts.sort((data1, data2) => data2.postData.timePosted - data1.postData.timePosted);
};

export const fetchCategories = async (): Promise<Array<string>> => {
  /**
   * Fetches the list of product categories from the shop API.
   * If API is unavailable, returns dummy categories.
   */
  return Object.assign([], DUMMY_PRODUCT_CATEGORIES);
};

const PRODUCTS_PER_BATCH = 6;

export const searchProductsInCategory = async (start: number, category?: string, searchTerm?: string): Promise<{
  productIDs: Array<string>,
  nextBatchIndex: number | false,
}> => {
  /**
   * Fetches a list of up to 6 products from the shop API.
   * If API is unavailable, returns dummy products.
   * @param start The batch number to fetch (returned as the previous batch's `nextBatchIndex`), or false if this is the final batch.
   */

  if (!start) start = 0;

  // TODO Query the API
  const queryRes = undefined;
  let productIDs: Array<string> = [];
  let nextBatchIndex: number | false = start + 1;

  // If API unavailable, get dummy products
  if (!queryRes) {

    // Handle user-initiated search across all categories when API call fails
    if (!category) {
      const allProducts = Object.values(DUMMY_PRODUCTS_IN_CATEGORY).flat();
      const matchingProducts = allProducts.filter(productID => DUMMY_PRODUCTS[productID]?.name.toLowerCase().includes(searchTerm?.toLowerCase() || ''));
      return {
        productIDs: matchingProducts.length > 10 ? matchingProducts.slice(0, 10) : matchingProducts,
        nextBatchIndex: false,
      };
    }

    // Handle error when API call fails
    else if (!Object.keys(DUMMY_PRODUCTS_IN_CATEGORY).includes(category) || (start * PRODUCTS_PER_BATCH) >= DUMMY_PRODUCTS_IN_CATEGORY[category].length) {
      return {
        productIDs: [],
        nextBatchIndex: false,
      };
    }
    productIDs = [];
    nextBatchIndex = start + 1;
    let idx = start * PRODUCTS_PER_BATCH;
    while (idx < nextBatchIndex * PRODUCTS_PER_BATCH) {
      productIDs.push(DUMMY_PRODUCTS_IN_CATEGORY[category][idx]);
      if (idx + 1 == DUMMY_PRODUCTS_IN_CATEGORY[category].length) {
        nextBatchIndex = false;
        break;
      }
      idx += 1;
    }
  }

  // Return the result
  return {
    productIDs,
    nextBatchIndex,
  };
};

export const fetchProductDetails = async (productID: string): Promise<Product> => {

  // TODO Query the API
  const queryRes = undefined;
  let productDetails: Product | undefined = undefined;

  // If API unavailable, get dummy product details
  if (!queryRes && Object.keys(DUMMY_PRODUCTS).includes(productID)) {
    productDetails = {
    ...DUMMY_PRODUCTS[productID],
    };
  }

  // If product details not found, display "product not found"
  else if (!productDetails) {
    productDetails = {
      name: 'Product not found',
      image: require('../../assets/default-products/default_product.png'),
      url: 'https://www.shop.com',
    };
  }

  // Return the result
  return productDetails;
};
