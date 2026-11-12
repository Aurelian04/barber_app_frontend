import { useEffect, useState } from "react"
import api from "../api/axios"

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
                setErrors({general: error.response.data.detail || "A aparut o eroare."})
            } else {
                setErrors({general: "Could not connect to the server."})
            }
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchWeeklySchedule()
    },[])

    return()
}
export default BarberSchedulePage