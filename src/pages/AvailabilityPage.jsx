import { useState, useEffect } from "react"
import api from "../api/axios"
import { useParams } from "react-router"

function AvailabilityPage(){
    const [errors, setErrors] = useState("")
    const [loading, setLoading] = useState("")
    const [availableSlots, setAvailableSlots] = useState([])
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()
    const monthStr = `${month}`.padStart(2, "0")
    const dayStr = `${day}`.padStart(2, "0")
    const dateString = `${year}-${monthStr}-${dayStr}`
    const [date, setDate] = useState(dateString)
    const{ barberId, serviceId} = useParams()

        async function availability() {

            setErrors({})
            setLoading(true)

            try{
                const response = await api.get(`barber/available-slots/?barber=${barberId}&service=${serviceId}&date=${date}`)
                setAvailableSlots(response.data)
            }

        }


    return 

}

export default AvailabilityPage