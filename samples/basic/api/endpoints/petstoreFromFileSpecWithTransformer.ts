/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Swagger Petstore
 * OpenAPI spec version: 1.0.0
 */
import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
  CreatePetsBody,
  ListPetsNestedArrayParams,
  ListPetsParams,
} from '../model';
import { faker } from '@faker-js/faker';
import { HttpResponse, delay, http } from 'msw';
import type { Pet, PetsArray, PetsNestedArray } from '../model';
import listPetsMutator from '../mutator/response-type';

/**
 * @summary List all pets
 */
export const listPets = (params?: ListPetsParams, version: number = 1) => {
  return listPetsMutator<PetsArray>({
    url: `/v${version}/pets`,
    method: 'GET',
    params,
  });
};

/**
 * @summary Create a pet
 */
export const createPets = <TData = AxiosResponse<void>>(
  createPetsBody: CreatePetsBody,
  version: number = 1,
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.post(`/v${version}/pets`, createPetsBody, options);
};

/**
 * @summary List all pets as nested array
 */
export const listPetsNestedArray = <TData = AxiosResponse<PetsNestedArray>>(
  params?: ListPetsNestedArrayParams,
  version: number = 1,
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.get(`/v${version}/pets-nested-array`, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

/**
 * @summary Info for a specific pet
 */
export const showPetById = <TData = AxiosResponse<Pet>>(
  petId: string,
  version: number = 1,
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.get(`/v${version}/pets/${petId}`, options);
};

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

export type ListPetsResult = NonNullable<Awaited<ReturnType<typeof listPets>>>;
export type CreatePetsResult = AxiosResponse<void>;
export type ListPetsNestedArrayResult = AxiosResponse<PetsNestedArray>;
export type ShowPetByIdResult = AxiosResponse<Pet>;

export const getListPetsResponseMock = (): PetsArray =>
  Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    age: faker.helpers.arrayElement([
      faker.number.int({ min: 0, max: 30 }),
      undefined,
    ]),
    callingCode: faker.helpers.arrayElement([
      faker.helpers.arrayElement(['+33', '+420', '+33'] as const),
      undefined,
    ]),
    country: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        "People's Republic of China",
        'Uruguay',
      ] as const),
      undefined,
    ]),
    email: faker.helpers.arrayElement([faker.internet.email(), undefined]),
    id: faker.number.int({ min: undefined, max: undefined }),
    name: 'jon',
    tag: faker.helpers.arrayElement(['jon', null]),
  }));

export const getListPetsNestedArrayResponseMock = (
  overrideResponse: Partial<PetsNestedArray> = {},
): PetsNestedArray => ({
  data: faker.helpers.arrayElement([
    Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => ({
      age: faker.helpers.arrayElement([
        faker.number.int({ min: 0, max: 30 }),
        undefined,
      ]),
      callingCode: faker.helpers.arrayElement([
        faker.helpers.arrayElement(['+33', '+420', '+33'] as const),
        undefined,
      ]),
      country: faker.helpers.arrayElement([
        faker.helpers.arrayElement([
          "People's Republic of China",
          'Uruguay',
        ] as const),
        undefined,
      ]),
      email: faker.helpers.arrayElement([faker.internet.email(), undefined]),
      id: faker.number.int({ min: undefined, max: undefined }),
      name: 'jon',
      tag: faker.helpers.arrayElement(['jon', null]),
    })),
    undefined,
  ]),
  ...overrideResponse,
});

export const getShowPetByIdResponseMock = () =>
  (() => ({
    id: faker.number.int({ min: 1, max: 99 }),
    name: faker.person.firstName(),
    tag: faker.helpers.arrayElement([faker.word.sample(), void 0]),
  }))();

export const getListPetsMockHandler = (
  overrideResponse?:
    | PetsArray
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<PetsArray> | PetsArray),
) => {
  return http.get('*/v:version/pets', async (info) => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getListPetsResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getCreatePetsMockHandler = () => {
  return http.post('*/v:version/pets', async () => {
    await delay(1000);
    return new HttpResponse(null, {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
};

export const getListPetsNestedArrayMockHandler = (
  overrideResponse?:
    | PetsNestedArray
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<PetsNestedArray> | PetsNestedArray),
) => {
  return http.get('*/v:version/pets-nested-array', async (info) => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getListPetsNestedArrayResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getShowPetByIdMockHandler = (
  overrideResponse?:
    | Pet
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<Pet> | Pet),
) => {
  return http.get('*/v:version/pets/:petId', async (info) => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
          : getShowPetByIdResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};
export const getSwaggerPetstoreMock = () => [
  getListPetsMockHandler(),
  getCreatePetsMockHandler(),
  getListPetsNestedArrayMockHandler(),
  getShowPetByIdMockHandler(),
];
