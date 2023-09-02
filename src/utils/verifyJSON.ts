export const verifyJSON = (
    JSONObject: any,
    questionLang: lang,
    answerLang: lang
): boolean => {
    if (typeof JSONObject !== 'object' || JSONObject === null) {
        console.error('Incorrect JSON format: Not object.')
        return false
    }

    // Check if JSONObject has a 'sentences' property
    if (
        !JSONObject.hasOwnProperty('sentences') ||
        !Array.isArray(JSONObject.sentences)
    ) {
        console.error(
            'Incorrect JSON format: Does not have "sentences" property.'
        )
        return false
    }

    // Check the structure of each sentence object
    for (const sentence of JSONObject.sentences) {
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
