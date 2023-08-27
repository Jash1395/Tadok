import { useState } from 'react'
import { Navbar } from './components/Navbar/Navbar'
import { Reader } from './components/Reader/Reader'
import { LevelSelectMenu } from './components/LevelSelectMenu/LevelSelectMenu'
function App() {
    const [level, setLevel] = useState<level | null>(null)

    const openLevelMenu = () => {
        setLevel(null)
    }

    return (
        <>
            <Navbar level={level} openLevelMenu={openLevelMenu} />
            {level ? (
                <Reader level={level} />
            ) : (
                <LevelSelectMenu setLevel={setLevel} />
            )}
        </>
    )
}

export default App
