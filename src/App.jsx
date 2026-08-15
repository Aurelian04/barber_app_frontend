import { Route, Routes } from "react-router"

import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ServicesPage from "./pages/ServicesPage"
import BarbersPage from "./pages/BarbersPage"
import AvailabilityPage from "./pages/AvailabilityPage"

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/barbers" element={<BarbersPage />} />
        <Route path="/services/:barberId" element={<ServicesPage />} />
        <Route path="/availability/:barberId/:serviceId" element={<AvailabilityPage />} />
      </Routes>
    </>
  )
}

export default App