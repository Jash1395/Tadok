import { Outlet, Navigate, RouteObject } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from '../routes/ErrorPage.tsx'
import { Navbar } from '../components/Navbar/Navbar.tsx'
import { Reader } from '../components/Reader/Reader'
import { Window } from '../components/Window.tsx'
import { Statistics } from '../components/Statistics/Statistics.tsx'

const _Reader: RouteObject = {
    path: 'reader',
    element: <Outlet />,
    children: [
        {
            path: '',
            element: <Reader />,
        },
    ],
}

const _Statistics: RouteObject = {
    path: 'statistics',
    element: <Statistics />,
}

const _Browser: RouteObject = {
    path: 'browser',
    element: 'Browser',
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
            element: <Navigate to="/Reader" replace />,
        },
        {
            path: '/',
            element: <Window />,
            children: [_Reader, _Statistics, _Browser],
            errorElement: <ErrorPage />,
        },
    ],
}

export const router = createBrowserRouter([Root])
