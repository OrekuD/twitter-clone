import { Request } from "express";

export type Context = {
  request: Request & { session: Express.Session };
};
