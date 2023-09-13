import { Outlet, Navigate, RouteObject } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from '../routes/ErrorPage.tsx'
import { Navbar } from '../components/Navbar/Navbar.tsx'
import { Reader } from '../components/Reader/Reader'
import { LevelSelectMenu } from '../components/LevelSelectMenu/LevelSelectMenu'
import { Window } from '../components/Window.tsx'

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

const _SelectLevelMenu: RouteObject = {
    path: 'selectlevel',
    element: <LevelSelectMenu />,
}

const _Statistics: RouteObject = {
    path: 'statistics',
    element: 'Stats',
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
            element: <Navigate to="/selectlevel" replace />,
        },
        {
            path: '/',
            element: <Window />,
            children: [_SelectLevelMenu, _Reader, _Statistics, _Browser],
            errorElement: <ErrorPage />,
        },
    ],
}

export const router = createBrowserRouter([Root])
