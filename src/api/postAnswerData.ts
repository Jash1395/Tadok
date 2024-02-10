import axios from 'axios'
import { api } from './api'

export async function postAnswerData(
    sentence: string,
    word: string,
    definition: string,
    difficulty: Difficulty,
    duration: number
): Promise<null> {
    const baseURL = '/sentencePOST'
    const data = {
        sentence: sentence,
        word: word,
        definition: definition,
        difficulty: difficulty,
        duration: duration,
    }

    try {
        await api.post<any>(baseURL, data)
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
