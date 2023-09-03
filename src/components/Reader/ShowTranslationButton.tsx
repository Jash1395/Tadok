import styled from 'styled-components'
import { buttonPress } from '../../styles'

const Button = styled.button<{ isTranslationVisible: boolean }>`
    margin-bottom: 1.2rem;
    height: 3.6rem;
    width: 80%;
    background-color: #ffd700;
    color: #202020;
    font-size: 1.1rem;
    font-weight: 600;
    border: none;
    border-radius: 999rem;
    opacity: ${(props) => (props.isTranslationVisible ? 0 : 1)};
    transition: opacity 0.1s ease-in;

    // $buttonPress must be above $:active or easing out will break
    ${buttonPress}
    &:active {
        transition: opacity 0.1s ease-in;
    }
`

interface Props {
    isTranslationVisible: boolean
    showTranslation: () => void
}

export const ShowTranslationButton = ({
    isTranslationVisible,
    showTranslation,
}: Props) => {
    return (
        <Button
            isTranslationVisible={isTranslationVisible}
            onClick={showTranslation}
        >
            Show Translation
        </Button>
    )
}
