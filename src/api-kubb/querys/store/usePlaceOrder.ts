/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query'
import type { PlaceOrderMutationRequest, PlaceOrderMutationResponse, PlaceOrder400 } from '../../models/PlaceOrder.ts'
import { useMutation } from '@tanstack/react-query'

export const placeOrderMutationKey = () => [{ url: '/store/order' }] as const

export type PlaceOrderMutationKey = ReturnType<typeof placeOrderMutationKey>

/**
 * @summary Place an order for a pet
 * {@link /store/order}
 */
export async function placeOrder(
  data?: PlaceOrderMutationRequest,
  config: Partial<RequestConfig<PlaceOrderMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PlaceOrderMutationResponse, ResponseErrorConfig<PlaceOrder400>, PlaceOrderMutationRequest>({
    method: 'POST',
    url: `/store/order`,
    baseURL: 'https://petstore.swagger.io/v2',
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * @summary Place an order for a pet
 * {@link /store/order}
 */
export function usePlaceOrder<TContext>(
  options: {
    mutation?: UseMutationOptions<PlaceOrderMutationResponse, ResponseErrorConfig<PlaceOrder400>, { data?: PlaceOrderMutationRequest }, TContext> & {
      client?: QueryClient
    }
    client?: Partial<RequestConfig<PlaceOrderMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: { client: queryClient, ...mutationOptions } = {}, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? placeOrderMutationKey()

  return useMutation<PlaceOrderMutationResponse, ResponseErrorConfig<PlaceOrder400>, { data?: PlaceOrderMutationRequest }, TContext>(
    {
      mutationFn: async ({ data }) => {
        return placeOrder(data, config)
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient,
  )
}