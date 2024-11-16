import styled from 'styled-components'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { useLoginUI } from '../hooks/useLoginUI'

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const LoginContainer = styled.div``

export const Login = () => {
    const { isAuthenticated } = useAuth()
    useLoginUI()

    if (isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return (
        <Container>
            <LoginContainer id="firebaseui-auth-container" />
        </Container>
    )
}
