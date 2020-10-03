import { Context } from "../types";
import { MiddlewareFn } from "type-graphql";

export const Auth: MiddlewareFn<Context> = ({ context: { request } }, next) => {
  if (!request.session.userId) {
    throw new Error("Unauthenticated");
  }
  return next();
};
