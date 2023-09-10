const updateWordList = (
    wordList: WordListEntry[],
    word: string,
    difficulty: Difficulty
): WordListEntry[] => {
    return wordList.map((entry) => {
        if (entry.word !== word) return entry

        const updatedEntry: WordListEntry = {
            ...entry,
            count: entry.count + 1,
            answers: {
                ...entry.answers,
                [difficulty]: entry.answers[difficulty] + 1,
            },
        }
        return updatedEntry
    })
}

const createWordListEntry = (
    word: string,
    difficulty: Difficulty
): WordListEntry => {
    const initialAnswers: Record<Difficulty, number> = {
        easy: 0,
        okay: 0,
        hard: 0,
    }
    initialAnswers[difficulty] = 1

    return {
        word,
        count: 1,
        answers: initialAnswers,
    }
}

export const newWordList = (
    wordList: WordListEntry[],
    word: string,
    difficulty: Difficulty
) => {
    const existingEntry = wordList.find((entry) => entry.word === word)

    if (existingEntry) {
        // Increase count[word and answer] on existing entry by 1
        const newList = updateWordList(wordList, word, difficulty)
        return newList
    }

    // add new entry and increment selected answer
    const newEntry = createWordListEntry(word, difficulty)
    const newList = [...wordList, newEntry]
    return newList
}
