import React, { useState } from 'react'
import { useEffect } from 'react'

import UserDetailsForm from './UserDetailsForm'

const InputDetails = ({name, value}) => {

  return (
    <div className=''>
        <h3 className='inputDetails lg:text-md sm:text-xs text-primary-1'>{name}</h3>
        <p className='inputDetails lg:text-sm text-secondary-4 pt'>{value}</p>
    </div>
  )
}


const ConfirmBooking = () => {
  const [formData, setFormData] = useState({})

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("formData"))
      if(data){
        setFormData(data)
      }
  }, [])

  return (
    <>
      <header className='lg:grid lg:grid-cols-12 lg:gap-5 lg:px-24  md:grid-cols-4 sm:grid sm:grid-cols-4 sm:gap-5 sm:px-12 sm:py-12'>
        <h2 className='lg:col-start-2 lg:col-end-12 lg:text-2xl font-markazi font-extrabold text-primary-1 sm:col-start-1 sm:col-end-5 sm:text-xl leading-14'>Confirm your reservation</h2>
      </header>
      <main className=''>
        <div className='lg:grid lg:grid-cols-12 lg:gap-5 lg:px-24 md:grid-cols-4 sm:grid sm:grid-cols-4 sm:gap-5 sm:px-12 sm:pb-12'>
          <div className='lg:col-start-2 lg:col-end-12 lg:justify-between border-2 rounded-xl border-secondary-4 p-4 sm:flex sm:flex-row sm:col-start-1 sm:col-end-5 sm:gap-4 sm:text-xs'>
            <InputDetails name={"Date"} value={formData.date} />
            <InputDetails name={"Time"} value={formData.times} />
            <InputDetails name={"Guests"} value={formData.guests} />
            <InputDetails name={"Seating"} value={formData.seating} />
            <InputDetails name={"Occasion"} value={formData.occasion} />
          </div>
        </div>
        <UserDetailsForm />
      </main>
    </>
    
  )
}

export default ConfirmBooking