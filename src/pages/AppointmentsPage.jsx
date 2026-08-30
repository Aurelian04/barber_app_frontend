import { useState } from "react"
import api from "../api/axios"

function AppointmentsPage(){
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState("")
    const [cancelLoading, setCancelLoading] = useState("")
    const [cancelId, setCancelId] = useState("")
    const [errors, setErrors] = useState("")
    const [cancelError, setCancelError] = useState("")

}

export default AppointmentsPage