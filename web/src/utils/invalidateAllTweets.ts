import { Cache } from "@urql/exchange-graphcache";

export const invalidateAllTweets = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  allFields.forEach((field) => {
    if (field.fieldName === "currentUser" || field.fieldName === "getTrends") {
      // do nothing
    } else {
      cache.invalidate("Query", field.fieldName, field.arguments || {});
    }
  });
};
