import { useEffect, useState } from "react"
import api from "../api/axios"
import FormError from "../components/FormError"


function BarberAppointmentsPage(){
    const [loading, setLoading] = useState("")
    const [errors, setErrors] = useState("")
    const [appointments, setAppointments] = useState([])
    const [cancelError, setCancelError] = useState("")
    const [cancelLoading, setCancelLoading] = useState("")
    const [cancelId, setCancelId] = useState("")
    const [completeError, setCompleteError] = useState("")
    const [completeLoading, setCompleteLoading] = useState("")
    const [completeId, setCompleteId] = useState("")

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
        
        setCancelError({})
        setCancelLoading(true)
        setCancelId(id)

        try{
            await api.post(`barber/appointments/${id}/cancel/`)
            fetchAppointments()
        } catch(error) {
            if (error.response) {
                setCancelError({ general: error.response.data.detail || "A aparut o eroare."})
            } else {
                setCancelError({ general: "Could not connect to the server."})
            }
        } finally {
            setCancelLoading(false)
            setCancelId("")
        }

    }

    async function completeAppointment(id) {
        
        setCompleteError({})
        setCompleteLoading(true)
        setCompleteId(id)

        try{
            await api.post(`barber/appointments/${id}/complete/`)
            fetchAppointments()
        } catch(error) {
            if (error.response) {
                setCompleteError({general: error.response.data.detail || "A aparut o eroare."})
            } else {
                setCompleteError({general: "Could not connect to the server."})
            }
        } finally {
            setCompleteLoading(false)
            setCompleteId("")
        }
    }

    return(
        <div>
            <div>
                {loading && <p>Se incarca...</p>}
                <p>Your appointments are:</p>
            </div>

            <FormError error={errors.general} />

            <div>
                {appointments.map((appointment) => {
                    return(
                        <div key={appointment.id}>
                            {appointment.start_time} - {appointment.status}
                        </div>
                    )
                })}
            </div>

        </div>
    )

}

export default BarberAppointmentsPage