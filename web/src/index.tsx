import React from "react";
import { cacheExchange } from "@urql/exchange-graphcache";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import App from "./App";
import { Provider as ContextProvider } from "./context/context";
import { invalidateAllTweets } from "./utils/invalidateAllTweets";
import { invalidateUser } from "./utils/invalidateUser";

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      optimistic: {
        // likeTweet: (variables, cache, info) => {
        //   const { tweetId } = variables as LikeTweetMutationVariables;
        //   const data = cache.readFragment(
        //     gql`
        //       fragment _ on Tweet {
        //         _id
        //         hasUserLiked
        //       }
        //     `,
        //     { _id: tweetId } as any
        //   );
        //   console.log(data?.hasUserLiked);
        //   return {
        //     __typename: "Tweet",
        //     _id: tweetId,
        //     hasUserLiked: !data?.hasUserLiked,
        //   };
        // },
      },
      updates: {
        Mutation: {
          login: (_, __, cache) => {
            cache.invalidate("Query", "currentUser");
          },
          createAccount: (_, __, cache) => {
            cache.invalidate("Query", "currentUser");
          },
          createTweet: (_, __, cache) => {
            invalidateAllTweets(cache);
          },
          addUserDetails: (_, __, cache) => {
            cache.invalidate("Query", "currentUser");
          },
          createRetweet: (_, __, cache) => {
            invalidateAllTweets(cache);
          },
          likeTweet: (_, __, cache) => {
            invalidateAllTweets(cache);
          },
          createComment: (_, __, cache) => {
            invalidateAllTweets(cache);
          },
          followUser: (_, __, cache) => {
            invalidateUser(cache);
          },
          unFollowUser: (_, __, cache) => {
            invalidateUser(cache);
          },
        },
      },
    }),
    fetchExchange,
  ],
});

ReactDOM.render(
  <React.StrictMode>
    <Provider value={client}>
      <ContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
