import { Request, Response } from "express";
import { ObjectId } from "mongodb";

export type Ref<T> = T | ObjectId;

export type Context = {
  request: Request & { userId: string };
  response: Response;
};
