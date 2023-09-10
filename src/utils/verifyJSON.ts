export const verifyJSON = (
    sentences: any,
    questionLang: Lang,
    answerLang: Lang
): boolean => {
    if (typeof sentences !== 'object' || sentences === null) {
        console.error('Incorrect JSON format: Not object.')
        return false
    }

    // check the structure of each sentence object
    for (const sentence of sentences) {
        if (
            typeof sentence !== 'object' ||
            sentence === null ||
            !sentence.hasOwnProperty(questionLang) ||
            typeof sentence[questionLang] !== 'string' ||
            !sentence.hasOwnProperty(answerLang) ||
            typeof sentence[answerLang] !== 'string'
        ) {
            console.error(
                'Incorrect JSON format: Sentence object wrong structure.'
            )
            return false
        }
    }

    return true
}
