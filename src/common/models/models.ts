import { Request } from 'express';
import { DefaultUserDto } from 'src/modules/user/dtos/defaultUser.dto';

export type RequestWithBody<T> = Request<
  Record<string, never>,
  Record<string, never>,
  T
>;
export type RequestWithQuery<T> = Request<
  Record<string, never>,
  Record<string, never>,
  Record<string, never>,
  T
>;
export type RequestWithParams<T> = Request<T>;
export type RequestWithBodyAndParams<T, K> = Request<
  K,
  Record<string, never>,
  T
>;
export type RequestWithParamsAndQuery<T, K> = Request<
  T,
  Record<string, never>,
  Record<string, never>,
  K
>;
export type RequestWithBodyAndQuery<T, K> = Request<
  Record<string, never>,
  Record<string, never>,
  T,
  K
>;

export type GuardedRequest = Request & { user: DefaultUserDto };
