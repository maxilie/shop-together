import { Comment } from '../type/Comment';
import { Product } from '../type/Product';
import { UserData } from '../type/UserData';
import { UserPost } from '../type/UserPost';
import { nowMinusT } from '../util/Util';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const DUMMY_COMMENTS: Array<Comment> = [
  {
    userID: 'user0',
    comment: 'Adding to my wishlist now!',
  },
  {
    userID: 'user1',
    comment: 'Lookin good',
  },
  {
    userID: 'user2',
    comment: 'OMG I WANT THAT NOW',
  },
  {
    userID: 'user3',
    comment: 'Very cool',
  }, {
    userID: 'user4',
    comment: 'Wow, that looks great! Congrats on the purchase!',
  }, {
    userID: 'user5',
    comment: 'Awesome! Good choice!',
  }, {
    userID: 'user6',
    comment: 'That looks great - hope you enjoy it :)',
  }, {
    userID: 'user7',
    comment: 'Jealousss',
  }, {
    userID: 'user8',
    comment: 'I\'m so jealous',
  }, {
    userID: 'user9',
    comment: 'Nice purchase!',
  }, {
    userID: 'user1',
    comment: 'Congrats on the new new',
  }, {
    userID: 'user2',
    comment: 'I love that so much',
  }, {
    userID: 'user3',
    comment: 'Looks really cool. Enjoy!',
  }, {
    userID: 'user4',
    comment: 'What a neat find',
  }, {
    userID: 'user5',
    comment: 'I\'ve actually been wanting one of those for myself',
  }, {
    userID: 'user6',
    comment: 'Is it really worth it though?',
  },
];

