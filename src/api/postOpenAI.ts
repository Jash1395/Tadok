import axios, { AxiosResponse } from 'axios'
import { api } from './api'
import { verifyJSON } from '../utils/verifyJSON'
import { formatSentenceArray } from '../utils/formatSentenceArray'

export async function postOpenAI(
    questionLang: lang,
    answerLang: lang
): Promise<Sentence[] | null> {
    const URL = '/api/openAI'
    const body = {
        key1: 'value1',
        key2: 'value2',
    }

    try {
        const response: AxiosResponse = await api.post(URL, body)
        const data = JSON.parse(response.data.message)

        if (verifyJSON(data, questionLang, answerLang)) {
            const formattedData = formatSentenceArray(data.sentences)
            return formattedData
        }
        return null
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // The request was made, but the server responded with an error status code
                throw {
                    status: error.response.status,
                    data: error.response.data,
                }
            } else {
                // Something happened while setting up the request
                throw {
                    message: 'Axios Error: ' + error.message,
                }
            }
        } else {
            // Non-Axios error (e.g., network error)
            throw {
                message: 'Error: ' + error.message,
            }
        }
    }
}
