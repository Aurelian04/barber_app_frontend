import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"
import FormError from "../components/FormError"

function RegisterPage() {
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [errors, setErrors] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        setErrors({})
        setIsLoading(true)

        try{

            const data = {
                username,
                email,
                password,
                confirm_password: confirmPassword,
                first_name: firstName,
                last_name: lastName,
            }

            await axios.post(
                "http://127.0.0.1:8000/api/user/register/",
                data
            )

            navigate("/login")

        } catch (error) {
            if (error.response) {
                setErrors(error.response.data)
            } else {
                setErrors({
                    general: "Could not connect to the server."
                })
            }
        } finally {
            setIsLoading(false)
        }

    }

    return(
        <>
        
        <form onSubmit={handleSubmit}>

            <label htmlFor="username">Username</label>
            <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <FormError error={errors.username} />

            <label htmlFor="firstName">First Name</label>
            <input id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            <FormError error={errors.first_name} />

            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            <FormError error={errors.last_name} />
            

            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <FormError error={errors.email} />

            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <FormError error={errors.password} />

            <label htmlFor="confirm-password">Confirm Password</label>
            <input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <FormError error={errors.confirm_password} />

            <button disabled={isLoading}>
                {isLoading ? "Creating account..." : "Register"}
            </button>

        </form>
        </>
    )
}

export default RegisterPage