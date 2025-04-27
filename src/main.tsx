import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ExampleKubb from './example-kubb.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const query = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={query}>
      <ExampleKubb />
    </QueryClientProvider>
  </StrictMode>,
)
