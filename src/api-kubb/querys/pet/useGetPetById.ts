/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import type { GetPetByIdQueryResponse, GetPetByIdPathParams, GetPetById400, GetPetById404 } from '../../models/GetPetById.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getPetByIdQueryKey = (petId: GetPetByIdPathParams['petId']) => [{ url: '/pet/:petId', params: { petId: petId } }] as const

export type GetPetByIdQueryKey = ReturnType<typeof getPetByIdQueryKey>

/**
 * @description Returns a single pet
 * @summary Find pet by ID
 * {@link /pet/:petId}
 */
export async function getPetById(petId: GetPetByIdPathParams['petId'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetPetByIdQueryResponse, ResponseErrorConfig<GetPetById400 | GetPetById404>, unknown>({
    method: 'GET',
    url: `/pet/${petId}`,
    baseURL: 'https://petstore.swagger.io/v2',
    ...requestConfig,
  })
  return res.data
}

export function getPetByIdQueryOptions(petId: GetPetByIdPathParams['petId'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getPetByIdQueryKey(petId)
  return queryOptions<GetPetByIdQueryResponse, ResponseErrorConfig<GetPetById400 | GetPetById404>, GetPetByIdQueryResponse, typeof queryKey>({
    enabled: !!petId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getPetById(petId, config)
    },
  })
}

/**
 * @description Returns a single pet
 * @summary Find pet by ID
 * {@link /pet/:petId}
 */
export function useGetPetById<TData = GetPetByIdQueryResponse, TQueryData = GetPetByIdQueryResponse, TQueryKey extends QueryKey = GetPetByIdQueryKey>(
  petId: GetPetByIdPathParams['petId'],
  options: {
    query?: Partial<QueryObserverOptions<GetPetByIdQueryResponse, ResponseErrorConfig<GetPetById400 | GetPetById404>, TData, TQueryData, TQueryKey>> & {
      client?: QueryClient
    }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getPetByIdQueryKey(petId)

  const query = useQuery(
    {
      ...(getPetByIdQueryOptions(petId, config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<TData, ResponseErrorConfig<GetPetById400 | GetPetById404>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}