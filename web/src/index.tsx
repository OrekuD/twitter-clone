import { cacheExchange } from "@urql/exchange-graphcache";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import App from "./App";
import { Provider as ContextProvider } from "./context/context";
import { LikeTweetMutationVariables } from "./generated/graphql";
import gql from "graphql-tag";

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
          createTweet: (_, __, cache) => {
            cache.invalidate("Query", "getAllTweets");
            cache.invalidate("Query", "getTrends");
          },
          createReTweet: (_, __, cache) => {
            cache.invalidate("Query", "getAllTweets");
            cache.invalidate("Query", "getTrends");
          },
          likeTweet: (_, args, cache) => {
            const { tweetId } = args as LikeTweetMutationVariables;
            cache.invalidate("Query", "getAllTweets");
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
