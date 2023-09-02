type level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
type difficulty = 'hard' | 'okay' | 'easy'
type lang = 'english' | 'korean'

interface Sentence {
    [questionLang: string]: string
    [answerLang: string]: string
}

interface SentenceList {
    sentences: Sentence[]
}

// OpenAI

// interface ChatCompletionMessage {
//     role: string
//     message: string
// }
