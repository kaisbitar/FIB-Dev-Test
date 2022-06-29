export default function ({ $axios, redirect }) {
    $axios.setBaseURL(process.env.BASE_URL)
    $axios.setHeader('X-FIB-API-AUTH-TOKEN', process.env.API_SECRET)
}