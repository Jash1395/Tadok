import axios from 'axios'
import { api } from './api'

export async function getStatistics(): Promise<TestStats[]> {
    const baseURL = '/api/statistics'

    try {
        const response = await api.get<TestStats[]>(baseURL)
        return response.data
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
