import { Outlet, Navigate, RouteObject } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from '../routes/ErrorPage.tsx'
import { Navbar } from '../components/Navbar/Navbar.tsx'
import { Reader } from '../components/Reader/Reader'
import { Window } from '../components/Window.tsx'
// import { Statistics } from '../components/Statistics/Statistics.tsx'
import { Login } from '../components/Login.tsx'
import { useAuth } from '../hooks/useAuth.ts'

// PrivateRoute Component
const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    const { isAuthenticated } = useAuth()

    if (isAuthenticated === null) {
        return <div>Loading...</div>
    }

    return isAuthenticated ? element : <Navigate to="/login" replace />
}

const _Reader: RouteObject = {
    path: 'reader',
    element: <PrivateRoute element={<Reader />} />,
}

// TODO
// const _Statistics: RouteObject = {
//     path: 'statistics',
//     element: <PrivateRoute element={<Statistics />} />,
// }

const _Browser: RouteObject = {
    path: 'browser',
    element: <PrivateRoute element={<div>Browser</div>} />,
}

const Root: RouteObject = {
    path: '/',
    element: (
        <>
            <Navbar />
            <Outlet />
        </>
    ),
    children: [
        {
            path: '/',
            index: true,
            element: <Navigate to="/reader" replace />,
        },
        {
            path: '/',
            element: <Window />,
            children: [
                _Reader,
                // TODO
                // _Statistics,
                _Browser,
            ],
            errorElement: <ErrorPage />,
        },
        {
            path: '/login',
            element: <Login />, // Add Login screen route
        },
    ],
}

export const router = createBrowserRouter([Root], {
    // React Router Future Flags
    future: {
        v7_relativeSplatPath: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_fetcherPersist: true,
        v7_skipActionErrorRevalidation: true,
    },
})
