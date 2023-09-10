export const newSentenceHistory = (
    sentenceHistory: SentenceHistoryEntry[],
    sentence: Sentence,
    answerTime: number,
    difficulty: Difficulty,
    level: Level
) => {
    const newEntry: SentenceHistoryEntry = {
        sentence,
        answerTime,
        dateTime: new Date().toISOString(),
        difficulty,
        level,
    }

    const newHistory: SentenceHistoryEntry[] = [...sentenceHistory, newEntry]
    return newHistory
}
