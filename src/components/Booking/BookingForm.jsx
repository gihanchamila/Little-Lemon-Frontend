import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../Button/Button";
import { errorResponse } from "../../utils/errorResponse";
import { Asterisk } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

// Your Field component remains the same
export const Field = ({labelText, id, value, onChange, type, checked, placeholder, formErrors, ...props }) => {
  return (
    <field className="field">
        <label htmlFor={id} className="pb-2 relative">{labelText}<Asterisk size={12} color={"#fb2c36"} className="absolute top-1 left-28" /></label>
        <input className="fieldInput" id={id} value={value} name={id} onChange={onChange} type={type}/>
    </field>
  )
}


const BookingForm = () => {
   // State for form fields
   const [occasion, setOccasion] = useState("");
   const [guests, setGuests] = useState("");
   const [date, setDate] = useState("");
   const [seating, setSeating] = useState("");
   const [occasionsList, setOccasionsList] = useState([]);
   const [seatingTypesList, setSeatingTypesList] = useState([]);
   
   // --- MODIFIED STATE ---
   // State to hold the array of time slot objects from the API
   const [availableTimes, setAvailableTimes] = useState([]); 
   // State to hold the user's selected time (label)
   const [selectedTime, setSelectedTime] = useState(""); 

   const [formErrors, setFormErrors] = useState({});
   const navigate = useNavigate();

   useEffect(() => {
    const checkAvailability = async () => {
      if (!date || !selectedTime || !guests || !seating) return;

      const booking_datetime = `${date}T${selectedTime}:00`;

      try {
        const res = await axiosInstance.post("/api/check-availability/", {
          booking_datetime : booking_datetime,
          number_of_guests : guests,
          seating_type_id : seating,
        });

        if (!res.data.available) {
          setFormErrors(prev => ({
            ...prev,
            time: res.data.detail || "Time slot not available",
          }));
        } else {
          setFormErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.time;
            return newErrors;
          });
        }
      } catch (error) {
        console.error(error);
        setFormErrors(prev => ({
          ...prev,
          time: "Something went wrong checking availability.",
        }));
      }
    };

    checkAvailability();
  }, [date, selectedTime, guests, seating]);

   // --- MODIFIED DATA FETCHING ---
   const fetchTimeSlots = useCallback(async () => {
      try {
        const response = await axiosInstance.get("/api/time-slots/");
        const timeSlots = response.data.results; // Directly access the 'results' array
        setAvailableTimes(timeSlots); // Set the array of objects to state
      } catch (error) {
        errorResponse(error);
      }
    }, []);

   const fetchOccasions = useCallback(async() => {
      try {
        const response = await axiosInstance.get("/api/occasions/");
        const data = response.data.results;
        setOccasionsList(data);
      } catch(error) {
        errorResponse(error);
      }
   }, []);

    const fetchSeatingTypes = useCallback(async () => {
      try {
        const response = await axiosInstance.get("/api/seating-types/");
        setSeatingTypesList(response.data.results);
      } catch (error) {
        errorResponse(error);
      }
   }, []);

   useEffect(() => {
    fetchTimeSlots();
    fetchOccasions();
    fetchSeatingTypes(); 
   }, [fetchTimeSlots, fetchOccasions, fetchSeatingTypes]);

   
   // --- MODIFIED VALIDATION ---
   const validateForm = () => {
    let errors = {};

    if (!date) errors.date = "Please select a date.";
    if (!selectedTime) errors.time = "Please choose a time."; // Check selectedTime
    if (!guests || guests < 1 || guests > 10) errors.guests = "Guests must be between 1 and 10.";
    if (!occasion) errors.occasion = "Please select an occasion.";
    if (!seating) errors.seating = "Please select a seating option.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

     const handleSubmit = (e) => {
    // A. Prevent the browser's default form submission behavior
    e.preventDefault();

    // B. Run validation
    const isValid = validateForm();
    if (!isValid) {
      return; // Stop the function if validation fails
    }

    if (!date || !selectedTime) {
    setFormErrors({
      date: !date ? "Date is required" : undefined,
      time: !selectedTime ? "Time is required" : undefined,
    });
    return;
  }
  

  const selectedOccasionName = occasionsList.find(item => item.id === parseInt(occasion))?.name || "Unknown";
  const booking_datetime = `${date}T${selectedTime}:00`;
    // C. Create the data object from the current state
    const formData = {
        date,
        selectedTime,
        booking_datetime,
        guests,
        seating,
        occasion,
        selectedOccasionName,
    };

    // D. Navigate to the confirmation page, passing the data in the state
    localStorage.setItem("formData", JSON.stringify(formData));
    navigate('/confirmed', { state: { bookingData: formData } });
  };

  const handleChange = (e) => {
    setDate(e);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <header>
      <section className="gridLayout">
        <form onSubmit={handleSubmit} className="lg:col-start-2 lg:col-end-12 sm:col-start-1 sm:col-end-5 sm:col-span-4">
          <fieldset className="flex flex-col space-y-2">
            <div className="lg:flex lg:flex-row lg:justify-between sm:flex sm:flex-col lg:space-y-0 sm:space-y-2">
                <div className="field">
                    <label htmlFor="book-date" className="pb-2 relative">Choose Date <Asterisk size={12} color={"#fb2c36"} className="absolute top-1 left-28" /></label>
                    <input className="fieldInput" id="book-date" value={date} onChange={(e) => handleChange(e.target.value)} type="date"/>
                    {formErrors.date && <p className="text-red-500 text-sm">{formErrors.date}</p>}
                </div>
                {/* --- MODIFIED DROPDOWN --- */}
                <div className="field">
                    <label htmlFor="book-time" className="pb-2 relative">Choose Time <Asterisk size={12} color={"#fb2c36"} className="absolute top-1 left-28" /></label>
                    <select
                        className="fieldInput"
                        id="book-time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                    >
                        <option value="">Select a Time</option>
                        {availableTimes.map(slot => (
                            <option key={slot.id} value={slot.start_time}>
                               {slot.label}
                            </option>
                        ))}
                    </select>
                    {/* Update error key to 'time' */}
                    {formErrors.time && <p className="text-red-500 text-sm">{formErrors.time}</p>}
                </div>
            </div>
            <div className="lg:justify-between lg:flex-row sm:flex sm:flex-col sm:space-y-2 lg:space-y-0">
                <div className="field">
                    <label htmlFor="book-guests" className="pb-2 relative">Number of Guests<Asterisk size={12} color={"#fb2c36"} className="absolute top-1 left-40" /></label>
                    <input className="fieldInput" id="book-guests" min="1" value={guests} onChange={(e) => {setGuests(e.target.value)}} type={"number"} placeholder={"0"} max={10}></input>
                    {formErrors.guests && <p className="text-red-500 text-sm">{formErrors.guests}</p>}
                </div>
                <div className="field">
                    <label htmlFor="book-occasion" className="pb-2 relative">Occasion <Asterisk size={12} color={"#fb2c36"} className="absolute top-1 left-21" /></label>
                    <select
                        className="fieldInput"
                        id="book-occasion"
                        value={occasion} // Controlled by the 'occasion' state
                        onChange={(e) => setOccasion(e.target.value)}
                    >
                        <option value="">Select an Option</option>
                        {/* Map over the fetched occasionsList */}
                        {occasionsList.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    {formErrors.occasion && <p className="text-red-500 text-sm">{formErrors.occasion}</p>}
                </div>
            </div>
            <div className="field pt-3">
                <label htmlFor="book-seating" className="pb-2 relative">Seating Type <Asterisk size={12} color={"#fb2c36"} className="absolute top-1 left-28" /></label>
                <select
                    className="fieldInput"
                    id="book-seating"
                    value={seating}
                    onChange={(e) => setSeating(e.target.value)}
                >
                    <option value="">Select a Seating Type</option>
                    {seatingTypesList.map(type => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                </select>
                {formErrors.seating && <p className="text-red-500 text-sm">{formErrors.seating}</p>}
            </div>
          </fieldset>
          <div className="lg:col-start-10 lg:col-end-13 lg:w-full  sm:col-start-2 sm:col-end-4 sm:pt-10 sm:flex sm:flex-col sm:justify-end sm:w-[316px] lg:flex-row  sm:space-y-4">
            <Button onClick={handleBack} className={'sm:mr-0 lg:mb-0 lg:mr-5  lg:flex lg:justify-self-end'}>Back</Button>
            <Button className="lg:flex lg:justify-self-end">Make a reservation</Button>
          </div>
        </form>
      </section>
    </header>
  );
};

export default BookingForm;