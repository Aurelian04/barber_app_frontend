import api from "../api/axios";
import { useState, useEffect } from "react";
import FormError from "../components/FormError";
import { Link } from "react-router";
import { MESSAGES } from "../messages";

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
                setErrors({ general: error.response.data.detail || MESSAGES.genericError })
            } else {
                setErrors({general: MESSAGES.networkError})
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
            <div>
                {loading && <p>Loading...</p>}
                All Barbers and thier services:
            </div>

            <FormError error={errors.general} />

            <div>
                <h2>List of barbers:</h2>
                {barbers.map((barber) => (
                    <Link key={barber.id} to={`/services/${barber.id}`}>
                        <div>{barber.first_name} {barber.last_name}</div>
                    </Link>
                ))}
            </div>
        </div>


    )

    }

export default BarbersPage