export const DUMMY_PRODUCTS: { [key: string]: Product } = {
  prod0: {
    name: 'Womens Casual Plaid Shacket Wool Blend Button Down Long Sleeve Shirt',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/clothing_1.png'),
  },
  prod1: {
    name: 'mens Packable Recycled Windbreaker Jacket',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/clothing_2.png'),
  },
  prod2: {
    name: 'Oversized Sweatshirt for Women Crew Neck Long Sleeve',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/clothing_3.png'),
  },
  prod3: {
    name: 'Men\'s Tech 2.0 Short-Sleeve T-Shirt',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/clothing_4.png'),
  },
  prod4: {
    name: 'Women\'s French Terry Fleece Jogger Sweatpant',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/clothing_1.png'),
  },
  prod5: {
    name: 'Baby Girls\' Hooded Sweater Jacket with Sherpa Lining',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/clothing_2.png'),
  },
  prod6: {
    name: 'Men\'s Full-Zip Fleece Mock Neck Sweatshirt',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/clothing_3.png'),
  },
  prod7: {
    name: 'Men\'s Hawaiian Floral Shirts Cotton Linen Button Down',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/clothing_4.png'),
  },
  prod8: {
    name: 'Microsoft Xbox One X 1TB, 4K Ultra HD Gaming Console, Black',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/electronics_1.png'),
  },
  prod9: {
    name: 'PowerA Spectra Infinity Enhanced Wired Controller for Xbox Series X|S',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/electronics_1.png'),
  },
  prod10: {
    name: 'Nintendo Switch – OLED Model w/ White Joy-Con',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/electronics_1.png'),
  },
  prod11: {
    name: 'LiCB CR2032 3V Lithium Battery(10-Pack)',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/electronics_2.png'),
  },
  prod12: {
    name: 'Anker Portable Charger, 313 Power Bank (PowerCore Slim 10K) 10000mAh Battery Pack',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/electronics_2.png'),
  },
  prod13: {
    name: 'JBL FLIP 5, Waterproof Portable Bluetooth Speaker, Black',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/electronics_3.png'),
  },
  prod14: {
    name: 'MIATONE Outdoor Portable Bluetooth Speakers Wireless Speaker Waterproof',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/electronics_3.png'),
  },
  prod15: {
    name: 'All-New Echo Dot (5th Gen, 2022 release)',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/electronics_3.png'),
  },
  prod16: {
    name: 'STUDIOFINIX Bluetooth Bookshelf Speakers Powered Home Audio Sound System',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/electronics_3.png'),
  },
  prod17: {
    name: 'Office Chair Desk Chair',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/home_office_1.png'),
  },
  prod18: {
    name: 'Ergonomic Office Chair, FelixKing Home Office Rolling Swivel Chair Mesh High Back Computer Chair',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/home_office_1.png'),
  },
  prod19: {
    name: 'Flash Furniture Flash Fundamentals Mid-Back Black LeatherSoft-Padded Task Office Chair with Arms',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/home_office_1.png'),
  },
  prod20: {
    name: 'HUANUO Lap Laptop Desk - Portable Lap Desk with Pillow Cushion',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/home_office_2.png'),
  },
  prod21: {
    name: 'Lufeiya Small Computer Desk Study Table for Small Spaces',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/home_office_2.png'),
  },
  prod22: {
    name: 'BON AUGURE Industrial Computer Desk, Rustic Wood Desk for Home Office',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/home_office_2.png'),
  },
  prod23: {
    name: 'Desk Mat Large Protector Pad',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/home_office_2.png'),
  },
  prod24: {
    name: 'Tribesigns 55 Inches Executive Desk with File Cabinet',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/home_office_2.png'),
  },
  prod25: {
    name: 'Outdoor Post Light, Large Exterior Lamp Post',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/outdoor_1.png'),
  },
  prod26: {
    name: 'Diyel Outdoor Gooseneck Barn Light',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/outdoor_1.png'),
  },
  prod27: {
    name: 'HYPERLITE 60W LED Wall Pack with Dusk to Dawn Photocell',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/outdoor_1.png'),
  },
  prod28: {
    name: 'Govee Outdoor String Lights',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/outdoor_2.png'),
  },
  prod29: {
    name: 'Meidaoduo Outdoor String Lights LED White',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/outdoor_2.png'),
  },
  prod30: {
    name: 'Enbrighten Vintage Seasons Café Lights, Outdoor String Lights',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/outdoor_2.png'),
  },
  prod31: {
    name: 'Spring Gnome Decor, Lavender Gnomes',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/outdoor_3.png'),
  },
  prod32: {
    name: 'Succulent Gnomes Green Plants',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/outdoor_3.png'),
  },
  prod33: {
    name: 'Acqua Di Gio By Giorgio Armani for Men',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/beauty_1.png'),
  },
  prod34: {
    name: 'VERSACE CRYSTAL NOIR by Gianni Versace EDT SPRAY 3 OZ for WOMEN',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/beauty_1.png'),
  },
  prod35: {
    name: 'Xoxo Love Body Spray for Women, 8 Ounce',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/beauty_1.png'),
  },
  prod36: {
    name: 'deweisn Tri-Fold Lighted Vanity Mirror with 21 LED Lights',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/beauty_2.png'),
  },
  prod37: {
    name: 'GULAURI Makeup Mirror - Lighted Makeup Mirror with Lights and Magnification',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/beauty_2.png'),
  },
  prod38: {
    name: 'MIRRORVANA Hangable Round Fogless Shower Shaving Mirror',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/beauty_2.png'),
  },
  prod39: {
    name: 'CeraVe AM Facial Moisturizing Lotion SPF 30',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/beauty_3.png'),
  },
  prod40: {
    name: 'PanOxyl Acne Foaming Wash Benzoyl Peroxide 10%',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/beauty_3.png'),
  },
  prod41: {
    name: 'Decorative Throw Pillow Covers 18x18, Soft Plush Faux Wool',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/home_kitchen_1.png'),
  },
  prod42: {
    name: 'Beckham Hotel Collection Bed Pillows for Sleeping',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/home_kitchen_1.png'),
  },
  prod43: {
    name: 'Throw Pillow Insert Hypoallergenic Premium Pillow Stuffer',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/home_kitchen_1.png'),
  },
  prod44: {
    name: 'Umite Chef Kitchen Cooking Utensils Set, 33 pcs Non-Stick Silicone',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/home_kitchen_2.png'),
  },
  prod45: {
    name: 'Knife Set, Dishwasher Safe Kitchen Knife Set with Block',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/home_kitchen_2.png'),
  },
  prod46: {
    name: 'Simple Chef Cast Iron Skillet 3-Piece Set',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/home_kitchen_2.png'),
  },
  prod47: {
    name: 'Kitchen Mat [2 PCS] Cushioned Anti-Fatigue',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/home_kitchen_3.png'),
  },
  prod48: {
    name: 'MontVoo Kitchen Rugs and Mats for Floor, Washable Non-Skid Runner Rug',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/home_kitchen_3.png'),
  },
  prod49: {
    name: 'Purina ONE Natural Dry Dog Food, Chicken & Rice Formula',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/pet_supplies_1.png'),
  },
  prod50: {
    name: 'Blue Buffalo Delights Natural Adult Small Breed Wet Dog Food Cup',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/pet_supplies_1.png'),
  },
  prod51: {
    name: 'Stainless Steel Metal Dog Bowls, Food Grade, BPA Free, Nonslip',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/pet_supplies_1.png'),
  },
  prod52: {
    name: 'Zuke\'s Mini Naturals Training Dog Treats Chicken Recipe - 16 Oz Bag',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/pet_supplies_2.png'),
  },
  prod53: {
    name: 'Milk-Bone MaroSnacks Dog Treats, Beef, 40 Ounce',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/pet_supplies_2.png'),
  },
  prod54: {
    name: 'Blue Buffalo Health Bars Natural Crunchy Dog Treats Biscuits, Apple & Yogurt 16-oz Bag',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/pet_supplies_2.png'),
  },
  prod55: {
    name: 'KOOLTAIL Plaid Dog Winter Coat',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/pet_supplies_3.png'),
  },
  prod56: {
    name: 'Valentines Day Dog Costume, 2 Pack Pet Red Heart Headband',
    url: 'https://www.shop.com',
    image: require('../../assets/default-products/pet_supplies_3.png'),
  },
};

