import { Cache } from "@urql/exchange-graphcache";

export const invalidateUser = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const field = allFields.find(
    (field) =>
      field.fieldName === "getUserByUsername" && field?.arguments?.username
  );
  cache.invalidate("Query", "getUserByUsername", field?.arguments!);
};
