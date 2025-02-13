import React from "react";
import { useState, useEffect } from "react";
import Button from "../Button/Button";

import { Star, StarIcon, Asterisk } from "lucide-react";

export const Field = ({labelText, id, value, onChange, type, checked, placeholder, formErrors, ...props }) => {

  return (
    <field className="field">
        <label htmlFor={id} className="pb-2 relative">{labelText}<Asterisk size={12} color={"#fb2c36"} className="absolute top-1 left-28" /></label>
        <input className="fieldInput" id={id} value={value} name={id} onChange={onChange} type={type}/>
    </field> 
  )
}

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
        <form onSubmit={handleSubmit} className="lg:col-start-2 lg:col-end-12 sm:col-start-1 sm:col-end-4 col-span-4">
          <fieldset className="flex flex-col space-y-2">
            <div className="lg:flex lg:flex-row lg:justify-between sm:flex sm:flex-col lg:space-y-0 sm:space-y-2">
                <div className="field">
                    <label htmlFor="book-date" className="pb-2 relative">Choose Date <Asterisk size={12} color={"#fb2c36"} className="absolute top-1 left-28" /></label>
                    <input className="fieldInput" id="book-date" value={date} onChange={(e) => handleChange(e.target.value)} type="date"/>
                    {/* <Field labelText={"Choose Date"} id={"book-date"} value={date} onChange={(e) => handleChange(e.target.value)} type="date" /> */}
                    {formErrors.date && <p className="text-red-500 text-sm">{formErrors.date}</p>}
                </div>
                <div className="field">
                    <label htmlFor="book-time" className="pb-2 relative">Choose Time <Asterisk size={12} color={"#fb2c36"} className="absolute top-1 left-28" /></label>
                    <select className="fieldInput" id="book-time" value={times} onChange={(e) => setTimes(e.target.value)}>
                        <option value="">Select a Time</option>
                    {props.availableTimes.availableTimes.map(availableTimes => {return <option key={availableTimes}>{availableTimes}</option>})}
                    </select>
                    {formErrors.times && <p className="text-red-500 text-sm">{formErrors.times}</p>}
                </div>
            </div>
            <div className="lg:justify-between lg:flex-row sm:flex sm:flex-col sm:space-y-2 lg:space-y-0">
                <div className="field">
                    <label htmlFor="book-guests" className="pb-2 relative">Number of Guests<Asterisk size={12} color={"#fb2c36"} className="absolute top-1 left-40" /></label>
                    <input className="fieldInput" id="book-guests" min="1" value={guests} onChange={(e) => {setGuests(e.target.value)}} type={"number"} placeholder={0} max={10}></input>
                    {formErrors.guests && <p className="text-red-500 text-sm">{formErrors.guests}</p>}
                </div>
                <div className="field">
                    <label htmlFor="book-occasion" className="pb-2 relative">Occasion <Asterisk size={12} color={"#fb2c36"} className="absolute top-1 left-21" /></label>
                    <select className="fieldInput" id="book-occasion" key={occasion} value={occasion} onChange={(e) => setOccasion(e.target.value)}>
                        <option value="">Select an Option</option>
                        <option>Birthday</option>
                        <option>Anniversary</option>
                    </select>
                    {formErrors.occasion && <p className="text-red-500 text-sm">{formErrors.occasion}</p>}
                </div>
            </div>
            <div className="sm:flex lg:flex-col sm:flex-row">
              <div className="sm:flex sm:flex-col lg:flex-row lg:items-center lg:justify-start lg:pt-5 sm:pt-5">
                  <p className="text-sm font-extrabold text-primary-1 font-karla mr-10 relative sm:mb-2 lg:mb-0">Seating type :<Asterisk size={12} color={"#fb2c36"} className="absolute top-0 left-[125px]" /></p>
                  <div className="sm:flex sm:flex-col lg:flex-row sm:space-x-4">
                    <div className="flex flex-row text-primary-1 text-sm font-karla font-extrabold w-[200px] space-x-2 items-center">
                        <label htmlFor="indoor" className="relative">Indoor Seating </label>
                        <input className="lg:fieldInput ml-2" id="indoor" value="Indoor" checked={seating === "Indoor"}  onChange={(e) => setSeating(e.target.value)} type="radio" ></input>
                    </div>
                    <div className="flex sm:flex-row text-primary-1 text-sm font-karla font-extrabold w-[200px] space-x-2 items-center">
                        <label htmlFor="outdoor" className="relative">Outdoor Seating </label>
                        <input className="lg:fieldInput ml-2" id="outdoor"  value="Outdoor" checked={seating === "Outdoor"}  onChange={(e) => setSeating(e.target.value)} type="radio"></input>
                    </div>
                  </div> 
              </div>
              {formErrors.seating && <p className="formError font-bold">{formErrors.seating}</p>}
            </div>
          </fieldset>
          <div className="lg:col-start-2 lg:col-end-13 lg:w-full lg:grid sm:col-start-2 sm:col-end-4 sm:pt-10 sm:flex sm:justify-end sm:w-[316px]"> 
            <Button className="w-full">Make a reservation</Button>
          </div>
        </form>
      </section>
    </header>
  );
};

export default BookingForm;