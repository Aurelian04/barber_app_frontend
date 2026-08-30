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
    const [bookingError, setBookingError] = useState("")
    const [bookingLoading, setBookingLoading] = useState("")
    const [bookingSuccess, setBookingSuccess] = useState("")

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

        async function bookAppointment() {

            setBookingError("")
            setBookingSuccess("")
            setBookingLoading(true)

            const data = {
                barber: barberId,
                service: serviceId,
                start_time: selectedSlot,
            }

            try{

                await api.post("appointments/", data)
                setBookingSuccess("Appointment sent successfully.")
                setSelectedSlot(null)
                fetchAvailability()

            } catch(error) {
                if (error.response) {
                    setBookingError({general: error.response.data.detail || "A aparut o eroare."})
                } else {
                    setBookingError({general: "Could not connect to the server."})
                }
            } finally {
                setBookingLoading(false)
            }

        }


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
                {availableSlots.map((slot) => {
                    const isSelected = slot === selectedSlot
                    return (
                        <button style={{ backgroundColor: isSelected ? "lightgreen" : "white" }} key={slot} onClick={() => setSelectedSlot(slot)}>
                            {slot.slice(11, 16)}
                        </button>
                    )
                })}

            <button 
                type="button"
                onClick={bookAppointment}
                disabled={bookingLoading || selectedSlot === null}>
                    {bookingLoading ? "Booking your appointment..." : "Book appointment"}

            </button>

            <FormError error={bookingError.general} />

            <div>
                {bookingSuccess && <p>{bookingSuccess}</p>}
            </div>

            </div>

        </div>
    ) 
        
}

export default AvailabilityPage