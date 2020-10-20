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
  getTweetComments: Array<Tweet>;
  getTweetsByUser: Array<Tweet>;
  getCurrentUserTimeline: Array<Tweet>;
  getUserTimeline: Array<Tweet>;
  getUserDetails: UserResponse;
  getUserByUsername: UserResponse;
  currentUser?: Maybe<User>;
  getAllUsers: Array<User>;
  getLikesByUser?: Maybe<Array<Like>>;
  search: Response;
  getTrends: Array<Trends>;
  getTweetsByHashtag?: Maybe<Trends>;
};


export type QueryGetTweetArgs = {
  id: Scalars['String'];
};


export type QueryGetTweetCommentsArgs = {
  tweetId: Scalars['String'];
};


export type QueryGetTweetsByUserArgs = {
  userId: Scalars['String'];
};


export type QueryGetUserTimelineArgs = {
  userId: Scalars['String'];
};


export type QueryGetUserDetailsArgs = {
  userId: Scalars['String'];
};


export type QueryGetUserByUsernameArgs = {
  username: Scalars['String'];
};


export type QueryGetLikesByUserArgs = {
  userId: Scalars['String'];
};


export type QuerySearchArgs = {
  searchTerm: Scalars['String'];
};


export type QueryGetTweetsByHashtagArgs = {
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
  parentId?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  isRetweet: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  commentsCount: Scalars['Float'];
  creator: User;
  likes: Array<User>;
  retweets: Array<User>;
  likesCount: Scalars['Int'];
  retweetsCount: Scalars['Int'];
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
  following: Array<User>;
  followers: Array<User>;
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

export type Like = {
  __typename?: 'Like';
  _id: Scalars['ID'];
  tweetId: Scalars['String'];
  creator: User;
  creatorId: Scalars['String'];
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
  createComment: SingleTweetResponse;
  createReTweet: SingleTweetResponse;
  createAccount: UserResponse;
  login: UserResponse;
  addUserDetails: UserResponse;
  followUser: Scalars['Boolean'];
  unFollowUser: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  likeTweet: LikeResponse;
};


export type MutationCreateTweetArgs = {
  content: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  input: CommentInput;
};


export type MutationCreateReTweetArgs = {
  tweetId: Scalars['String'];
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


export type MutationFollowUserArgs = {
  userId: Scalars['String'];
};


export type MutationUnFollowUserArgs = {
  userId: Scalars['String'];
};


export type MutationLikeTweetArgs = {
  tweetId: Scalars['String'];
};

export type CommentInput = {
  content: Scalars['String'];
  tweetId: Scalars['String'];
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

export type TweetDetailsFragment = (
  { __typename?: 'Tweet' }
  & Pick<Tweet, '_id' | 'content' | 'createdAt' | 'isRetweet' | 'commentsCount'>
  & { creator: (
    { __typename?: 'User' }
    & UserPartialDetailsFragment
  ), likes: Array<(
    { __typename?: 'User' }
    & UserPartialDetailsFragment
  )>, retweets: Array<(
    { __typename?: 'User' }
    & UserPartialDetailsFragment
  )> }
);

export type UserFullDetailsFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'username' | 'email' | 'bio' | 'createdAt' | 'location' | 'image' | 'fullname'>
  & { followers: Array<(
    { __typename?: 'User' }
    & UserPartialDetailsFragment
  )>, following: Array<(
    { __typename?: 'User' }
    & UserPartialDetailsFragment
  )> }
);

export type UserPartialDetailsFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'username' | 'image' | 'fullname' | 'bio'>
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
    { __typename?: 'SingleTweetResponse' }
    & { tweet?: Maybe<(
      { __typename?: 'Tweet' }
      & Pick<Tweet, 'content' | '_id' | 'parentId'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )>, error?: Maybe<(
      { __typename?: 'TweetError' }
      & Pick<TweetError, 'message' | 'field'>
    )> }
  ) }
);

export type CreateReTweetMutationVariables = Exact<{
  tweetId: Scalars['String'];
}>;


