import { useEffect, useState } from "react"
import api from "../api/axios"
import { MESSAGES } from "../messages"
import FormError from "../components/FormError"

const days ={
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday"
}

function BarberSchedulePage() {
    const [loading, setLoading] = useState(true)
    const [weeklySchedule, setWeeklySchedule] = useState([])
    const [errors, setErrors] = useState({})

    async function fetchWeeklySchedule() {

        setErrors({})
        setLoading(true)

        try{
            const response = await api.get("barber/weekly-schedules/")
            setWeeklySchedule(response.data)
        } catch(error) {
            if (error.response) {
                setErrors({general: error.response.data.detail || MESSAGES.genericError})
            } else {
                setErrors({general: MESSAGES.networkError})
            }
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchWeeklySchedule()
    },[])

    return(
        <div>
            <div>
                {loading && <p>Loading...</p>}
                {weeklySchedule.length > 0 && <p>Your schedules are:</p>}
            </div>

            <FormError error={errors.general} />
            {!loading && !errors.general && weeklySchedule.length === 0 && <p>You haven't set a schedule yet.</p>}

            <div>
                {weeklySchedule.map((weeklySchedule) => {
                    return(
                        <div key={weeklySchedule.id}>
                            {days[weeklySchedule.weekday]}
                            {" "} 
                            {weeklySchedule.start_time.slice(0, 5)} - {weeklySchedule.end_time.slice(0, 5)}
                        </div>
                    )})}
            </div>

        </div>
    )
}
export default BarberSchedulePage