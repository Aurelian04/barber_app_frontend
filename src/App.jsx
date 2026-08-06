import { Route, Routes } from "react-router"

import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ServicesPage from "./pages/ServicesPage"
import BarbersPage from "./pages/BarbersPage"

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/barbers" element={<BarbersPage />} />
        <Route path="/services/:barberId" element={<ServicesPage />} />
      </Routes>
    </>
  )
}

export default App