export type CreateReTweetMutation = (
  { __typename?: 'Mutation' }
  & { createReTweet: (
    { __typename?: 'SingleTweetResponse' }
    & { tweet?: Maybe<(
      { __typename?: 'Tweet' }
      & Pick<Tweet, 'content' | '_id' | 'createdAt'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'username' | 'bio' | '_id'>
      ) }
    )>, error?: Maybe<(
      { __typename?: 'TweetError' }
      & Pick<TweetError, 'message' | 'field'>
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

export type FollowerUserMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type FollowerUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'followUser'>
);

export type LikeTweetMutationVariables = Exact<{
  tweetId: Scalars['String'];
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

export type UnFollowerUserMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UnFollowerUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'unFollowUser'>
);

export type AllTweetsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTweetsQuery = (
  { __typename?: 'Query' }
  & { getAllTweets: Array<(
    { __typename?: 'Tweet' }
    & TweetDetailsFragment
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

export type GetCurrentUserTimelineQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserTimelineQuery = (
  { __typename?: 'Query' }
  & { getCurrentUserTimeline: Array<(
    { __typename?: 'Tweet' }
    & TweetDetailsFragment
  )> }
);

export type GetTrendsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTrendsQuery = (
  { __typename?: 'Query' }
  & { getTrends: Array<(
    { __typename?: 'Trends' }
    & Pick<Trends, 'hashtag' | 'numberOfTweets' | '_id'>
  )> }
);

export type GetTweetsByHashtagQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTweetsByHashtagQuery = (
  { __typename?: 'Query' }
  & { getTweetsByHashtag?: Maybe<(
    { __typename?: 'Trends' }
    & Pick<Trends, '_id' | 'hashtag'>
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
      & TweetDetailsFragment
    )>, error?: Maybe<(
      { __typename?: 'TweetError' }
      & Pick<TweetError, 'message' | 'field'>
    )> }
  ) }
);

export type GetTweetCommentsQueryVariables = Exact<{
  tweetId: Scalars['String'];
}>;


export type GetTweetCommentsQuery = (
  { __typename?: 'Query' }
  & { getTweetComments: Array<(
    { __typename?: 'Tweet' }
    & TweetDetailsFragment
  )> }
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

export type GetUserByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetUserByUsernameQuery = (
  { __typename?: 'Query' }
  & { getUserByUsername: (
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
    )>, error?: Maybe<(
      { __typename?: 'UserError' }
      & Pick<UserError, 'message' | 'field'>
    )> }
  ) }
);

export type GetUserTimelineQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserTimelineQuery = (
  { __typename?: 'Query' }
  & { getUserTimeline: Array<(
    { __typename?: 'Tweet' }
    & TweetDetailsFragment
  )> }
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
      & TweetDetailsFragment
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
  bio
}
    `;
export const TweetDetailsFragmentDoc = gql`
    fragment TweetDetails on Tweet {
  _id
  content
  createdAt
  isRetweet
  creator {
    ...UserPartialDetails
  }
  likes {
    ...UserPartialDetails
  }
  retweets {
    ...UserPartialDetails
  }
  commentsCount
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
  followers {
    ...UserPartialDetails
  }
  following {
    ...UserPartialDetails
  }
}
    ${UserPartialDetailsFragmentDoc}`;
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
    tweet {
      content
      _id
      parentId
      creator {
        username
      }
    }
    error {
      message
      field
    }
  }
}
    `;

export function useCreateCommentMutation() {
  return Urql.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument);
};
export const CreateReTweetDocument = gql`
    mutation CreateReTweet($tweetId: String!) {
  createReTweet(tweetId: $tweetId) {
    tweet {
      content
      _id
      createdAt
      creator {
        username
        bio
        _id
      }
    }
    error {
      message
      field
    }
  }
}
    `;

export function useCreateReTweetMutation() {
  return Urql.useMutation<CreateReTweetMutation, CreateReTweetMutationVariables>(CreateReTweetDocument);
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
export const FollowerUserDocument = gql`
    mutation FollowerUser($userId: String!) {
  followUser(userId: $userId)
}
    `;

export function useFollowerUserMutation() {
  return Urql.useMutation<FollowerUserMutation, FollowerUserMutationVariables>(FollowerUserDocument);
};
export const LikeTweetDocument = gql`
    mutation LikeTweet($tweetId: String!) {
  likeTweet(tweetId: $tweetId) {
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
export const UnFollowerUserDocument = gql`
    mutation UnFollowerUser($userId: String!) {
  unFollowUser(userId: $userId)
}
    `;

export function useUnFollowerUserMutation() {
  return Urql.useMutation<UnFollowerUserMutation, UnFollowerUserMutationVariables>(UnFollowerUserDocument);
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
export const GetCurrentUserTimelineDocument = gql`
    query GetCurrentUserTimeline {
  getCurrentUserTimeline {
    ...TweetDetails
  }
}
    ${TweetDetailsFragmentDoc}`;

export function useGetCurrentUserTimelineQuery(options: Omit<Urql.UseQueryArgs<GetCurrentUserTimelineQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCurrentUserTimelineQuery>({ query: GetCurrentUserTimelineDocument, ...options });
};
export const GetTrendsDocument = gql`
    query GetTrends {
  getTrends {
    hashtag
    numberOfTweets
    _id
  }
}
    `;

export function useGetTrendsQuery(options: Omit<Urql.UseQueryArgs<GetTrendsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetTrendsQuery>({ query: GetTrendsDocument, ...options });
};
export const GetTweetsByHashtagDocument = gql`
    query GetTweetsByHashtag {
  getTweetsByHashtag(hashtag: "#100") {
    _id
    hashtag
    tweets {
      ...TweetDetails
    }
  }
}
    ${TweetDetailsFragmentDoc}`;

export function useGetTweetsByHashtagQuery(options: Omit<Urql.UseQueryArgs<GetTweetsByHashtagQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetTweetsByHashtagQuery>({ query: GetTweetsByHashtagDocument, ...options });
};
export const GetTweetDocument = gql`
    query GetTweet($id: String!) {
  getTweet(id: $id) {
    tweet {
      ...TweetDetails
    }
    error {
      message
      field
    }
  }
}
    ${TweetDetailsFragmentDoc}`;

export function useGetTweetQuery(options: Omit<Urql.UseQueryArgs<GetTweetQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetTweetQuery>({ query: GetTweetDocument, ...options });
};
export const GetTweetCommentsDocument = gql`
    query GetTweetComments($tweetId: String!) {
  getTweetComments(tweetId: $tweetId) {
    ...TweetDetails
  }
}
    ${TweetDetailsFragmentDoc}`;

export function useGetTweetCommentsQuery(options: Omit<Urql.UseQueryArgs<GetTweetCommentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetTweetCommentsQuery>({ query: GetTweetCommentsDocument, ...options });
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
export const GetUserByUsernameDocument = gql`
    query GetUserByUsername($username: String!) {
  getUserByUsername(username: $username) {
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

export function useGetUserByUsernameQuery(options: Omit<Urql.UseQueryArgs<GetUserByUsernameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserByUsernameQuery>({ query: GetUserByUsernameDocument, ...options });
};
export const GetUserDetailsDocument = gql`
    query GetUserDetails($id: String!) {
  getUserDetails(userId: $id) {
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

export function useGetUserDetailsQuery(options: Omit<Urql.UseQueryArgs<GetUserDetailsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserDetailsQuery>({ query: GetUserDetailsDocument, ...options });
};
export const GetUserTimelineDocument = gql`
    query GetUserTimeline($userId: String!) {
  getUserTimeline(userId: $userId) {
    ...TweetDetails
  }
}
    ${TweetDetailsFragmentDoc}`;

export function useGetUserTimelineQuery(options: Omit<Urql.UseQueryArgs<GetUserTimelineQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserTimelineQuery>({ query: GetUserTimelineDocument, ...options });
};
export const SearchDocument = gql`
    query Search($searchTerm: String!) {
  search(searchTerm: $searchTerm) {
    tweets {
      ...TweetDetails
    }
    users {
      ...UserPartialDetails
    }
  }
}
    ${TweetDetailsFragmentDoc}
${UserPartialDetailsFragmentDoc}`;

export function useSearchQuery(options: Omit<Urql.UseQueryArgs<SearchQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SearchQuery>({ query: SearchDocument, ...options });
};