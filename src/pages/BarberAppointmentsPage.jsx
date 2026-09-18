import { useEffect, useState } from "react"
import api from "../api/axios"

function BarberAppointmentsPage(){
    const [loading, setLoading] = useState("")
    const [errors, setErrors] = useState("")
    const [appointments, setAppointments] = useState([])

    async function fetchAppointments() {

        setErrors({})
        setLoading(true)

        try{
            const response = await api.get("barber/appointments/")
            setAppointments(response.data)
        } catch(error) {
            if (error.response) {
                setErrors({ general: error.response.data.detail || "A aparut o eroare."})
            } else {
                setErrors({ general: "Could not connect to the server."})
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAppointments()
    },[])

    async function cancelAppointment(id) {
        
    }

}

export default BarberAppointmentsPage