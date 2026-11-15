import { useEffect, useState } from "react"
import api from "../api/axios"
import FormError from "../components/FormError"
import { MESSAGES } from "../messages"

function AppointmentsPage(){
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true)
    const [cancelLoading, setCancelLoading] = useState(false)
    const [cancelId, setCancelId] = useState("")
    const [errors, setErrors] = useState("")
    const [cancelError, setCancelError] = useState("")


    async function fetchAppointments() {
        
        setErrors({})
        setLoading(true)

        try{
            const response = await api.get("appointments/")
            setAppointments(response.data)
        } catch (error) {
            if (error.response) {
                setErrors({ general: error.response.data.detail || MESSAGES.genericError})
            } else {
                setErrors({general: MESSAGES.networkError})
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
            await api.post(`appointments/${id}/cancel/`)
            fetchAppointments()
        } catch(error) {
            if (error.response) {
                setCancelError({general: error.response.data.detail || MESSAGES.genericError})
            } else {
                setCancelError({general: MESSAGES.networkError})
            }
        } finally {
            setCancelLoading(false)
            setCancelId("")
        }
    }

    return(
        <div>
            <div>
                {loading && <p>Loading...</p>}
                Your appointments are:
            </div>

            <FormError error={errors.general} />

            <div>
                {appointments.map((appointment) => {
                    const isCancelling = appointment.id === cancelId
                    return(
                        <div key={appointment.id}>
                            {appointment.start_time} - {appointment.status}
                            {appointment.status === "booked" && (
                                <button disabled={isCancelling} onClick={() => cancelAppointment(appointment.id)}>
                                    {isCancelling ? "Cancelling..." : "Cancel"}
                                </button>
                            )}
                        </div>
                    )
                })}
            </div>

            <FormError error={cancelError.general} />

        </div>
    )

}

export default AppointmentsPage