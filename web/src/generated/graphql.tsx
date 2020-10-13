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
  getPostsByUser: Array<Post>;
  getUserDetails: UserResponse;
  getUser: UserResponse;
  currentUser?: Maybe<User>;
  getLikesByUser?: Maybe<Array<Like>>;
  getCommentsByUser: Array<Post>;
  search: Response;
};


export type QueryGetPostArgs = {
  id: Scalars['String'];
};


export type QueryGetPostsByUserArgs = {
  userId: Scalars['String'];
};


export type QueryGetUserDetailsArgs = {
  userId: Scalars['String'];
};


export type QueryGetUserArgs = {
  username: Scalars['String'];
};


export type QueryGetLikesByUserArgs = {
  userId: Scalars['String'];
};


export type QueryGetCommentsByUserArgs = {
  userId: Scalars['String'];
};


export type QuerySearchArgs = {
  searchTerm: Scalars['String'];
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
  comments: Array<Comment>;
  likes: Array<Like>;
};


export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['DateTime'];
  bio: Scalars['String'];
  location: Scalars['String'];
  image: Scalars['String'];
  fullname: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['ID'];
  content: Scalars['String'];
  postId: Scalars['String'];
  creatorId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creator: User;
};

export type Like = {
  __typename?: 'Like';
  _id: Scalars['ID'];
  postId: Scalars['String'];
  creator: User;
  creatorId: Scalars['String'];
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

export type Response = {
  __typename?: 'Response';
  posts: Array<Post>;
  users: Array<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  createAccount: UserResponse;
  login: UserResponse;
  addUserDetails: UserResponse;
  logout: Scalars['Boolean'];
  likePost: LikeResponse;
  createComment: CommentResponse;
};


export type MutationCreatePostArgs = {
  content: Scalars['String'];
};


export type MutationCreateAccountArgs = {
  input: UserInput;
};


export type MutationLoginArgs = {
  input: UserInput;
};


export type MutationAddUserDetailsArgs = {
  input: DetailsInput;
};


export type MutationLikePostArgs = {
  postId: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  input: CommentInput;
};

export type UserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email?: Maybe<Scalars['String']>;
};

export type DetailsInput = {
  username: Scalars['String'];
  bio: Scalars['String'];
  location: Scalars['String'];
  email: Scalars['String'];
  fullname: Scalars['String'];
};

export type LikeResponse = {
  __typename?: 'LikeResponse';
  state: Scalars['Boolean'];
  message: Scalars['String'];
};

export type CommentResponse = {
  __typename?: 'CommentResponse';
  comment?: Maybe<Comment>;
  error?: Maybe<CommentError>;
};

export type CommentError = {
  __typename?: 'CommentError';
  message: Scalars['String'];
  field: Scalars['String'];
};

export type CommentInput = {
  content: Scalars['String'];
  postId: Scalars['String'];
};

export type PostDetailsFragment = (
  { __typename?: 'Post' }
  & Pick<Post, '_id' | 'content' | 'createdAt'>
  & { creator: (
    { __typename?: 'User' }
    & UserPartialDetailsFragment
  ), likes: Array<(
    { __typename?: 'Like' }
    & Pick<Like, '_id' | 'creatorId'>
  )>, comments: Array<(
    { __typename?: 'Comment' }
    & Pick<Comment, '_id'>
  )> }
);

export type UserFullDetailsFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'username' | 'email' | 'bio' | 'createdAt' | 'location' | 'image' | 'fullname'>
);

export type UserPartialDetailsFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'username' | 'image' | 'fullname'>
);

export type AddUserDetailsMutationVariables = Exact<{
  username: Scalars['String'];
  bio: Scalars['String'];
  location: Scalars['String'];
  email: Scalars['String'];
  fullname: Scalars['String'];
}>;


export type AddUserDetailsMutation = (
  { __typename?: 'Mutation' }
  & { addUserDetails: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'createdAt' | 'bio' | 'location' | 'email'>
    )>, error?: Maybe<(
      { __typename?: 'UserError' }
      & Pick<UserError, 'message' | 'field'>
    )> }
  ) }
);

export type CreateAccountMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type CreateAccountMutation = (
  { __typename?: 'Mutation' }
  & { createAccount: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | '_id' | 'createdAt' | 'bio' | 'location' | 'email' | 'image' | 'fullname'>
    )>, error?: Maybe<(
      { __typename?: 'UserError' }
      & Pick<UserError, 'message' | 'field'>
    )> }
  ) }
);

export type CreateCommentMutationVariables = Exact<{
  content: Scalars['String'];
  postId: Scalars['String'];
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'CommentResponse' }
    & { comment?: Maybe<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'content' | '_id' | 'postId'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )>, error?: Maybe<(
      { __typename?: 'CommentError' }
      & Pick<CommentError, 'message'>
    )> }
  ) }
);

