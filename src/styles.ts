import { css } from 'styled-components'

export const levelColors = {
    weak: {
        A1: '#4caf5050',
        A2: '#4caf5050',
        B1: '#ffd70050',
        B2: '#ffd70050',
        C1: '#ff573350',
        C2: '#ff573350',
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

// delay used for navigation buttons (ms)
export const buttonDelay = 200

// delay for theme switching i.e. dark/light mode (ms)
export const themeDelay = 300

export const buttonPress = css`
    &:active {
        transform: scale(0.96);
        box-shadow: 1px 1px 4px #20202040;
        transition:
            transform 0.08s ease-out,
            box-shadow 0.08s ease-out;
    }
`
