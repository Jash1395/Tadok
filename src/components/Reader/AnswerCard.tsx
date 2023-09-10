import styled from 'styled-components'
import '../../themes.css'

const Container = styled.div<{ $visibility: string; $text: string }>`
    padding: 1rem;
    width: calc(92% - 2rem);
    height: 12rem;
    background-color: var(--card-bg);
    color: var(--card-text);
    border-radius: 0.7rem;
    box-shadow: 3px 3px 10px -2px #6060607d;
    visibility: ${(props) => props.$visibility};

    // this scales the font size down for longer sentences,
    //while not making it too short for very long sentences
    font-size: clamp(
        1.1rem,
        ${(props) => 500 / Math.pow(props.$text.length, 1.3) + 5}px,
        2.5rem
    );
    display: flex;
    align-items: center;
    justify-content: center;
    word-break: keep-all;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const Text = styled.p``

const BoldText = styled.p`
    margin-bottom: 1rem;
    font-weight: 600;
`

interface Props {
    sentenceList: Sentence[]
    isTranslationVisible: boolean
    isLoading: boolean
}

export const AnswerCard = ({
    sentenceList,
    isTranslationVisible,
    isLoading,
}: Props) => {
    if (sentenceList.length < 1) {
        return <Container $text={''} $visibility={'hidden'} />
    }

    const text = sentenceList[0].answerLang
    const seedWord = sentenceList[0].inputs.seedWord

    return (
        <Container
            $text={text}
            $visibility={
                isTranslationVisible && !isLoading ? 'visible' : 'hidden'
            }
        >
            <BoldText>{text}</BoldText>
            <Text>{seedWord.word}</Text>
            <Text>{seedWord.definition}</Text>
        </Container>
    )
}
