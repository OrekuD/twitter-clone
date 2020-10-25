import React from "react";
import { cacheExchange } from "@urql/exchange-graphcache";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import App from "./App";
import { Provider as ContextProvider } from "./context/context";
import { invalidateAllTweets } from "./utils/invalidateAllTweets";

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
            // cache.invalidate("Query", "getUserTimeline");
            invalidateAllTweets(cache);
          },
          addUserDetails: (_, __, cache) => {
            cache.invalidate("Query", "currentUser");
          },
          createReTweet: (_, __, cache) => {
            invalidateAllTweets(cache);
            // console.log("---------", cache.inspectFields("Query"));
          },
          likeTweet: (_, __, cache) => {
            invalidateAllTweets(cache);
          },
          createComment: (_, __, cache) => {
            invalidateAllTweets(cache);
          },
          followUser: (_, __, cache) => {
            const allFields = cache.inspectFields("Query");
            const field = allFields.find(
              (field) => field.fieldName === "getUserByUsername"
            );
            cache.invalidate("Query", "getUserByUsername", field?.arguments!);
          },
          unFollowUser: (_, __, cache) => {
            const allFields = cache.inspectFields("Query");
            const field = allFields.find(
              (field) => field.fieldName === "getUserByUsername"
            );
            cache.invalidate("Query", "getUserByUsername", field?.arguments!);
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
