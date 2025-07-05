
"use client"

import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RecoilRoot } from "recoil"

const queryClient = new QueryClient()

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </RecoilRoot>
  )
}
