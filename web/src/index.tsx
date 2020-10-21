import React from "react";
import { Cache, cacheExchange } from "@urql/exchange-graphcache";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import App from "./App";
import { Provider as ContextProvider } from "./context/context";
import {
  CreateCommentMutationVariables,
  LikeTweetMutationVariables,
} from "./generated/graphql";

const invalidateAllTweets = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  allFields.forEach((fi) => {
    cache.invalidate("Query", fi.fieldName);
  });
};

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
            invalidateAllTweets(cache);
          },
          createReTweet: (_, __, cache) => {
            // cache.invalidate("Query", "getTrends");
          },
          createComment: (_, __, cache) => {
            invalidateAllTweets(cache);
          },
          followerUser: (_, __, cache) => {
            cache.invalidate("Query", "getUserByUsername");
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
