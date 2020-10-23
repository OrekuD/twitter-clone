import { Cache } from "@urql/exchange-graphcache";

export const invalidateAllTweets = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  allFields.forEach(({ fieldName }) => {
    if (fieldName === "currentUser" || fieldName === "getTrends") {
      // do nothing
    } else {
      cache.invalidate("Query", fieldName);
    }
  });
};
