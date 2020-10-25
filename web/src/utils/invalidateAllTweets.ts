import { Cache } from "@urql/exchange-graphcache";

export const invalidateAllTweets = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  allFields.forEach((field) => {
    console.log(field);
    cache.invalidate("Query", field.fieldName, field.arguments!);
  });
};
