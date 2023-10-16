import axios from 'axios'


const axiosConfiguration = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL ||
     'https://movies-back-end-8uo6.onrender.com/api/v1'
})

export {
    axiosConfiguration
}
