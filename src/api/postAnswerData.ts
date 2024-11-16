import { httpsCallable, getFunctions } from 'firebase/functions'

export async function postAnswerData(
    userID: string,
    word: string,
    definition: string,
    difficulty: Difficulty,

    // TODO make type
    level: 'beginner' | 'intermediate' | 'advanced' | 'custom',
    duration: number
): Promise<void> {
    const setWordData = httpsCallable(getFunctions(), 'setWordData')

    //TODO add diff and dur
    console.log(word + ' ' + difficulty + ' ' + duration + ' ')

    try {
        const response = await setWordData({
            userId: userID,
            level: level,
            word: word,
            definition: definition,
            difficulty: difficulty,
        })
        console.log(response.data)
    } catch (error) {
        console.error((error as Error).message)
    }
}
