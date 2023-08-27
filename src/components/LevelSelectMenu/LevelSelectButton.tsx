import styled from 'styled-components'

const Button = styled.button<{ color: string }>`
    width: 70%;
    height: 3.4rem;
    border-radius: 0.3rem;
    box-shadow: 2px 2px 8px -3px #6060607d;
    background-color: ${(props) => props.color};
    color: #202020;
    font-size: 1.4rem;
    font-weight: 700;
`

interface Props {
    level: level
    setLevel: (level: level) => void
}

export const LevelSelectButton = ({ level, setLevel }: Props) => {
    // set A level to green, B level to yellow, C level to red
    const color =
        level == 'A1' || level == 'A2'
            ? '#4caf5060'
            : level == 'B1' || level == 'B2'
            ? '#ffd70060'
            : '#ff573360'
    return (
        <Button color={color} onClick={() => setLevel(level)}>
            {level}
        </Button>
    )
}
