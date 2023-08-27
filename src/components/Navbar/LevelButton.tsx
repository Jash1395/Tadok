import styled from 'styled-components'

const Button = styled.button`
    margin-left: 1rem;
    width: 4rem;
    height: 2rem;
    background-color: #ffd700;
    border-radius: 999rem;
    color: white;
    text-shadow: 1px 1px 2px #606060;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
`

interface Props {
    level: level
    openLevelMenu: () => void
}

export const LevelButton = ({ level, openLevelMenu }: Props) => {
    return <Button onClick={() => openLevelMenu()}>{level}</Button>
}
