// formats object keys to "questionLang" and "sentenceLang"
export const formatSentenceArray = (
    sentences: any,
    inputs: Inputs
): Sentence[] => {
    return sentences.map((sentence: any) => {
        const keys = Object.keys(sentence)
        if (keys.length < 2 || !keys[0] || !keys[1]) {
            console.error(`Failed to fomat sentence ${sentence}`)
            return sentence
        }

        return {
            questionLang: sentence[keys[0]],
            answerLang: sentence[keys[1]],
            inputs: inputs,
        }
    })
}
