import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./utils/AuthProvider";
import RouteProtector from "./utils/RouteProtector";
import AdminLayout from "./ui/AdminLayout";
import GlobalErrorHandler from "./utils/GlobalErrorHandler";
import AppLayout from "./ui/AppLayout";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
const Home = lazy(() => import("./pages/User/Home"));
const UserTutorial = lazy(() => import("./pages/User/UserTutorial"));
const AdminDasboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const Login = lazy(() => import("./pages/Admin/Login"));
const AdminTutorial = lazy(() => import("./pages/Admin/AdminTutorial"));

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouteProtector>
        <Suspense fallback={<LoadingScreen />}>
          <AppLayout />
        </Suspense>
      </RouteProtector>
    ),
    errorElement: <GlobalErrorHandler />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDasboard />,
          },
          {
            path: ":tutTitle",
            element: <AdminTutorial />,
          },
        ],
      },
      {
        path: ":tutTitle",
        element: <UserTutorial />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReactQueryDevtools
          initialIsOpen={false}
          position="top"
          buttonPosition="top-left"
        />
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
