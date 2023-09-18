import styled from 'styled-components'
import { NavbarAnchor } from '../common/NavbarAnchor'

const Anchor = styled(NavbarAnchor)`
    padding: 0 1rem;
`

interface Props {}

export const StatisticsAnchor = ({}: Props) => {
    return <Anchor href={'/statistics'}>Statistics</Anchor>
}
