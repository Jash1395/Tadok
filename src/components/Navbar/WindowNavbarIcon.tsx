import styled from 'styled-components'
import {
    faBookOpen,
    faChartSimple,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
import { IconAnchor } from '../common/IconAnchor'
import { buttonPress } from '../../styles/styles'
import { useLocation } from 'react-router-dom'

interface Props {
    type: MainWindow
}

const Anchor = styled(IconAnchor)<{ $isCurrentWindow: boolean }>`
    border-radius: 1rem;
    border-radius: 0.5rem;
    background-color: var(--one);
    color: ${(props) => (props.$isCurrentWindow ? 'var(--two)' : 'white')};
    transition: background-color var(--transition-bg-duration);
    ${buttonPress}

    @media (hover: hover) and (pointer: fine) {
        &:hover,
        &:active {
            background-color: var(--icon-hover-bg);
        }
    }

    @media (hover: hover) {
        &:active {
            background-color: var(--icon-hover-bg);
        }
    }
`

const iconData = {
    reader: { href: '/reader', icon: faBookOpen },
    statistics: { href: '/statistics', icon: faChartSimple },
    browser: { href: '/browser', icon: faMagnifyingGlass },
}

export const WindowNavbarIcon = ({ type }: Props) => {
    const location = useLocation()
    const path = iconData[type].href
    const isCurrentWindow = location.pathname.startsWith(path)

    return (
        <Anchor
            icon={iconData[type].icon}
            href={path}
            size={2.4}
            $isCurrentWindow={isCurrentWindow}
        ></Anchor>
    )
}
