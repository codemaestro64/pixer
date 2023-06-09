import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
import { Query } from 'react-query';

export interface QueryOptions {
  page?: number;
  limit?: number;
  language?: string;
}

export interface GetParams {
  slug: string;
  language?: string;
}

export interface SearchParamOptions {
  rating: string;
  question: string;

  [key: string]: unknown;
}

export interface ProductQueryOptions extends QueryOptions {
  shop_id: string;
  name: string;
  price: string | string[];
  categories: string | string[];
  tags: string | string[];
  language?: string;
}

export interface PopularProductsQueryOptions {
  limit: number;
  shop_id: string;
  type_slug: string;
  range: number;
}

export interface FollowShopPopularProductsQueryOption {
  limit: number;
}

export interface TopShopQueryOptions {
  limit: number;
  name: string;
  range: number;
}
export interface CategoryQueryOptions extends QueryOptions {}

export interface TagQueryOptions extends QueryOptions {}

export interface TypeQueryOptions extends QueryOptions {}

export interface WishlistQueryOptions extends QueryOptions {}

export interface MyReportsQueryOptions extends QueryOptions {}

export interface MyQuestionQueryOptions extends QueryOptions {}

export interface PostQueryOptions extends QueryOptions {}

export interface GigQueryOptions extends QueryOptions {}
export interface PostByUserQueryOptions extends QueryOptions {
  user_id: string;
}
export interface ShopQueryOptions extends QueryOptions {
  is_active?: number;
}

export interface FollowedShopsQueryOptions extends QueryOptions {}

export interface OrderQueryOptions extends QueryOptions {
  orderBy: string;
  sortedBy: string;
}

export interface WishlistQueryOption extends QueryOptions {}

export interface ReviewQueryOptions extends QueryOptions {
  product_id: string;
  rating?: string;
}

export interface QuestionQueryOptions extends QueryOptions {
  product_id: string;
  question?: string;
}

export interface CommunityQueryOptions extends QueryOptions {
  is_active?: number;
  is_private?: number;
}

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  authorization?: boolean;
  getLayout?: (page: ReactElement) => ReactNode;
};

interface PaginatorInfo<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface SEO {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: Attachment;
  twitterHandle: string;
  twitterCardType: string;
  metaTags: string;
  canonicalUrl: string;
}

export interface Settings {
  id: string;
  options: {
    siteTitle: string;
    siteSubtitle: string;
    currency: string;
    logo: Attachment;
    seo: SEO;
    contactDetails: ContactDetails;
  };
}

export interface ContactDetails {
  socials: [ShopSocials];
  contact: string;
  location: Location;
  website: string;
}

export interface ShopSocials {
  icon: string;
  url: string;
}

export interface Location {
  lat: number;
  lng: number;
  city: string;
  state: string;
  country: string;
  zip: string;
  formattedAddress: string;
}

export interface Attachment {
  id: string;
  original: string;
  thumbnail: string;
  __typename?: string;
}

