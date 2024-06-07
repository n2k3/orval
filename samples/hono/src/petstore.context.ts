/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Swagger Petstore
 * OpenAPI spec version: 1.0.0
 */
import type { Context, Env } from 'hono';

// https://stackoverflow.com/questions/49579094/typescript-conditional-types-filter-out-readonly-properties-pick-only-requir/49579497#49579497
type IfEquals<X, Y, A = X, B = never> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;

type WritableKeys<T> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    P
  >;
}[keyof T];

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;
type DistributeReadOnlyOverUnions<T> = T extends any ? NonReadonly<T> : never;

type Writable<T> = Pick<T, WritableKeys<T>>;
type NonReadonly<T> = [T] extends [UnionToIntersection<T>]
  ? {
      [P in keyof Writable<T>]: T[P] extends object
        ? NonReadonly<NonNullable<T[P]>>
        : T[P];
    }
  : DistributeReadOnlyOverUnions<T>;

import { ListPetsParams, CreatePetsBodyItem, Pet } from './petstore.schemas';

export type ListPetsContext<E extends Env = any> = Context<
  E,
  '/pets',
  { in: { query: ListPetsParams }; out: { query: ListPetsParams } }
>;
export type CreatePetsContext<E extends Env = any> = Context<
  E,
  '/pets',
  { in: { json: CreatePetsBodyItem[] }; out: { json: CreatePetsBodyItem[] } }
>;
export type UpdatePetsContext<E extends Env = any> = Context<
  E,
  '/pets',
  { in: { json: NonReadonly<Pet> }; out: { json: NonReadonly<Pet> } }
>;
export type ShowPetByIdContext<E extends Env = any> = Context<
  E,
  '/pets/:petId',
  {
    in: {
      param: {
        petId: string;
      };
    };
    out: {
      param: {
        petId: string;
      };
    };
  }
>;