export type CreatePostMutationVariables = Exact<{
  content: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'content' | '_id' | 'createdAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'bio' | '_id'>
    ) }
  ) }
);

export type LikePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type LikePostMutation = (
  { __typename?: 'Mutation' }
  & { likePost: (
    { __typename?: 'LikeResponse' }
    & Pick<LikeResponse, 'state' | 'message'>
  ) }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | '_id' | 'createdAt' | 'bio' | 'location' | 'email' | 'image' | 'fullname'>
    )>, error?: Maybe<(
      { __typename?: 'UserError' }
      & Pick<UserError, 'message' | 'field'>
    )> }
  ) }
);

export type AllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPostsQuery = (
  { __typename?: 'Query' }
  & { getAllPosts: Array<(
    { __typename?: 'Post' }
    & PostDetailsFragment
  )> }
);

export type GetCommentsByUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetCommentsByUserQuery = (
  { __typename?: 'Query' }
  & { getCommentsByUser: Array<(
    { __typename?: 'Post' }
    & Pick<Post, '_id' | 'content' | 'createdAt'>
    & { creator: (
      { __typename?: 'User' }
      & UserPartialDetailsFragment
    ), likes: Array<(
      { __typename?: 'Like' }
      & Pick<Like, '_id' | 'creatorId'>
    )>, comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, '_id'>
    )> }
  )> }
);

export type GetCurrentUserDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserDetailsQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & UserFullDetailsFragment
  )> }
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
      & Pick<Post, '_id' | 'content' | 'createdAt'>
      & { creator: (
        { __typename?: 'User' }
        & UserPartialDetailsFragment
      ), comments: Array<(
        { __typename?: 'Comment' }
        & Pick<Comment, '_id' | 'content' | 'creatorId' | 'createdAt'>
        & { creator: (
          { __typename?: 'User' }
          & UserPartialDetailsFragment
        ) }
      )>, likes: Array<(
        { __typename?: 'Like' }
        & Pick<Like, '_id'>
        & { creator: (
          { __typename?: 'User' }
          & UserPartialDetailsFragment
        ) }
      )> }
    )> }
  ) }
);

export type GetPostsByUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetPostsByUserQuery = (
  { __typename?: 'Query' }
  & { getPostsByUser: Array<(
    { __typename?: 'Post' }
    & PostDetailsFragment
  )> }
);

export type GetUserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFullDetailsFragment
    )>, error?: Maybe<(
      { __typename?: 'UserError' }
      & Pick<UserError, 'message' | 'field'>
    )> }
  ) }
);

export type GetUserDetailsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserDetailsQuery = (
  { __typename?: 'Query' }
  & { getUserDetails: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFullDetailsFragment
    )> }
  ) }
);

export type SearchQueryVariables = Exact<{
  searchTerm: Scalars['String'];
}>;


export type SearchQuery = (
  { __typename?: 'Query' }
  & { search: (
    { __typename?: 'Response' }
    & { posts: Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'content' | '_id' | 'createdAt'>
      & { creator: (
        { __typename?: 'User' }
        & UserPartialDetailsFragment
      ), comments: Array<(
        { __typename?: 'Comment' }
        & Pick<Comment, '_id'>
      )>, likes: Array<(
        { __typename?: 'Like' }
        & Pick<Like, '_id' | 'creatorId'>
        & { creator: (
          { __typename?: 'User' }
          & UserPartialDetailsFragment
        ) }
      )> }
    )>, users: Array<(
      { __typename?: 'User' }
      & UserPartialDetailsFragment
    )> }
  ) }
);

export const UserPartialDetailsFragmentDoc = gql`
    fragment UserPartialDetails on User {
  _id
  username
  image
  fullname
}
    `;
export const PostDetailsFragmentDoc = gql`
    fragment PostDetails on Post {
  _id
  content
  createdAt
  creator {
    ...UserPartialDetails
  }
  likes {
    _id
    creatorId
  }
  comments {
    _id
  }
}
    ${UserPartialDetailsFragmentDoc}`;
export const UserFullDetailsFragmentDoc = gql`
    fragment UserFullDetails on User {
  _id
  username
  email
  bio
  createdAt
  location
  image
  fullname
}
    `;
export const AddUserDetailsDocument = gql`
    mutation AddUserDetails($username: String!, $bio: String!, $location: String!, $email: String!, $fullname: String!) {
  addUserDetails(input: {username: $username, bio: $bio, location: $location, email: $email, fullname: $fullname}) {
    user {
      username
      createdAt
      bio
      location
      email
    }
    error {
      message
      field
    }
  }
}
    `;

export function useAddUserDetailsMutation() {
  return Urql.useMutation<AddUserDetailsMutation, AddUserDetailsMutationVariables>(AddUserDetailsDocument);
};
export const CreateAccountDocument = gql`
    mutation CreateAccount($username: String!, $password: String!, $email: String!) {
  createAccount(input: {username: $username, password: $password, email: $email}) {
    user {
      username
      _id
      createdAt
      bio
      location
      email
      image
      fullname
    }
    error {
      message
      field
    }
  }
}
    `;

