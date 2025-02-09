import { Router, Routes, Route } from "react-router-dom"

import Footer from "../src/components/Footer"
import Header from "../src/components/Header"
import MainScreen from "../src/components/MainScreen"
import Navigation from "../src/components/Navigation"

import BookingPage from '../src/components/Booking/BookingPage'
import ConfirmedBooking from "./components/Booking/ConfirmedBooking"

function App() {

  return (
    <>
      <>
      <Header />
      <Navigation />
      
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="booking" element={<BookingPage />} />
        <Route path="confirm-booking" element={<ConfirmedBooking />} />
      </Routes>

      <Footer />
    </>
      
    </>
  )
}

export default App
