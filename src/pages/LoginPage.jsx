import { useState } from "react"
import { useNavigate } from "react-router"
import api from "../api/axios" 


function LoginPage() {
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()

        setError("")
        setIsLoading(true)

        const data = {
            username,
            password,
        }

        try {
            const response = await api.post(
                "token/",
                data,
            )

            localStorage.setItem("access", response.data.access)
            localStorage.setItem("refresh", response.data.refresh)

            navigate("/")
        } catch (error) {
            if (error.response) {
                setError(error.response.data.detail)
            } else {
                setError("Could not connect to the server.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />

            <input 
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />

            {error && <p>{error}</p>}

            <button type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
            </button>

        </form>
    )
}

export default LoginPage