/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryClient, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import type { GetInventoryQueryResponse } from '../../models/GetInventory.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getInventorySuspenseQueryKey = () => [{ url: '/store/inventory' }] as const

export type GetInventorySuspenseQueryKey = ReturnType<typeof getInventorySuspenseQueryKey>

/**
 * @description Returns a map of status codes to quantities
 * @summary Returns pet inventories by status
 * {@link /store/inventory}
 */
export async function getInventorySuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetInventoryQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/store/inventory`,
    baseURL: 'https://petstore.swagger.io/v2',
    ...requestConfig,
  })
  return res.data
}

export function getInventorySuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getInventorySuspenseQueryKey()
  return queryOptions<GetInventoryQueryResponse, ResponseErrorConfig<Error>, GetInventoryQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getInventorySuspense(config)
    },
  })
}

/**
 * @description Returns a map of status codes to quantities
 * @summary Returns pet inventories by status
 * {@link /store/inventory}
 */
export function useGetInventorySuspense<TData = GetInventoryQueryResponse, TQueryKey extends QueryKey = GetInventorySuspenseQueryKey>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetInventoryQueryResponse, ResponseErrorConfig<Error>, TData, TQueryKey>> & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getInventorySuspenseQueryKey()

  const query = useSuspenseQuery(
    {
      ...(getInventorySuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}