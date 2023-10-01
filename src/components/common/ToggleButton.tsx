import { useState } from 'react'
import styled from 'styled-components'

const ToggleContainer = styled.label<{
    $onColor: string
    $offColor: string
    $toggled: boolean
}>`
    display: inline-block;
    width: 48px;
    height: 24px;
    border-radius: 9999rem;
    background-color: ${(props) =>
        props.$toggled ? props.$onColor : props.$offColor};
    position: relative;
    cursor: pointer;
`

const Circle = styled.div<{ $toggled: boolean }>`
    width: 20px;
    height: 20px;
    background-color: white;
    position: absolute;
    top: 2px;
    left: ${(props) => (props.$toggled ? '25px' : '2px')};
    transition: left 0.2s;
    border-radius: 50%;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
`
interface Props {
    onColor?: string
    offColor?: string
}

export const ToggleButton = ({
    onColor = '#4CAF50',
    offColor = 'grey',
}: Props) => {
    const [toggled, setToggled] = useState(false)

    const handleToggle = () => setToggled((prevToggled) => !prevToggled)

    return (
        <ToggleContainer
            $toggled={toggled}
            $onColor={onColor}
            $offColor={offColor}
            onClick={handleToggle}
        >
            <HiddenCheckbox checked={toggled} onChange={handleToggle} />
            <Circle $toggled={toggled} />
        </ToggleContainer>
    )
}
