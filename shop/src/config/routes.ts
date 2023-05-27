const routes = {
  home: '/',
  authors: '/authors',
  explore: '/explore',
  chat: '/chat',
  popularProducts: '/popular-products',
  about: '/about-us',
  contact: '/contact-us',
  purchases: '/purchases',
  wishlists: '/wishlists',
  reports: '/reports',
  questions: '/questions',
  profile: '/profile',
  checkout: '/checkout',
  help: '/help',
  licensing: '/licensing',
  refund: '/refund',
  terms: '/terms',
  privacy: '/privacy',
  password: '/password',
  feed: '/feed',
  post: '/posts',
  createPost: 'posts/create',
  followedShop: '/followed-authors',
  orderUrl: (tracking_number: string) => `/orders/${tracking_number}`,
  productUrl: (slug: string) => `/products/${slug}`,
  postUrl: (slug: string) => `/posts/${slug}`,
  tagUrl: (slug: string) => `/products/tags/${slug}`,
  shopUrl: (slug: string) => `/authors/${slug}`,
  userUrl: (slug: string) => `/users/${slug}`,
};
export default routes;
