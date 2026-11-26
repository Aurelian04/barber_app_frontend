import { useEffect, useState } from "react"
import api from "../api/axios"
import { MESSAGES } from "../messages"
import FormError from "../components/FormError"

const days = {
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
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [weekday, setWeekday] = useState(1)

    async function fetchWeeklySchedule() {

        setErrors({})
        setLoading(true)

        try {
            const response = await api.get("barber/weekly-schedules/")
            setWeeklySchedule(response.data)
        } catch (error) {
            if (error.response) {
                setErrors({ general: error.response.data.detail || MESSAGES.genericError })
            } else {
                setErrors({ general: MESSAGES.networkError })
            }
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchWeeklySchedule()
    }, [])

    return (
        <div>
            <div>
                {loading && <p>Loading...</p>}
                {weeklySchedule.length > 0 && <p>Your schedules are:</p>}
            </div>

            <FormError error={errors.general} />
            {!loading && !errors.general && weeklySchedule.length === 0 && <p>You haven't set a schedule yet.</p>}

            <div>
                {weeklySchedule.map((weeklySchedule) => {
                    return (
                        <div key={weeklySchedule.id}>
                            {days[weeklySchedule.weekday]}
                            {" "}
                            {weeklySchedule.start_time.slice(0, 5)} - {weeklySchedule.end_time.slice(0, 5)}
                        </div>
                    )
                })}
            </div>

            <div>
                <form>
                    <div>
                        <label htmlFor="weekday">Weekday</label>
                        <select id="weekday" value={weekday} onChange={(e) => setWeekday(e.target.value)}>
                            <option value={1}>Monday</option>
                            <option value={2}>Tuesday</option>
                            <option value={3}>Wednesday</option>
                            <option value={4}>Thursday</option>
                            <option value={5}>Friday</option>
                            <option value={6}>Saturday</option>
                            <option value={7}>Sunday</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="startTime">Start Time</label>
                        <input id="startTime" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="endTime">End Time</label>
                        <input id="endTime" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                    </div>

                    <button>Add</button>

                </form>
            </div>

        </div>
    )
}
export default BarberSchedulePage