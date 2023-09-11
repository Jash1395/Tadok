import { styled } from 'styled-components'
import { Navbar } from './components/Navbar/Navbar'
import { Reader } from './components/Reader/Reader'
import { LevelSelectMenu } from './components/LevelSelectMenu/LevelSelectMenu'
import { useStore } from './hooks/useStore'
import { useInitialTheme } from './hooks/useInitialTheme'
import './themes.css'

const Container = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
    background-color: var(--primary);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const App = () => {
    const { level } = useStore()
    useInitialTheme()

    return (
        <>
            <Navbar level={level} />
            <Container>
                {level ? <Reader level={level} /> : <LevelSelectMenu />}
            </Container>
        </>
    )
}

export default App
