import { MutationCache, QueryClient } from '@tanstack/react-query'

import { handleError } from '@/shared/utils/error.util'

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error) => {
      handleError(error)
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      placeholderData: (previousData: unknown) => previousData,
    },
    mutations: {
      retry: false,
    },
  },
})
