import axios, { AxiosResponse } from 'axios'
import { api } from './api'
import { verifyJSON } from '../utils/verifyJSON'
import { formatSentenceArray } from '../utils/formatSentenceArray'

export async function postOpenAI(
    level: level,
    questionLang: lang,
    answerLang: lang
): Promise<Sentence[] | null> {
    const baseURL = '/api/openAI?'
    const queryParams = {
        level: level,
    }
    const params = new URLSearchParams(queryParams).toString()

    try {
        const response: AxiosResponse = await api.get(baseURL + params)
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
