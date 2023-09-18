import styled from 'styled-components'
import { ReactNode } from 'react'
import { DelayedAnchor } from './DelayedAnchor'

const Anchor = styled(DelayedAnchor)`
    margin-left: 0.5rem;
    height: 2.6rem;
    border-radius: 0.4rem;
    color: white;
    box-shadow: 1px 1px 3px 1px #002d44;
    text-shadow: 1px 1px 2px #606060;
`

interface Props {
    href: string
    children: ReactNode
}

export const NavbarAnchor = ({ href, children, ...rest }: Props) => {
    return (
        <Anchor href={href} hoverColor={'#004d74'} {...rest}>
            {children}
        </Anchor>
    )
}
