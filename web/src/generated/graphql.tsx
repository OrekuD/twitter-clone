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
  getTweet: SingleTweetResponse;
  getAllTweets: Array<Tweet>;
  getTweetsByUser: Array<Tweet>;
  getUserDetails: UserResponse;
  getUser: UserResponse;
  currentUser?: Maybe<User>;
  getLikesByUser?: Maybe<Array<Like>>;
  getCommentsByUser: Array<Tweet>;
  search: Response;
  getTrends: Array<Trends>;
  getTrendsByHashtag?: Maybe<Trends>;
};


export type QueryGetTweetArgs = {
  id: Scalars['String'];
};


export type QueryGetTweetsByUserArgs = {
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


export type QueryGetTrendsByHashtagArgs = {
  hashtag: Scalars['String'];
};

export type SingleTweetResponse = {
  __typename?: 'SingleTweetResponse';
  tweet?: Maybe<Tweet>;
  error?: Maybe<TweetError>;
};

export type Tweet = {
  __typename?: 'Tweet';
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
  tweetId: Scalars['String'];
  creatorId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creator: User;
  likes: Array<Like>;
};

export type Like = {
  __typename?: 'Like';
  _id: Scalars['ID'];
  tweetId: Scalars['String'];
  creator: User;
  creatorId: Scalars['String'];
};

export type TweetError = {
  __typename?: 'TweetError';
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
  tweets: Array<Tweet>;
  users: Array<User>;
};

export type Trends = {
  __typename?: 'Trends';
  _id: Scalars['ID'];
  hashtag: Scalars['String'];
  tweets: Array<Tweet>;
  numberOfTweets: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTweet: Tweet;
  createAccount: UserResponse;
  login: UserResponse;
  addUserDetails: UserResponse;
  logout: Scalars['Boolean'];
  likeTweet: LikeResponse;
  createComment: CommentResponse;
};


export type MutationCreateTweetArgs = {
  content: Scalars['String'];
};


export type MutationCreateAccountArgs = {
  input: RegisterInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationAddUserDetailsArgs = {
  input: DetailsInput;
};


export type MutationLikeTweetArgs = {
  isComment: Scalars['Boolean'];
  tweetId: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  input: CommentInput;
};

export type RegisterInput = {
  username: Scalars['String'];
  fullname: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
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
  tweetId: Scalars['String'];
};

export type TweetDetailsFragment = (
  { __typename?: 'Tweet' }
  & Pick<Tweet, '_id' | 'content' | 'createdAt'>
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
  fullname: Scalars['String'];
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
  tweetId: Scalars['String'];
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'CommentResponse' }
    & { comment?: Maybe<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'content' | '_id' | 'tweetId'>
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

export type CreateTweetMutationVariables = Exact<{
  content: Scalars['String'];
}>;


export type CreateTweetMutation = (
  { __typename?: 'Mutation' }
  & { createTweet: (
    { __typename?: 'Tweet' }
    & Pick<Tweet, 'content' | '_id' | 'createdAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'bio' | '_id'>
    ) }
  ) }
);

export type LikeTweetMutationVariables = Exact<{
  tweetId: Scalars['String'];
  isComment: Scalars['Boolean'];
}>;


export type LikeTweetMutation = (
  { __typename?: 'Mutation' }
  & { likeTweet: (
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

export type AllTweetsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTweetsQuery = (
  { __typename?: 'Query' }
  & { getAllTweets: Array<(
    { __typename?: 'Tweet' }
    & TweetDetailsFragment
  )> }
);

export type GetCommentsByUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetCommentsByUserQuery = (
  { __typename?: 'Query' }
  & { getCommentsByUser: Array<(
    { __typename?: 'Tweet' }
    & Pick<Tweet, '_id' | 'content' | 'createdAt'>
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

export type GetTrendsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTrendsQuery = (
  { __typename?: 'Query' }
  & { getTrends: Array<(
    { __typename?: 'Trends' }
    & Pick<Trends, 'hashtag' | 'numberOfTweets'>
  )> }
);

export type GetTrendsByHashtagQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTrendsByHashtagQuery = (
  { __typename?: 'Query' }
  & { getTrendsByHashtag?: Maybe<(
    { __typename?: 'Trends' }
    & Pick<Trends, 'hashtag' | 'numberOfTweets'>
    & { tweets: Array<(
      { __typename?: 'Tweet' }
      & TweetDetailsFragment
    )> }
  )> }
);

export type GetTweetQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetTweetQuery = (
  { __typename?: 'Query' }
  & { getTweet: (
    { __typename?: 'SingleTweetResponse' }
    & { tweet?: Maybe<(
      { __typename?: 'Tweet' }
      & Pick<Tweet, '_id' | 'content' | 'createdAt'>
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

export type GetTweetsByUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetTweetsByUserQuery = (
  { __typename?: 'Query' }
  & { getTweetsByUser: Array<(
    { __typename?: 'Tweet' }
    & TweetDetailsFragment
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
    & { tweets: Array<(
      { __typename?: 'Tweet' }
      & Pick<Tweet, 'content' | '_id' | 'createdAt'>
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
export const TweetDetailsFragmentDoc = gql`
    fragment TweetDetails on Tweet {
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
    mutation CreateAccount($username: String!, $password: String!, $email: String!, $fullname: String!) {
  createAccount(input: {username: $username, password: $password, email: $email, fullname: $fullname}) {
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
    mutation CreateComment($content: String!, $tweetId: String!) {
  createComment(input: {content: $content, tweetId: $tweetId}) {
    comment {
      content
      _id
      tweetId
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
export const CreateTweetDocument = gql`
    mutation CreateTweet($content: String!) {
  createTweet(content: $content) {
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

export function useCreateTweetMutation() {
  return Urql.useMutation<CreateTweetMutation, CreateTweetMutationVariables>(CreateTweetDocument);
};
export const LikeTweetDocument = gql`
    mutation LikeTweet($tweetId: String!, $isComment: Boolean!) {
  likeTweet(tweetId: $tweetId, isComment: $isComment) {
    state
    message
  }
}
    `;

export function useLikeTweetMutation() {
  return Urql.useMutation<LikeTweetMutation, LikeTweetMutationVariables>(LikeTweetDocument);
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
export const AllTweetsDocument = gql`
    query AllTweets {
  getAllTweets {
    ...TweetDetails
  }
}
    ${TweetDetailsFragmentDoc}`;

export function useAllTweetsQuery(options: Omit<Urql.UseQueryArgs<AllTweetsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllTweetsQuery>({ query: AllTweetsDocument, ...options });
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
export const GetTrendsDocument = gql`
    query GetTrends {
  getTrends {
    hashtag
    numberOfTweets
  }
}
    `;

export function useGetTrendsQuery(options: Omit<Urql.UseQueryArgs<GetTrendsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetTrendsQuery>({ query: GetTrendsDocument, ...options });
};
export const GetTrendsByHashtagDocument = gql`
    query GetTrendsByHashtag {
  getTrendsByHashtag(hashtag: "#100") {
    hashtag
    numberOfTweets
    tweets {
      ...TweetDetails
    }
  }
}
    ${TweetDetailsFragmentDoc}`;

export function useGetTrendsByHashtagQuery(options: Omit<Urql.UseQueryArgs<GetTrendsByHashtagQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetTrendsByHashtagQuery>({ query: GetTrendsByHashtagDocument, ...options });
};
export const GetTweetDocument = gql`
    query GetTweet($id: String!) {
  getTweet(id: $id) {
    tweet {
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

export function useGetTweetQuery(options: Omit<Urql.UseQueryArgs<GetTweetQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetTweetQuery>({ query: GetTweetDocument, ...options });
};
export const GetTweetsByUserDocument = gql`
    query GetTweetsByUser($userId: String!) {
  getTweetsByUser(userId: $userId) {
    ...TweetDetails
  }
}
    ${TweetDetailsFragmentDoc}`;

export function useGetTweetsByUserQuery(options: Omit<Urql.UseQueryArgs<GetTweetsByUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetTweetsByUserQuery>({ query: GetTweetsByUserDocument, ...options });
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
    tweets {
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