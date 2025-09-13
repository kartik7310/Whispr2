"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="572563638497-6jecpue55q0ap6549chh55r1vupv4ngs.apps.googleusercontent.com">
        {children}
      </GoogleOAuthProvider>
      <Toaster />
      <ReactQueryDevtools  />
    </QueryClientProvider>
  );
}
