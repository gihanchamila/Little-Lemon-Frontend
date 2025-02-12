import React from "react";
import { useState, useEffect } from "react";
import Button from "../Button/Button";

const BookingForm = (props) => {

   const [occasion, setOccasion] = useState("");
   const [guests, setGuests] = useState("");
   const [date, setDate] = useState("");
   const [seating, setSeating] = useState("")
   const [times, setTimes] = useState("")

   const [formErrors, setFormErrors] = useState({})

   const { availableTimes } = props;

   useEffect(() => {
    console.log("Updated availableTimes in Booking:", availableTimes);
  }, [availableTimes]);

   const validateForm = () => {
    let errors = {};

    if (!date) errors.date = "Please select a date.";
    if (!times) errors.times = "Please choose a time.";
    if (!guests || guests < 1 || guests > 10) errors.guests = "Guests must be between 1 and 10.";
    if (!occasion) errors.occasion = "Please select an occasion.";
    if (!seating) errors.seating = "Please select a seating option.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm(); // Ensure validation is checked first
    if (!isValid) {
      console.log("Form contains errors:", formErrors); // Debugging
      return; // Stop form submission

    }
    const formData = { date, times, guests, seating, occasion };
    props.submitForm(formData);
  };

   const handleChange = (e) => {
    setDate(e);
    props.dispatch({ type: "UPDATE_TIMES", date: e }); 
  };
  

  return (
    <header>
      <section className="gridLayout">
        <form onSubmit={handleSubmit} className="col-start-2 col-end-12">
          <fieldset className="flex flex-col space-y-2">
            <div className="flex justify-between">
                <div className="field">
                    <label htmlFor="book-date" className="pb-2">Choose Date:</label>
                    <input className="fieldInput" id="book-date" value={date} onChange={(e) => handleChange(e.target.value)} type="date"/>
                    {formErrors.date && <p className="text-red-500 text-sm">{formErrors.date}</p>}
                </div>
                <div className="field">
                    <label htmlFor="book-time" className="pb-2">Choose Time:</label>
                    <select className="fieldInput" id="book-time" value={times} onChange={(e) => setTimes(e.target.value)}>
                        <option value="">Select a Time</option>
                    {props.availableTimes.availableTimes.map(availableTimes => {return <option key={availableTimes}>{availableTimes}</option>})}
                    </select>
                    {formErrors.times && <p className="text-red-500 text-sm">{formErrors.times}</p>}
                </div>
            </div>
            <div className="flex justify-between">
                <div className="field">
                    <label htmlFor="book-guests" className="pb-2">Number of Guests:</label>
                    <input className="fieldInput" id="book-guests" min="1" value={guests} onChange={(e) => {setGuests(e.target.value)}} type={"number"} placeholder={0} max={10}></input>
                    {formErrors.guests && <p className="text-red-500 text-sm">{formErrors.guests}</p>}
                </div>
                <div className="field">
                    <label htmlFor="book-occasion" className="pb-2">Occasion:</label>
                    <select className="fieldInput" id="book-occasion" key={occasion} value={occasion} onChange={(e) => setOccasion(e.target.value)}>
                        <option value="">Select an Option</option>
                        <option>Birthday</option>
                        <option>Anniversary</option>
                    </select>
                    {formErrors.occasion && <p className="text-red-500 text-sm">{formErrors.occasion}</p>}
                </div>
            </div>
            <div className="flex justify-start pt-10">
                <div className="flex flex-row text-primary-1 text-sm font-karla font-extrabold w-[200px] space-x-2 items-center">
                    <label htmlFor="indoor" className="">Indoor Seating</label>
                    <input className="fieldInput" id="indoor" value="Indoor" checked={seating === "Indoor"}  onChange={(e) => setSeating(e.target.value)} type="radio" ></input>
                </div>
                <div className="flex flex-row text-primary-1 text-sm font-karla font-extrabold w-[200px] space-x-2 items-center">
                    <label htmlFor="outdoor" className="">Outdoor Seating</label>
                    <input className="fieldInput" id="outdoor"  value="Outdoor" checked={seating === "Outdoor"}  onChange={(e) => setSeating(e.target.value)} type="radio"></input>
                </div>
                {formErrors.seating && <p className="formError font-bold">{formErrors.seating}</p>}
            </div>
            
          </fieldset>
          <div className="flex justify-end pt-10"> 
            <Button>Make a reservation</Button>
          </div>
        </form>
      </section>
    </header>
  );
};

export default BookingForm;