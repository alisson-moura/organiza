import { ProtectedRoute } from "./protected-route"
import { HomePage } from "@/pages/app/home"
import { LoginPage } from "@/pages/auth/login"
import { SignUpPage } from "@/pages/auth/sign-up"
import { AuthLayout } from "@/pages/auth/layout"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const Routes = () => {
    const privateRoutes = [{
        path: '/',
        element: <ProtectedRoute />,
        children: [
            {path: '/', element: <HomePage /> }
        ]
    }]

    const authRoutes = [{
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '/auth',
                element: <LoginPage />
            },
            {
                path: '/auth/sign-up',
                element: <SignUpPage />
            }
        ]
    }]

    const router = createBrowserRouter([
        ...authRoutes,
        ...privateRoutes
    ])

    return <RouterProvider router={router} />
}

export default Routes