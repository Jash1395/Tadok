import styled, { css, keyframes } from 'styled-components'
import { LoadingSpinner } from '../common/Loading'
import '../../styles/themes.css'

const flashAnimation = (color: string) => keyframes`
  0% {
    box-shadow: 3px 3px 10px -3px #6060607d;
  }
  5% {
    box-shadow: 0 0 13px -1px ${color};
  }
  100% {
    box-shadow: 3px 3px 10px -3px #6060607d;
  }
`

const Container = styled.div<{
    $flashColor: string | false
}>`
    flex: 1;
    padding: 1rem;
    width: calc(92% - 2rem);
    max-height: 12rem;
    background-color: var(--card-bg);
    border-radius: 0.7rem;
    box-shadow: 3px 3px 10px -2px #6060607d;

    animation: ${(props) =>
        props.$flashColor
            ? css`
                  ${flashAnimation(props.$flashColor)} 1s ease-in-out
              `
            : 'none'};

    display: flex;
    align-items: center;
    justify-content: center;
`

const Text = styled.p<{ $text: string }>`
    color: var(--card-text);

    // this scales the font size down for longer sentences,
    // while not making it too short for very long sentences
    font-size: clamp(
        1.4rem,
        ${(props) => 400 / Math.pow(props.$text.length, 1.2) + 10}px,
        2.7rem
    );
    font-weight: 600;
    word-break: keep-all; //stops word breaking with Korean
    text-align: center;
`

interface Props {
    currentSentence: Sentence | undefined
    isFlashAnswer: Difficulty | false
    isLoading: boolean
}

export const QuestionCard = ({
    currentSentence,
    isFlashAnswer,
    isLoading,
}: Props) => {
    const text =
        currentSentence?.['questionLang'] || 'Failed to fetch sentnces.'

    const flashColor =
        isFlashAnswer &&
        {
            easy: '#4caf4f',
            okay: '#ffd700',
            hard: '#ff5733',
        }[isFlashAnswer]

    return (
        <Container $flashColor={flashColor}>
            {isLoading ? <LoadingSpinner /> : <Text $text={text}>{text}</Text>}
        </Container>
    )
}
