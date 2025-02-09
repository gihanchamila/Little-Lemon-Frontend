import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { submitAPI, fetchAPI } from '../../api/api'

const initialFormData = {date : "", time : "", guests : "", occasion : ""}
const initialFormError = {date : "", time : "", guests : "", occasion : ""}

const BookingForm = ({availableTimes, dispatch}) => {

  const [formData, setFormData] = useState(initialFormData)
  const [formError, setFormError] = useState(initialFormError)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const navigate = useNavigate()

  const validateForm = () => {
    let errors = {};
    if (!formData.date) errors.date = 'Date is required';
    if (!formData.time) errors.time = 'Time is required';
    if (!formData.guests || formData.guests < 1 || formData.guests > 10)
      errors.guests = 'Guests must be between 1 and 10';
    if (!formData.occasion) errors.occasion = 'Please select an occasion';

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      console.error("Form validation failed");
      return;
    }

    const success = submitAPI(formData);
    if (success) {
      console.log("Form submitted successfully:", formData);
      setFormData(initialFormData);
    } else {
      console.error("Form submission failed");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(new Date(newDate));
  
    setFormData((prev) => ({ ...prev, date: newDate }));

    const times = fetchAPI(new Date(newDate));
    dispatch({ type: 'UPDATE_TIMES', payload: times });
  };
  
  return (
    <>
        <form className="gridLayout" onSubmit={handleSubmit}>
          <div className='col-start-5 col-end-10'>
            <div className='flex flex-col space-y-4'>
              <label htmlFor="res-date" className="font-medium">Choose date</label>
              <input 
                type="date" 
                id="res-date" 
                name='date'
                value={formData.date}
                onChange={handleDateChange}
                className="p-2 border rounded" 
              />

              {formError.date && <span className="text-red-500">{formError.date}</span>}
              
              <label htmlFor="res-time" className="font-medium">Choose time</label>
              <select 
                id="res-time" 
                name='time'
                value={formData.time}
                onChange={handleChange}
                className="p-2 border rounded"
              >
                  {availableTimes.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
              </select>

              {formError.time && <span className="text-red-500">{formError.time}</span>}
              
              <label htmlFor="guests" className="font-medium">Number of guests</label>
              <input 
                type="number" 
                placeholder="1" 
                min="1" 
                max="10" 
                id="guests" 
                name='guests'
                value={formData.guests}
                onChange={handleChange}
                className="p-2 border rounded" 

              />

              {formError.guests && <span className="text-red-500">{formError.guests}</span>}
              
              <label htmlFor="occasion" className="font-medium">Occasion</label>
              <select 
                id="occasion" 
                name='occasion'
                value={formData.occasion}
                onChange={handleChange}
                className="p-2 border rounded"
              >

                <option>Birthday</option>
                <option>Anniversary</option>
              </select>

              {formError.occasion && <span className="text-red-500">{formError.occasion}</span>}
              
              <input type="submit" value="Make Your Reservation" className="p-2 mt-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700" />
            </div>
          </div>
        </form>
    </>
        
    
  )
}

export default BookingForm

