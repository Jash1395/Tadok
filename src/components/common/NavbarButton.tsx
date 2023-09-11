import styled from 'styled-components'
import { ReactNode } from 'react'
import { DelayedButton } from './DelayedButton'

const Button = styled(DelayedButton)`
    margin-left: 0.5rem;
    width: 4rem;
    height: 4rem;
    border-radius: 0.4rem;
    color: white;
    box-shadow: 1px 1px 3px 1px #002d44;
    text-shadow: 1px 1px 2px #606060;
`

interface Props {
    onClick: () => void
    children: ReactNode
}

export const NavbarButton = ({ onClick, children, ...rest }: Props) => {
    return (
        <Button onClickDelay={onClick} hoverColor={'#004d74'} {...rest}>
            {children}
        </Button>
    )
}
