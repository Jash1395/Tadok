import styled from 'styled-components'
import { buttonPress } from '../../styles'

const Button = styled.button<{ $isVisible: boolean }>`
    margin-bottom: 1.4rem;
    height: 3.2rem;
    width: 70%;
    background-color: #ffd700;
    color: #202020;
    font-size: 1.1rem;
    font-weight: 600;
    border: none;
    border-radius: 999rem;
    opacity: ${(props) => (props.$isVisible ? 1 : 0)};
    cursor: ${(props) => (props.$isVisible ? 'pointer' : 'default')};
    transition: opacity 0.1s ease-in;

    // $buttonPress must be above $:active or easing out will break
    ${buttonPress}
    &:active {
        transition: opacity 0.1s ease-in;
    }
`

interface Props {
    isTranslationVisible: boolean
    isLoading: boolean
    showTranslation: () => void
}

export const ShowTranslationButton = ({
    isTranslationVisible,
    isLoading,
    showTranslation,
}: Props) => {
    const isActive = !isTranslationVisible && !isLoading
    return (
        <Button
            $isVisible={isActive}
            onClick={showTranslation}
            disabled={!isActive}
        >
            Show Translation
        </Button>
    )
}
