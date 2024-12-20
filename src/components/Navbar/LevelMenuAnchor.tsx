import styled from 'styled-components'
import { levelColors } from '../../styles/styles'
import { NavbarAnchor } from '../common/NavbarAnchor'

const Anchor = styled(NavbarAnchor)`
    margin-left: 0.5rem;
    width: 6.2rem;
    font-weight: 700;
`
const Circle = styled.div<{
    $backgroundColor: string
}>`
    margin-left: 0.2rem;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 999rem;
    background-color: ${(props) => props.$backgroundColor};
`
const Text = styled.p`
    margin-right: 0.4rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: #f3f3f3;
`

interface Props {
    level: Level
}

export const LevelMenuAnchor = ({ level }: Props) => {
    return (
        <Anchor href={'/reader'}>
            <Text>Level:</Text>
            {level}
            <Circle $backgroundColor={levelColors.full[level]} />
        </Anchor>
    )
}
