export const verifyJSON = (JSONObject: any): boolean => {
    if (typeof JSONObject !== 'object' || JSONObject === null) {
        return false
    }

    // Check if JSONObject has a 'sentences' property
    if (
        !JSONObject.hasOwnProperty('sentences') ||
        !Array.isArray(JSONObject.sentences)
    ) {
        return false
    }

    // Check the structure of each sentence object
    for (const sentence of JSONObject.sentences) {
        if (
            typeof sentence !== 'object' ||
            sentence === null ||
            !sentence.hasOwnProperty('korean') ||
            typeof sentence.korean !== 'string' ||
            !sentence.hasOwnProperty('english') ||
            typeof sentence.english !== 'string'
        ) {
            return false
        }
    }

    return true
}
