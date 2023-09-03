import { css } from 'styled-components'

export const levelColors = {
    weak: {
        A1: '#4caf5060',
        A2: '#4caf5060',
        B1: '#ffd70060',
        B2: '#ffd70060',
        C1: '#ff573360',
        C2: '#ff573360',
    },
    strong: {
        A1: '#4caf4fc4',
        A2: '#4caf50c4',
        B1: '#ffd700c4',
        B2: '#ffd700c4',
        C1: '#ff5733c4',
        C2: '#ff5733c4',
    },
    full: {
        A1: '#4caf4f',
        A2: '#4caf50',
        B1: '#ffd700',
        B2: '#ffd700',
        C1: '#ff5733',
        C2: '#ff5733',
    },
}

export const buttonPress = css`
    &:active {
        transform: scale(0.96);
        box-shadow: 1px 1px 4px #20202040;
        transition:
            transform 0.08s ease-out,
            box-shadow 0.08s ease-out;
    }
`
