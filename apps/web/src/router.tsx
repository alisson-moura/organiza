import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/auth/login";
import { SignUpPage } from "./pages/auth/sign-up";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
]);
