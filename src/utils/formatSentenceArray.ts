// formats object keys to "questionLang" and "sentenceLang"
export const formatSentenceArray = (sentences: Sentence[]): Sentence[] => {
    return sentences.map((item) => {
        const keys = Object.keys(item)
        if (keys.length < 2) {
            return item
        }

        return {
            questionLang: item[keys[0]],
            answerLang: item[keys[1]],
        }
    })
}
