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
  getPost: SinglePostResponse;
  getAllPosts: Array<Post>;
  getUserDetails: UserResponse;
  currentUser?: Maybe<User>;
};


export type QueryGetPostArgs = {
  id: Scalars['String'];
};


export type QueryGetUserDetailsArgs = {
  userId: Scalars['String'];
};

export type SinglePostResponse = {
  __typename?: 'SinglePostResponse';
  post?: Maybe<Post>;
  error?: Maybe<PostError>;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creator: User;
  comments: Array<Scalars['String']>;
  likes: Scalars['Float'];
};


export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  username: Scalars['String'];
  createdAt: Scalars['DateTime'];
  bio?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
};

export type PostError = {
  __typename?: 'PostError';
  message: Scalars['String'];
  field: Scalars['String'];
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

export type Mutation = {
  __typename?: 'Mutation';
  createPost: PostResponse;
  createComment: CommentResponse;
  createAccount: UserResponse;
  login: UserResponse;
  addUserDetails: UserResponse;
  logout: Scalars['Boolean'];
  like: LikeResponse;
};


export type MutationCreatePostArgs = {
  creatorId: Scalars['String'];
  content: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  options: CommentInput;
};


export type MutationCreateAccountArgs = {
  input: UserInput;
};


export type MutationLoginArgs = {
  input: UserInput;
};


export type MutationAddUserDetailsArgs = {
  userId: Scalars['String'];
  options: DetailsInput;
};


export type MutationLikeArgs = {
  options: LikeInput;
};

export type PostResponse = {
  __typename?: 'PostResponse';
  post?: Maybe<Post>;
  error?: Maybe<PostError>;
};

export type CommentResponse = {
  __typename?: 'CommentResponse';
  comment?: Maybe<Comment>;
  error?: Maybe<PostError>;
};

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['ID'];
  content: Scalars['String'];
  postId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creator: User;
};

export type CommentInput = {
  content: Scalars['String'];
  creatorId: Scalars['String'];
  postId: Scalars['String'];
};

export type UserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type DetailsInput = {
  username: Scalars['String'];
  bio: Scalars['String'];
  location: Scalars['String'];
};

export type LikeResponse = {
  __typename?: 'LikeResponse';
  post?: Maybe<Post>;
  error?: Maybe<LikeError>;
};

export type LikeError = {
  __typename?: 'LikeError';
  message: Scalars['String'];
  field: Scalars['String'];
};

export type LikeInput = {
  value: Scalars['Boolean'];
  postId: Scalars['String'];
  userId: Scalars['String'];
};

export type AllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPostsQuery = (
  { __typename?: 'Query' }
  & { getAllPosts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, '_id' | 'content' | 'createdAt' | 'likes' | 'comments'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'username' | '_id' | 'createdAt'>
    ) }
  )> }
);

export type CreateAccountMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateAccountMutation = (
  { __typename?: 'Mutation' }
  & { createAccount: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | '_id' | 'createdAt' | 'bio' | 'location'>
    )>, error?: Maybe<(
      { __typename?: 'UserError' }
      & Pick<UserError, 'message'>
    )> }
  ) }
);

export type GetPostQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetPostQuery = (
  { __typename?: 'Query' }
  & { getPost: (
    { __typename?: 'SinglePostResponse' }
    & { post?: Maybe<(
      { __typename?: 'Post' }
      & Pick<Post, '_id' | 'content' | 'createdAt' | 'comments' | 'likes'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, '_id' | 'username' | 'createdAt'>
      ) }
    )>, error?: Maybe<(
      { __typename?: 'PostError' }
      & Pick<PostError, 'message' | 'field'>
    )> }
  ) }
);


export const AllPostsDocument = gql`
    query AllPosts {
  getAllPosts {
    _id
    content
    createdAt
    likes
    comments
    creator {
      username
      _id
      createdAt
    }
  }
}
    `;

export function useAllPostsQuery(options: Omit<Urql.UseQueryArgs<AllPostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllPostsQuery>({ query: AllPostsDocument, ...options });
};
export const CreateAccountDocument = gql`
    mutation CreateAccount($username: String!, $password: String!) {
  createAccount(input: {username: $username, password: $password}) {
    user {
      username
      _id
      createdAt
      bio
      location
    }
    error {
      message
    }
  }
}
    `;

export function useCreateAccountMutation() {
  return Urql.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument);
};
export const GetPostDocument = gql`
    query GetPost($id: String!) {
  getPost(id: $id) {
    post {
      _id
      content
      createdAt
      comments
      likes
      comments
      creator {
        _id
        username
        createdAt
      }
    }
    error {
      message
      field
    }
  }
}
    `;

export function useGetPostQuery(options: Omit<Urql.UseQueryArgs<GetPostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPostQuery>({ query: GetPostDocument, ...options });
};