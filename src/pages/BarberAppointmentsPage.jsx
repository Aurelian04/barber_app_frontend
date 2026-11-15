import { useEffect, useState } from "react"
import api from "../api/axios"
import FormError from "../components/FormError"
import { MESSAGES } from "../messages"


function BarberAppointmentsPage(){
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState({})
    const [appointments, setAppointments] = useState([])
    const [cancelError, setCancelError] = useState({})
    const [cancelLoading, setCancelLoading] = useState(false)
    const [cancelId, setCancelId] = useState("")
    const [completeError, setCompleteError] = useState({})
    const [completeLoading, setCompleteLoading] = useState(false)
    const [completeId, setCompleteId] = useState("")

    async function fetchAppointments() {

        setErrors({})
        setLoading(true)

        try{
            const response = await api.get("barber/appointments/")
            setAppointments(response.data)
        } catch(error) {
            if (error.response) {
                if (error.response.status === 403) {
                    setErrors({ general: "Only barbers can see this page."})
                } else {
                    setErrors({ general: error.response.data.detail || MESSAGES.genericError})
                }
            } else {
                setErrors({ general: MESSAGES.networkError})
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
                setCancelError({ general: error.response.data.detail || MESSAGES.genericError, id: id})
            } else {
                setCancelError({ general: MESSAGES.networkError , id: id})
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
                setCompleteError({general: error.response.data.detail || MESSAGES.genericError, id: id})
            } else {
                setCompleteError({general: MESSAGES.networkError, id: id})
            }
        } finally {
            setCompleteLoading(false)
            setCompleteId("")
        }
    }

    return(
        <div>
            <div>
                {loading && <p>Loading...</p>}
                {appointments.length > 0 && <p>Your appointments are:</p>}
            </div>

            <FormError error={errors.general} />
            {!loading && !errors.general && appointments.length === 0 && <p>You don't have any appointments.</p>}

            <div>
                {appointments.map((appointment) => {
                    const isCancelling = appointment.id === cancelId
                    const isCompleting = appointment.id === completeId
                    return(
                        <div key={appointment.id}>
                            {appointment.start_time} - {appointment.status}
                            {appointment.status === "booked" && ( 
                            <> <button disabled={isCancelling} onClick={() => cancelAppointment(appointment.id)}>
                                { isCancelling ? "Cancelling..." : "Cancel" }
                            </button>
                            {appointment.id === cancelError.id && <FormError error={cancelError.general} />}

                            <button disabled={isCompleting} onClick={() => completeAppointment(appointment.id)}>
                                { isCompleting ? "Completing..." : "Complete" }
                            </button>
                            {appointment.id === completeError.id && <FormError error={completeError.general} />}

                            </>)}
                        </div>
                    )
                })}
            </div>

        </div>
    )

}

export default BarberAppointmentsPage