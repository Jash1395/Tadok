import styled from 'styled-components'

const Container = styled.div<{ visibility: string; text: string }>`
    padding: 1rem;
    width: calc(92% - 2rem);
    height: 12rem;
    background-color: white;
    color: #202020;
    border-radius: 0.7rem;
    box-shadow: 3px 3px 10px -2px #6060607d;
    visibility: ${(props) => props.visibility};

    // this scales the font size down for longer sentences,
    //while not making it too short for very long sentences
    font-size: clamp(
        1.1rem,
        ${(props) => 800 / Math.pow(props.text.length, 1.2) + 12}px,
        2.9rem
    );
    display: flex;
    align-items: center;
    justify-content: center;
    word-break: keep-all;
    text-align: center;
`

interface Props {
    text: string
    isTranslationVisible: boolean
    showTranslation: () => void
}

export const AnswerCard = ({
    text,
    isTranslationVisible,
    showTranslation,
}: Props) => {
    return (
        <Container
            onClick={showTranslation}
            text={text}
            visibility={isTranslationVisible ? 'visible' : 'hidden'}
        >
            {text}
        </Container>
    )
}
