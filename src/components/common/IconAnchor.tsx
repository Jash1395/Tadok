import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { Link } from 'react-router-dom'

const Anchor = styled(Link)``

const Container = styled.div<{ $size: number }>`
    font-size: ${(props) => `${props.$size * 0.6}rem`};
    height: ${(props) => `${props.$size}rem`};
    width: ${(props) => `${props.$size}rem`};
    display: flex;
    justify-content: center;
    align-items: center;
`

interface Props {
    icon: IconDefinition
    size: number
    href: string
    className?: string
}

export const IconAnchor = ({ icon, size, href, className }: Props) => (
    <Anchor to={href} className={className}>
        <Container $size={size}>
            <FontAwesomeIcon icon={icon} />
        </Container>
    </Anchor>
)
