import { useState, useEffect } from "react"
import api from "../api/axios"
import { useParams } from "react-router"
import FormError from "../components/FormError"

function AvailabilityPage(){
    const [errors, setErrors] = useState("")
    const [loading, setLoading] = useState("")
    const [availableSlots, setAvailableSlots] = useState([])
    const [selectedSlot, setSelectedSlot] = useState(null)
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()
    const monthStr = `${month}`.padStart(2, "0")
    const dayStr = `${day}`.padStart(2, "0")
    const dateString = `${year}-${monthStr}-${dayStr}`
    const [date, setDate] = useState(dateString)
    const{ barberId, serviceId} = useParams()

        async function fetchAvailability() {

            setErrors({})
            setLoading(true)

            try{
                const response = await api.get(`barber/available-slots/?barber=${barberId}&service=${serviceId}&date=${date}`)
                setAvailableSlots(response.data.slots)
            } catch (error) {
                if (error.response) {
                    setErrors({ general: error.response.data.detail || "A apărut o eroare." })
                } else {
                    setErrors({general: "Could not connect to the server."})
                }
            } finally {
                setLoading(false)
            }

        }

        useEffect(() => {
            fetchAvailability()
        },[date])


    return(
        <div>
            <div>
                {loading && <p>Se incarca...</p>}
                Available slots:
            </div>

            <FormError error={errors.general} />

            <input type="date" 
                value={date}
                onChange={(event) => setDate(event.target.value)} 
            />

            <div>
                <h2>Available slots are:</h2>
                {availableSlots.map((slot) => (
                    <button key={slot} onClick={() => selectedSlot(slot)}>
                        {slot.slice(11, 16)}
                    </button>
                ))}
            </div>

        </div>
    ) 
        
}

export default AvailabilityPage