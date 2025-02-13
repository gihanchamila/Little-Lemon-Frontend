import { useReducer } from "react"
import { Router, Routes, Route, useNavigate } from "react-router-dom"
import { fetchAPI, submitAPI } from "./api/api"

import Footer from "../src/components/Footer"
import Header from "../src/components/Header"
import MainScreen from "../src/components/MainScreen"
import Navigation from "../src/components/Navigation"

import Booking from "./components/Booking/Booking"
import ConfirmBooking from "./components/Booking/ConfirmBooking"

function App() {

  const initialState = {availableTimes:  fetchAPI(new Date())}
  const [state, dispatch] = useReducer(updateTimes, initialState);

  const navigate = useNavigate();

  function updateTimes(state, action) {
    switch (action.type) {
      case "UPDATE_TIMES":
        return { availableTimes: fetchAPI(new Date(action.date)) };
        
      case "BOOK_TIME":
        return {
          availableTimes: state.availableTimes.filter(time => time !== action.time),
        };
      default:
        return state;
    }
  }
  
  function submitForm (formData) {
      const result = submitAPI(formData)
      console.log(result)
      if (result) {
          console.log(formData)
          window.localStorage.setItem("formData", JSON.stringify(formData))
          dispatch({ type: "BOOK_TIME", time: formData.times });
          navigate("/confirmed")
      }
  }

  return (
    <>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/Little-Lemon/" element={<MainScreen />} />
        <Route path="booking" element={<Booking availableTimes={state} dispatch={dispatch} submitForm={submitForm} />}/>
        <Route path="confirmed" element={<ConfirmBooking />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
