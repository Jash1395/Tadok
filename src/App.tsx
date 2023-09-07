import { styled } from 'styled-components'
import { useState } from 'react'
import { Navbar } from './components/Navbar/Navbar'
import { Reader } from './components/Reader/Reader'
import { LevelSelectMenu } from './components/LevelSelectMenu/LevelSelectMenu'

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
    const [level, setLevel] = useState<level | null>(null)

    const openLevelMenu = () => {
        setLevel(null)
    }

    return (
        <>
            <Navbar level={level} openLevelMenu={openLevelMenu} />
            <Container>
                {level ? (
                    <Reader level={level} />
                ) : (
                    <LevelSelectMenu setLevel={setLevel} />
                )}
            </Container>
        </>
    )
}

export default App
