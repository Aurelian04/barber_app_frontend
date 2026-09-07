import { useEffect, useState } from "react"
import api from "../api/axios"
import FormError from "../components/FormError"

function AppointmentsPage(){
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState("")
    const [cancelLoading, setCancelLoading] = useState("")
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
                setErrors({ general: error.response.data.detail || "A aparut o eroare."})
            } else {
                setErrors({general: "Could not connect to the server."})
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
                setCancelError({general: error.response.data.detail || "A aparut o eroare."})
            } else {
                setCancelError({general: "Could not connect to the server."})
            }
        } finally {
            setCancelLoading(false)
            setCancelId("")
        }
    }

    return(
        <div>
            <div>
                {loading && <p>Se incarca...</p>}
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
                                    {isCancelling ? "Is cancelling..." : "Cancel"}
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