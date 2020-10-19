import { cacheExchange } from "@urql/exchange-graphcache";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import App from "./App";
import { Provider as ContextProvider } from "./context/context";
import {
  CreateCommentMutationVariables,
  LikeTweetMutationVariables,
} from "./generated/graphql";

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (_, __, cache) => {
            cache.invalidate("Query", "currentUser");
          },
          createAccount: (_, __, cache) => {
            cache.invalidate("Query", "currentUser");
          },
          createTweet: (_, __, cache) => {
            cache.invalidate("Query", "getCurrentUserTimeline");
            cache.invalidate("Query", "getTrends");
          },
          createReTweet: (_, __, cache) => {
            // cache.invalidate("Query", "getCurrentUserTimeline");
            cache.invalidate("Query", "getTrends");
          },
          createComment: (_, args, cache) => {
            const { tweetId } = args as CreateCommentMutationVariables;
            cache.invalidate("Query", "getTweet", {
              id: tweetId,
            });
          },
          likeTweet: (_, args, cache) => {
            const { tweetId } = args as LikeTweetMutationVariables;
            cache.invalidate("Query", "getCurrentUserTimeline"); // Do it in better way??
            cache.invalidate("Query", "getTweet", {
              id: tweetId,
            });
            // const data = cache.readFragment(
            //   gql`
            //     fragment _ on Tweet {
            //       _id
            //       likes
            //     }
            //   `,
            //   {
            //     _id: "5f8a96c838611c11e4d0f5b2",
            //   } as any
            // );

            // console.log(data);
            // console.log(tweetId);
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
