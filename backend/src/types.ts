import { Request, Response, Express } from "express";
import { ObjectId } from "mongodb";

export type Ref<T> = T | ObjectId;

export type Context = {
  request: Request & { session: Express.Session };
  response: Response;
};
