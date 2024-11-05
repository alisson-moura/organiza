import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/auth/login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
]);
