import axios from 'axios'

const productionBaseURL = 'https://tranquil-tiramisu-af83b8.netlify.app'
const developmentBaseURL = 'http://192.168.219.100:8888/.netlify/functions/'
const baseURL = import.meta.env['VITE_DEV']
    ? developmentBaseURL
    : productionBaseURL

export const api = axios.create({
    baseURL,
})
