import { auth } from '../../firebase/firebase'
import styled from 'styled-components'
import { useAuth } from '../../hooks/useAuth'

const Button = styled.button<{ $isAuthenticated: boolean | null }>`
    margin-left: 1rem;
    width: 5rem;
    height: 2rem;
    border-radius: 3px;
    background-color: ${({ $isAuthenticated }) =>
        $isAuthenticated ? 'pink' : 'gray'};
`

export const LogoutButton: React.FC = () => {
    const { isAuthenticated } = useAuth()

    const handleLogout = async () => {
        if (!isAuthenticated) return
        try {
            await auth.signOut()
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    return (
        <Button $isAuthenticated={isAuthenticated} onClick={handleLogout}>
            Logout
        </Button>
    )
}
