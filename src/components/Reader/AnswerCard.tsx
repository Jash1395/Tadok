import styled from 'styled-components'

const Container = styled.div<{ $visibility: string; $text: string }>`
    padding: 1rem;
    width: calc(92% - 2rem);
    height: 12rem;
    background-color: white;
    color: #202020;
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
    showTranslation: () => void
}

export const AnswerCard = ({
    sentenceList,
    isTranslationVisible,
    isLoading,
    showTranslation,
}: Props) => {
    const text =
        sentenceList.length > 1
            ? sentenceList[0].answerLang
            : 'No sentence found.'

    const inputs =
        sentenceList.length > 1
            ? sentenceList[0].inputs
            : {
                  seedWord: {
                      word: '',
                      definition: '',
                      phrase: '',
                  },
                  tense: '',
              }

    return (
        <Container
            onClick={showTranslation}
            $text={text}
            $visibility={
                isTranslationVisible && !isLoading ? 'visible' : 'hidden'
            }
        >
            <BoldText>{text}</BoldText>
            <Text>{inputs.seedWord.word}</Text>
            <Text>{inputs.seedWord.definition}</Text>
        </Container>
    )
}
