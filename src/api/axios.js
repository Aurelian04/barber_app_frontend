import axios from "axios"

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
})

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("access")

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

api.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config
        const refresh = localStorage.getItem("refresh")

        if (error.response?.status === 401) {
            console.log("e 401, trebuie refresh")

            if (!refresh) {
            console.log("You need to re-authenticate")
            return Promise.reject(error)
        }

            
            try {
                
                const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {refresh})

                localStorage.setItem("access", response.data.access)

                originalRequest.headers.Authorization = `Bearer ${response.data.access}`
                return api(originalRequest)
            
            } catch {
                localStorage.removeItem("access")
                localStorage.removeItem("refresh")
                window.location.href = "/login"

            } 
        }
return Promise.reject(error)

}

)

export default api