// Mimics response returned by /categories endpoint
export const DUMMY_PRODUCT_CATEGORIES: Array<string> = [
  'Clothing',
  'Electronics',
  'Home Office',
  'Outdoor',
  'Beauty & Personal Care',
  'Home & Kitchen',
  'Pet Supplies',
];

// Mimics response returned by /products endpoint
export const DUMMY_PRODUCTS_IN_CATEGORY: { [key: string]: Array<string> } = {
  'Clothing': [
    'prod0',
    'prod1',
    'prod2',
    'prod3',
    'prod4',
    'prod5',
    'prod6',
    'prod7',
  ],
  'Electronics': [
    'prod8',
    'prod9',
    'prod10',
    'prod11',
    'prod12',
    'prod13',
    'prod14',
    'prod15',
    'prod16',
  ],
  'Home Office': [
    'prod17',
    'prod18',
    'prod19',
    'prod20',
    'prod21',
    'prod22',
    'prod23',
    'prod24',
  ],
  'Outdoor': [
    'prod25',
    'prod26',
    'prod27',
    'prod28',
    'prod29',
    'prod30',
    'prod31',
    'prod32',
  ],
  'Beauty & Personal Care': [
    'prod33',
    'prod34',
    'prod35',
    'prod36',
    'prod37',
    'prod38',
    'prod39',
    'prod40',
  ],
  'Home & Kitchen': [
    'prod41',
    'prod42',
    'prod43',
    'prod44',
    'prod45',
    'prod46',
    'prod47',
    'prod48',
  ],
  'Pet Supplies': [
    'prod49',
    'prod50',
    'prod51',
    'prod52',
    'prod53',
    'prod54',
    'prod55',
    'prod56',
  ],
};

