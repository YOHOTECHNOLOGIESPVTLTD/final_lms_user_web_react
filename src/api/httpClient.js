import axios from "axios"
import { AUTH_TOKEN_KEY } from "lib/constants"
import Cookies from "js-cookie"

const Axios = axios.create({
    baseURL : process.env.REACT_APP_BACK_END_URL,
    timeout : 5000000,
    headers : {
        "Content-Type" : "application/json"
    }
})
console.log(process.env.REACT_APP_BACK_END_URL)
Axios.interceptors.request.use((config)=>{
    const token = Cookies.get(AUTH_TOKEN_KEY)
    if(token){
      config.headers["Authorization"] = `Token ${token ? token :''}`
    }
    return config
})

Axios.interceptors.response.use(
    (response)=>response,
    (error) => {
     if(error.response && error.response.status === 401 && error.response.statusText === "Unauthorized"){
        Cookies.remove(AUTH_TOKEN_KEY)
     }
     return Promise.reject(error)
    }
)

class HttpClient{
    async get(url,params){
        const response = await Axios.get(url,{params:params})
        return response.data
    }
    
    async post(url,data,params){
       const response = await Axios.post(url,data,params)
       return response.data
    }
}

export default new HttpClient()