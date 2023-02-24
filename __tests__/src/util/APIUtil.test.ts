import { DUMMY_PRODUCTS } from '../../../src/constant/DummyData';
import { fetchProductDetails, searchProductsInCategory } from '../../../src/util/APIUtil';
import { Product } from '../../../src/type/Product';

describe('APIUtil.searchProductsInCategory', () => {
  it('returns 1 or more product IDs', async () => {
    const productSearchResult = await searchProductsInCategory(0);
    expect(productSearchResult).toBeDefined();
    expect(productSearchResult.productIDs.length).toBeGreaterThanOrEqual(1);
  });
});

describe('APIUtil.fetchProductDetails', () => {
  it('returns valid product', async () => {
    const productDetails = await fetchProductDetails(Object.keys(DUMMY_PRODUCTS)[0]);
    expect(productDetails).toBeDefined();
    expect((productDetails as Product).name).toBeDefined();
    expect((productDetails as Product).image).toBeDefined();
    expect((productDetails as Product).url).toBeDefined();
  });
});