export const DUMMY_POSTS: [UserPost] = [
  {
    postID: 'default',
    timePosted: 0,
    productID: 'prod0',
    hasBought: false,
    message: 'Thinking about getting myself a Christmas gift...',
    comments: [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
    ],
  },
  {
    postID: 'default',
    timePosted: 0,
    productID: 'prod55',
    hasBought: true,
    message: 'Look what I got Fido!',
    comments: [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
    ],
  },
  {
    postID: 'default',
    timePosted: 0,
    productID: 'prod14',
    hasBought: true,
    message: 'New speaker who dis',
    comments: [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
    ],
  },
  {
    postID: 'default',
    timePosted: 0,
    productID: 'prod3',
    hasBought: false,
    message: 'What do you think of this?',
    comments: [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
    ],
  },
  {
    postID: 'default',
    timePosted: 0,
    productID: 'prod7',
    hasBought: false,
    message: 'Might want to expand my wardrobe. You guys think this could be my new style?',
    comments: [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
    ],
  },
  {
    postID: 'default',
    timePosted: 0,
    productID: 'prod6',
    hasBought: true,
    message: 'If you don\'t recognize me in the office, this is why lol',
    comments: [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
    ],
  },
  {
    postID: 'default',
    timePosted: 0,
    productID: 'prod18',
    hasBought: true,
    message: 'Finally got my hands on one of these',
    comments: [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
    ],
  },
  {
    postID: 'default',
    timePosted: 0,
    productID: 'prod22',
    hasBought: true,
    message: 'I\'m in love with this',
    comments: [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
    ],
  },
  {
    postID: 'default',
    timePosted: 0,
    productID: 'prod29',
    hasBought: true,
    message: 'Get ready to be amazed',
    comments: [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
      DUMMY_COMMENTS[Math.floor(Math.random() * DUMMY_COMMENTS.length)],
    ],
  },
];

export const getDummyPost = (): UserPost => {
  const dummyPost = { ...DUMMY_POSTS[Math.floor(Math.random() * DUMMY_POSTS.length)], };
  dummyPost.postID = uuidv4();
  dummyPost.timePosted = nowMinusT(Math.random() * Math.random() * 60 * 60 * 24 * 31).getTime();
  return dummyPost;
};

export const DUMMY_USERS: { [key: string]: UserData } = {
  user0: {
    name: 'Jason Lightman',
    posts: [
      getDummyPost(),
    ],
    isFollowed: false,
    image: require('../../assets/default_profile_3.png'),
  },
  user1: {
    name: 'Logan Zachary',
    posts: [
      getDummyPost(),
    ],
    isFollowed: false,
    image: require('../../assets/default_profile_4.png'),
  },
  user2: {
    name: 'Amelia Tinsel',
    posts: [
      getDummyPost(),
      getDummyPost(),
      getDummyPost(),
    ],
    isFollowed: true,
    image: require('../../assets/default_profile_1.png'),
  },
  user3: {
    name: 'Lance Hart',
    posts: [
      getDummyPost(),
      getDummyPost(),
      getDummyPost(),
      getDummyPost(),
    ],
    isFollowed: true,
    image: require('../../assets/default_profile.png'),
  },
  user4: {
    name: 'Julia Beckley',
    posts: [
      getDummyPost(),
      getDummyPost(),
    ],
    isFollowed: false,
    image: require('../../assets/default_profile_2.png'),
  },
  user5: {
    name: 'Ryan Rogers',
    posts: [],
    isFollowed: false,
    image: require('../../assets/default_profile_6.png'),
  },
  user6: {
    name: 'Cameron Lavin',
    posts: [
      getDummyPost(),
      getDummyPost(),
      getDummyPost(),
    ],
    isFollowed: true,
    image: require('../../assets/default_profile_7.png'),
  },
  user7: {
    name: 'Kayla Longhorn',
    posts: [
      getDummyPost(),
    ],
    isFollowed: false,
    image: require('../../assets/default_profile_5.png'),
  },
  user8: {
    name: 'Amy Taylor',
    posts: [
      getDummyPost(),
      getDummyPost(),
    ],
    isFollowed: false,
    image: require('../../assets/default_profile.png'),
  },
  user9: {
    name: 'Sophia Roberts',
    posts: [
      getDummyPost(),
      getDummyPost(),
      getDummyPost(),
    ],
    isFollowed: true,
    image: require('../../assets/default_profile.png'),
  },
  user10: {
    name: 'Joseph Zukowitz',
    posts: [
      getDummyPost(),
    ],
    isFollowed: false,
    image: require('../../assets/default_profile.png'),
  },
};
