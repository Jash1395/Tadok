import styled from 'styled-components'

const Container = styled.div<{ text: string }>`
    padding: 1rem;
    width: calc(92% - 2rem);
    height: 12rem;
    background-color: white;
    color: #202020;
    border-radius: 0.7rem;
    box-shadow: 3px 3px 10px -2px #6060607d;
    font-size: ${(props) => 700 / Math.pow(props.text.length, 1.3) + 20}px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    word-break: keep-all; //stops word breaking with Korean
    text-align: center;
`

interface Props {
    text: string
}

export const QuestionCard = ({ text }: Props) => {
    return (
        <Container text={text} id="container">
            {text}
        </Container>
    )
}
