import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  getPost: Post;
  getAllPosts: Array<Post>;
};


export type QueryGetPostArgs = {
  id: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creator: User;
  comments?: Maybe<Array<Post>>;
};


export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost?: Maybe<PostResponse>;
  createAccount: UserResponse;
  login: UserResponse;
};


export type MutationCreatePostArgs = {
  creatorId: Scalars['String'];
  content: Scalars['String'];
};


export type MutationCreateAccountArgs = {
  input: UserInput;
};


export type MutationLoginArgs = {
  input: UserInput;
};

export type PostResponse = {
  __typename?: 'PostResponse';
  post?: Maybe<Post>;
  error?: Maybe<PostError>;
};

export type PostError = {
  __typename?: 'PostError';
  message: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<User>;
  error?: Maybe<UserError>;
};

export type UserError = {
  __typename?: 'UserError';
  message: Scalars['String'];
  field: Scalars['String'];
};

export type UserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type AllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPostsQuery = (
  { __typename?: 'Query' }
  & { getAllPosts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'content' | 'createdAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  )> }
);


export const AllPostsDocument = gql`
    query AllPosts {
  getAllPosts {
    content
    createdAt
    creator {
      username
    }
    createdAt
  }
}
    `;

export function useAllPostsQuery(options: Omit<Urql.UseQueryArgs<AllPostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllPostsQuery>({ query: AllPostsDocument, ...options });
};