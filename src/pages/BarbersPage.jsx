import api from "../api/axios";
import { useState, useEffect } from "react";

function BarbersPage() {
    const [barbers, setBarbers] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState("")

    async function fetchBarbers() {

        setErrors({})
        setLoading(true)

        try{
            const response = await api.get("user/barber/list/")
            setBarbers(response.data)
        } catch (error){
            if (error.response) {
                setErrors(error.response.data)
            } else {
                setErrors({general: "Could not connect to the server."})
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBarbers()
    }, [])

    return(
        <div>
            {loading && <p>Se incarca...</p>}
            All Barbers and thier services:
        </div>


    )

    }

export default BarbersPage