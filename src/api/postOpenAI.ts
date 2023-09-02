import axios, { AxiosResponse } from 'axios'

import { api } from './api'

export async function postOpenAI() {
    const URL = '/api/openAI'
    const body = {
        key1: 'value1',
        key2: 'value2',
    }

    try {
        const response: AxiosResponse<sentence[]> = await api.post(URL, body)
        return response
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
