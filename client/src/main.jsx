import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//importing router
import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import AuthProvider from "./contexts/AuthProvider";

//tansack for managing the resuest
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </AuthProvider>
);
