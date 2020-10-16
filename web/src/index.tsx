import { cacheExchange } from "@urql/exchange-graphcache";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import App from "./App";
import { Provider as ContextProvider } from "./context/context";
import { LikeTweetMutationVariables } from "./generated/graphql";

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
          createTweet: (_, __, cache) => {
            cache.invalidate("Query", "getAllTweets");
          },
          likeTweet: (_, args, cache) => {
            const { tweetId } = args as LikeTweetMutationVariables;
            cache.invalidate("Query", "getAllTweets");
            cache.invalidate("Query", "getTweet", {
              id: tweetId,
            });
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
