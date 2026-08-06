import api from "../api/axios"
import { useState, useEffect } from "react"
import FormError from "../components/FormError"
import { useParams } from "react-router"


function ServicesPage() {
    const [errors, setErrors] = useState("")
    const [loading, setLoading] = useState(false)
    const [services, setServices] = useState([])
    const { barberId } = useParams()

    async function fetchServices() {

        setErrors({})
        setLoading(true)

        try{
            const response = await api.get(`services/?barber=${barberId}`)
            setServices(response.data)
        } catch (error){
            if (error.response){
                setErrors(error.response.data)
            } else {
                setErrors({general: "Could not connect to the server."})
            }
        } finally {
            setLoading(false)
        }
        }

    useEffect(() => {
        fetchServices()
    },[])
    




    return(
        <h1>ServicesPage</h1>
    )
}

export default ServicesPage