export function useCreateAccountMutation() {
  return Urql.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument);
};
export const CreateCommentDocument = gql`
    mutation CreateComment($content: String!, $postId: String!) {
  createComment(input: {content: $content, postId: $postId}) {
    comment {
      content
      _id
      postId
      creator {
        username
      }
    }
    error {
      message
    }
  }
}
    `;

export function useCreateCommentMutation() {
  return Urql.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($content: String!) {
  createPost(content: $content) {
    content
    _id
    createdAt
    creator {
      username
      bio
      _id
    }
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const LikePostDocument = gql`
    mutation LikePost($postId: String!) {
  likePost(postId: $postId) {
    state
    message
  }
}
    `;

export function useLikePostMutation() {
  return Urql.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(input: {username: $username, password: $password}) {
    user {
      username
      _id
      createdAt
      bio
      location
      email
      image
      fullname
    }
    error {
      message
      field
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const AllPostsDocument = gql`
    query AllPosts {
  getAllPosts {
    ...PostDetails
  }
}
    ${PostDetailsFragmentDoc}`;

export function useAllPostsQuery(options: Omit<Urql.UseQueryArgs<AllPostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllPostsQuery>({ query: AllPostsDocument, ...options });
};
export const GetCommentsByUserDocument = gql`
    query GetCommentsByUser($userId: String!) {
  getCommentsByUser(userId: $userId) {
    _id
    content
    createdAt
    creator {
      ...UserPartialDetails
    }
    likes {
      _id
      creatorId
    }
    comments {
      _id
    }
  }
}
    ${UserPartialDetailsFragmentDoc}`;

export function useGetCommentsByUserQuery(options: Omit<Urql.UseQueryArgs<GetCommentsByUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCommentsByUserQuery>({ query: GetCommentsByUserDocument, ...options });
};
export const GetCurrentUserDetailsDocument = gql`
    query GetCurrentUserDetails {
  currentUser {
    ...UserFullDetails
  }
}
    ${UserFullDetailsFragmentDoc}`;

export function useGetCurrentUserDetailsQuery(options: Omit<Urql.UseQueryArgs<GetCurrentUserDetailsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCurrentUserDetailsQuery>({ query: GetCurrentUserDetailsDocument, ...options });
};
export const GetPostDocument = gql`
    query GetPost($id: String!) {
  getPost(id: $id) {
    post {
      _id
      content
      createdAt
      creator {
        ...UserPartialDetails
      }
      comments {
        _id
        content
        creatorId
        createdAt
        creator {
          ...UserPartialDetails
        }
      }
      likes {
        _id
        creator {
          ...UserPartialDetails
        }
      }
    }
  }
}
    ${UserPartialDetailsFragmentDoc}`;

export function useGetPostQuery(options: Omit<Urql.UseQueryArgs<GetPostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPostQuery>({ query: GetPostDocument, ...options });
};
export const GetPostsByUserDocument = gql`
    query GetPostsByUser($userId: String!) {
  getPostsByUser(userId: $userId) {
    ...PostDetails
  }
}
    ${PostDetailsFragmentDoc}`;

export function useGetPostsByUserQuery(options: Omit<Urql.UseQueryArgs<GetPostsByUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPostsByUserQuery>({ query: GetPostsByUserDocument, ...options });
};
export const GetUserDocument = gql`
    query GetUser($username: String!) {
  getUser(username: $username) {
    user {
      ...UserFullDetails
    }
    error {
      message
      field
    }
  }
}
    ${UserFullDetailsFragmentDoc}`;

export function useGetUserQuery(options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserQuery>({ query: GetUserDocument, ...options });
};
export const GetUserDetailsDocument = gql`
    query GetUserDetails($id: String!) {
  getUserDetails(userId: $id) {
    user {
      ...UserFullDetails
    }
  }
}
    ${UserFullDetailsFragmentDoc}`;

export function useGetUserDetailsQuery(options: Omit<Urql.UseQueryArgs<GetUserDetailsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserDetailsQuery>({ query: GetUserDetailsDocument, ...options });
};
export const SearchDocument = gql`
    query Search($searchTerm: String!) {
  search(searchTerm: $searchTerm) {
    posts {
      content
      _id
      createdAt
      creator {
        ...UserPartialDetails
      }
      comments {
        _id
      }
      likes {
        _id
        creatorId
        creator {
          ...UserPartialDetails
        }
      }
    }
    users {
      ...UserPartialDetails
    }
  }
}
    ${UserPartialDetailsFragmentDoc}`;

export function useSearchQuery(options: Omit<Urql.UseQueryArgs<SearchQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SearchQuery>({ query: SearchDocument, ...options });
};