// formats object keys to "questionLang" and "sentenceLang"
export const formatSentenceArray = (
    sentences: any,
    inputs: Inputs
): Sentence[] => {
    return sentences.map((item: any) => {
        const keys = Object.keys(item)
        if (keys.length < 2) {
            return item
        }

        return {
            questionLang: item[keys[0]],
            answerLang: item[keys[1]],
            inputs: inputs,
        }
    })
}