export interface Shop {
  id: string;
  name: string;
  slug: string;
  description: string;
  orders_count: number;
  products_count: number;
  users_count: number;
  wishlists_count: number;
  logo: Attachment;
  cover_image: Attachment;
  settings: {
    contact: string;
    socials: {
      icon: string;
      url: string;
    }[];
  };
  address: {
    street_address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  owner: {
    id: string;
    name: string;
    email: string;
  };
}

export interface User {
  email: string;
  id: string;
  name: string;
  profile: {
    id: string;
    bio: string;
    contact: string;
    avatar: Attachment;
    skills: string;
    location: string;
    cover: Attachment;
  };
  role: string;
  likes_count: string;
  followers_count: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfileInput {
  id: string;
  name: string;
  profile: {
    id?: string;
    bio?: string;
    contact?: string;
    avatar?: Attachment | null;
    cover?: Attachment | null;
    location?: string;
    skills?: string;
  };
}

export interface ChangePasswordInput {
  oldPassword: string;
  newPassword: string;
}

export interface ContactInput {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ChatTokenInput {
  email: string;
  name: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

export interface ForgetPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  token: string;
  email: string;
  password: string;
}

export interface VerifyForgetPasswordTokenInput {
  token: string;
  email: string;
}

export interface PasswordChangeResponse {
  success: boolean;
  message: string;
}

export interface ChatTokenResponse {
  token: string;
  user_id: string;
  user_name: string;
}
export interface AuthResponse {
  token: string;
  permissions: string[];
}

export interface CreateContactUsInput {
  name: string;
  email: string;
  subject: string;
  description: string;
}

export interface CreateAbuseReportInput {
  model_id: string;
  model_type: string;
  message: string;
}

export interface CreateFeedbackInput {
  model_id: string;
  model_type: string;
  positive?: boolean;
  negative?: boolean;
}

export interface CreateQuestionInput {
  question: string;
  product_id: string;
  shop_id: string;
}

export interface CreateReviewInput {
  product_id: string;
  shop_id: string;
  order_id: string;
  comment?: string;
  rating: number;
  photos?: Attachment[];
}

export interface UpdateReviewInput extends CreateReviewInput {
  id: string;
}

export interface ReviewResponse {
  product_id: string;
}

interface ConnectProductOrderPivot {
  product_id: string | number;
  order_quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface CreateOrderInput {
  amount: number;
  total: number;
  paid_total: number;
  customer_contact: string;
  products: ConnectProductOrderPivot[];
  status: string;
  sales_tax: number;
  billing_address: any;
  payment_gateway: string;
  token?: string;
  use_wallet_points: boolean;
}

export interface CheckoutVerificationInput {
  amount: number;
  products: ConnectProductOrderPivot[];
}

export interface VerifiedCheckoutResponse {
  total_tax: number;
  shipping_charge: number;
  unavailable_products: string[];
  wallet_currency: number;
  wallet_amount: number;
}

export interface RatingCount {
  rating: number;
  total: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  sale_price: number;
  orders_count: number;
  total_downloads: number;
  image: Attachment;
  gallery: Attachment[];
  shop: Shop;
  created_at: string;
  updated_at: string;
  preview_url: string;
  my_review: Review[];
  shop_id: number;
  rating_count: RatingCount[];
  total_reviews: number;
  ratings: number;
  tags: Tag[];
  type: {
    id: string;
    name: string;
  };
  language: string;
  in_stock: number;
}

export interface ProductPaginator extends PaginatorInfo<Product> {}

export interface ReportsPaginator extends PaginatorInfo<Question> {}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Type {
  id: string;
  name: string;
  icon: string;
  slug: string;
  promotional_sliders?: Attachment;
  created_at: string;
  updated_at: string;
  translated_languages: string[];
}

export interface CategoryPaginator extends PaginatorInfo<Category> {}

export interface TypePaginator extends PaginatorInfo<Type> {}

export interface ShopPaginator extends PaginatorInfo<Shop> {}

export interface Order {
  id: string;
  tracking_number: string;
  total: number;
  status: string;
  products: Product[];
  created_at: string;
  updated_at: string;
}

export interface DigitalFile {
  id: string;
  fileable: Product;
}

export interface OrderedFile {
  id: string;
  purchase_key: string;
  digital_file_id: string;
  customer_id: string;
  order_id: string;
  file: DigitalFile;
  created_at: string;
  updated_at: string;
}

export interface Feedback {
  id: string;
  user_id: string;
  model_type: string;
  model_id: string;
  positive: boolean;
  negative: boolean;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  answer: string;
  my_feedback: Feedback;
  negative_feedbacks_count: number;
  positive_feedbacks_count: number;
  product: Product;
  question: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  photos: Attachment[];
  user: User;
  product: Product;
  shop: Shop;
  feedbacks: Feedback[];
  positive_feedbacks_count: number;
  negative_feedbacks_count: number;
  my_feedback: Feedback;
  order_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Wishlist {
  id: string;
  product: Product;
  product_id: string;
  user: User[];
  user_id: string;
}

export interface TagPaginator extends PaginatorInfo<Tag> {}

export interface OrderPaginator extends PaginatorInfo<Order> {}

export interface OrderedFilePaginator extends PaginatorInfo<OrderedFile> {}

export interface ReviewPaginator extends PaginatorInfo<Review> {}

export interface WishlistPaginator extends PaginatorInfo<Wishlist> {}

export interface QuestionPaginator extends PaginatorInfo<Question> {}

export interface SettingsQueryOptions extends QueryOptions {
  language?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Address {
  city: string;
  country: string;
  state: string;
  street_address: string;
  zip: string;
}

export interface Feedback {
  id: string;
  user_id: string;
  model_type: string;
  model_id: string;
  positive: boolean;
  negative: boolean;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  photos: Attachment[];
  user: User;
  product: Product;
  shop: Shop;
  feedbacks: Feedback[];
  positive_feedbacks_count: number;
  negative_feedbacks_count: number;
  my_feedback: Feedback;
  created_at: string;
  updated_at: string;
}

export interface CreateReviewInput {
  product_id: string;
  shop_id: string;
  comment?: string;
  rating: number;
  photos?: Attachment[];
}

export interface CreateAbuseReportInput {
  model_id: string;
  message: string;
}

export interface Question {
  id: string;
  answer: string;
  my_feedback: Feedback;
  negative_feedbacks_count: number;
  positive_feedbacks_count: number;
  question: string;
  created_at: string;
  updated_at: string;
}

export interface CreateQuestionInput {
  question: string;
  product_id: string;
  shop_id: string;
}

export interface ChatUser {
  id: string;
  created_at?: string;
  updated_at?: string;
  banned?: boolean;
  online?: boolean;
  role?: string;
  name?: string;
  shadow_banned?: boolean;
  last_active?: string;
  avatar?: string;
}

export interface Feed {
  user_id: string;
  id: string;
  type: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  profile: {
    id: string;
    avatar?: Attachment;
    bio: string;
  };
  descr: string;
  content: Attachment[];
  created_at: string;
  updated_at: string;
  comments_count: number;
  likes_count: number;
  comments?: [
    {
      id: string;
      feed_id: string;
      user_id: string;
      reply: string;
      created_at: string;
      updated_at: string;
    }
  ];
  likes?: [
    {
      id: string;
      feed_id: string;
      user_id: string;
      status: number;
      created_at: string;
      updated_at: string;
    }
  ];
}

export interface ListFeedInput {
  user_id: string;
}
export interface CreateFeedInput {
  user_id: string;
  descr: string;
  type: string;
  content: Attachment[];
}

export interface UpdateFeedInput {
  id: string;
  user_id: string;
  descr: string;
  type: string;
  content: Attachment;
}

export interface FeedComment {
  feed_id: string;
  user_id: string;
  id: string;
  reply: string;
  likes_count: string;
  likes: [
    {
      id: string;
      user_id: string;
      comment_id: string;
      type: string;
      status: boolean;
    }
  ];
  customer?: {
    id: string;
    name: string;
    email: string;
  };
  profile?: {
    id: string;
    avatar?: Attachment;
    bio: string;
  };
  created_at: string;
  updated_at: string;
}

export interface CreateFeedCommentInput {
  user_id: string;
  feed_id: string;
  reply: string;
}

export interface FeedLike {
  id: string;
  feed_id: string;
  user_id: string;
  status: number;
  created_at: string;
  updated_at: string;
}
export interface CreateFeedLikeInput {
  user_id: string;
  feed_id: string;
}

//
export interface Post {
  id: string;
  user_id: string;
  title: string;
  categories: string;
  sub_categories: string;
  descr: string;
  keywords: string;
  attachments: Attachment[];
  created_at: string;
  updated_at: string;
  followers_count: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  profile: {
    id: string;
    avatar?: Attachment;
    bio: string;
  };
  comments_count: number;
  likes_count: number;
  comments?: [
    {
      id: string;
      feed_id: string;
      user_id: string;
      reply: string;
      created_at: string;
      updated_at: string;
    }
  ];
  likes?: [
    {
      id: string;
      feed_id: string;
      user_id: string;
      status: number;
      created_at: string;
      updated_at: string;
    }
  ];
}

export interface PostAndLatestPosts {
  post: Post;
  latest_posts: Post[];
}

export interface PostPaginator extends PaginatorInfo<Post> {}

export interface PostResponse {
  id: string;
  user_id: string;
  title: string;
  categories: string;
  sub_categories: string;
  descr: string;
  keywords: string;
  attachments: Attachment[];
  created_at: string;
  updated_at: string;
}

export interface CreatePostInput {
  title: string;
  categories: string;
  sub_categories: string;
  descr: string;
  keywords: string;
  attachments: Attachment[];
}

export interface PostComment {
  post_id: string;
  user_id: string;
  id: string;
  reply: string;
  likes_count: string;
  likes: [
    {
      id: string;
      user_id: string;
      comment_id: string;
      type: string;
      status: boolean;
    }
  ];
  customer?: {
    id: string;
    name: string;
    email: string;
  };
  profile?: {
    id: string;
    avatar?: Attachment;
    bio: string;
  };
  created_at: string;
  updated_at: string;
}

export interface CreatePostCommentInput {
  user_id: string;
  post_id: string;
  reply: string;
}

export interface PostLike {
  id: string;
  post_id: string;
  user_id: string;
  status: number;
  created_at: string;
  updated_at: string;
}
export interface CreatePostLikeInput {
  user_id: string;
  post_id: string;
}

export interface Follow {
  id: string;
  sender_user_id: string;
  receiver_user_id: string;
  followers_count: string;
  status: boolean;
}

export interface CreateFollowInput {
  sender_user_id: string;
  receiver_user_id: string;
}

export interface CreateCommentLikeInput {
  user_id: string;
  type: string;
  comment_id: string;
}

export interface CommentLike {
  id: string;
  user_id: string;
  comment_id: string;
  type: string;
  status: boolean;
}

export interface Package {
  id: string;
  gig_id: string;
  title: string;
  name: string;
  price: string;
  descr: string;
  keywords: string;
  delivery: string;
  revision: string;
  additional_banner: number;
  additional_source: number;
  created_at: string;
  updated_at: string;
}

export interface GigPaginator extends PaginatorInfo<Gig> {}
export interface Gig {
  id: string;
  user_id: string;
  title: string;
  categories: string;
  sub_categories: string;
  descr: string;
  keywords: string;
  attachments: Attachment[];
  created_at: string;
  updated_at: string;
  followers_count: string;
  orders_amount?: number;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  profile: {
    id: string;
    avatar?: Attachment;
    bio: string;
  };
  likes_count: number;
  likes: [{ user_id: string }];
  packages?: [Package];
}

export interface GigResponse {
  id: string;
  user_id: string;
  title: string;
  categories: string;
  sub_categories: string;
  descr: string;
  keywords: string;
  attachments: Attachment[];
  created_at: string;
  updated_at: string;
}

export interface CreateGigInput {
  title: string;
  categories: string;
  sub_categories: string;
  descr: string;
  keywords: string;
  attachments: Attachment[];
  packages: [
    {
      id: string;
      post_id: string;
      name: string;
      price: string;
      descr: string;
      keywords: string;
      delivery: string;
      revision: string;
      additional_banner: boolean;
      additional_source: boolean;
    }
  ];
}

export interface GigLike {
  id: string;
  gig_id: string;
  user_id: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}
export interface CreateGigLikeInput {
  user_id: string;
  gig_id: string;
}
export interface Community {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  description: string;
  logo: Attachment;
  cover_image: Attachment;
  is_active: boolean;
  is_private: boolean;
  members_count: number;
  created_at: string;
  updated_at: string;
}

export interface CommunityPaginator extends PaginatorInfo<Community> {}
