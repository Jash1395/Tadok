import { styled } from 'styled-components'
import { Navbar } from './components/Navbar/Navbar'
import { Reader } from './components/Reader/Reader'
import { LevelSelectMenu } from './components/LevelSelectMenu/LevelSelectMenu'
import { useStore } from './state/store'

const Container = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
    background-color: #f3f3f3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const App = () => {
    const { level } = useStore((state) => state.user)

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
