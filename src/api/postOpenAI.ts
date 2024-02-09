import axios from 'axios'
import { api } from './api'
import { verifyJSON } from '../utils/verifyJSON'
import { formatSentenceArray } from '../utils/formatSentenceArray'

export async function postOpenAI(
    level: Level,
    questionLang: Lang,
    answerLang: Lang
): Promise<Sentence[] | null> {
    const baseURL = '/openAI?'
    const queryParams = {
        level: level,
    }
    const params = new URLSearchParams(queryParams).toString()

    try {
        const response = await api.get<any>(baseURL + params)
        const sentences = JSON.parse(response.data.message).sentences
        const inputs = JSON.parse(response.data.inputs)

        if (verifyJSON(sentences, questionLang, answerLang)) {
            const formattedSentences = formatSentenceArray(sentences, inputs)
            return formattedSentences
        }
        return null
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // the request was made, but the server responded with an error status code
                throw {
                    status: error.response.status,
                    data: error.response.data,
                }
            } else {
                // something happened while setting up the request
                throw {
                    message: 'Axios Error: ' + error.message,
                }
            }
        } else {
            // non-Axios error (e.g., network error)
            throw {
                message: 'Error: ' + error.message,
            }
        }
    }
}
