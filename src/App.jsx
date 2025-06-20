import { useReducer } from "react"
import { Router, Routes, Route, useNavigate } from "react-router-dom"
import { fetchAPI, submitAPI } from "./api/api"

import Footer from "../src/components/Footer"
import Header from "../src/components/Header"
import MainScreen from "../src/components/MainScreen"
import Navigation from "../src/components/Navigation"

import Booking from "./components/Booking/Booking"
import ConfirmBooking from "./components/Booking/ConfirmBooking"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import MyBooking from "./components/Booking/MyBooking"

function App() {
  return (
    <>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="login" element={<Login />} />
        <Route path="booking" element={<Booking/>}/>
        <Route path="confirmed" element={<ConfirmBooking />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="my-booking" element={<MyBooking />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
