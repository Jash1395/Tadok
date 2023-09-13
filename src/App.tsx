import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes.tsx'
import { useInitialTheme } from './hooks/useInitialTheme'
import './styles/themes.css'

const App = () => {
    useInitialTheme()

    return <RouterProvider router={router} />
}

export default App
