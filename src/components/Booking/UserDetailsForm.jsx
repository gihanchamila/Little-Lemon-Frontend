import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

import { Asterisk } from 'lucide-react';

const initialFormData = {firstName : "", lastName : "", email : "", mobileNumber : "", specialRequest : ""}
const initialFormErrors = {firstName : "", lastName : "", email : "", mobileNumber : "", specialRequest : ""}

const UserDetailsForm = () => {
  const [formData, setFormData] = useState(initialFormData)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  
  const navigate = useNavigate()

  const validateForm = () => {
    let errors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.mobileNumber.trim()) errors.mobileNumber = "Mobile number is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    navigate("/booking");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    window.localStorage.setItem("userData", JSON.stringify(formData));
    navigate("/");
  };
    
  return (
    <form action="" onSubmit={handleSubmit} className='gridLayout p-0 bg-primary-1 mb-5'>
    <div className='lg:col-start-2 lg:col-end-12  lg:space-y-6 sm:col-start-1 sm:col-end-5 sm:space-y-2'>
        <div className='flex flex-row justify-between '>
            <div className='lg:grid lg:grid-cols-12 gap-6 w-full sm:space-y-2'>
                <fieldset className='col-start-1 col-end-6 col-span-5 row-span-1 flex flex-col space-y-4'>
                    <label htmlFor="firstName" className='userField'>First Name <Asterisk size={12} color={"#fb2c36"} className="absolute top-1 left-25" /></label>
                    <input type="text" id='firstName' name='firstName' value={formData.firstName} onChange={handleChange} placeholder='First Name' className='confirmInput' />
                    {formErrors.firstName && <p className="formError font-bold">{formErrors.firstName}</p>}
                </fieldset>
                <fieldset className='col-start-8 col-span-5 flex flex-col space-y-2'>
                    <label htmlFor="lastName" className='userField w-auto'>Last Name<Asterisk size={12} color={"#fb2c36"} className="absolute top-1 left-24" /></label>
                    <input id="lastName" name='lastName' value={formData.lastName} onChange={handleChange} type="text" placeholder='Last Name' className='confirmInput' />
                    {formErrors.lastName && <p className="formError font-bold">{formErrors.lastName}</p>}
                </fieldset>
            </div>
        </div>
       
        <div className=''>
        <div className='lg:grid lg:grid-cols-12 gap-6 w-full grid-rows-1 sm:space-y-2'>
             <fieldset className='col-start-1 col-end-6 col-span-5 flex flex-col space-y-2'>
                    <label htmlFor="email" className='userField w-auto'>Email<Asterisk size={12} color={"#fb2c36"} className="absolute top-1 left-13" /></label>
                    <input id="email" name='email' value={formData.email} onChange={handleChange} type="email" placeholder='Email' className='confirmInput' />
                    {formErrors.email && <p className="formError font-bold">{formErrors.email}</p>}
                </fieldset>
            <fieldset className='col-start-8 col-span-5 flex space-y-2 flex-col row-span-1'>
                <label htmlFor="mobileNumber" className='userField'>Mobile Number<Asterisk size={12} color={"#fb2c36"} className="absolute top-1 left-35" /></label>
                <input 
                    id="mobileNumber"
                    name="mobileNumber"
                    placeholder="Enter mobile number"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="confirmInput"
                 />
                 {formErrors.mobileNumber && <p className="formError font-bold">{formErrors.mobileNumber}</p>}
            </fieldset>
        </div>

           
        </div>
        <div className='grid grid-cols-12 gap-6 w-full'>
            <div className='col-start-1 col-end-13'>
                <fieldset className='flex flex-col space-y-4 '>
                    <label htmlFor="specialRequest" className='userField'>Special Request</label>
                    <textarea id="specialRequest" name='specialRequest' value={formData.specialRequest} onChange={handleChange} type="text" placeholder='Special' className='confirmInput w-full' rows={5} />
                    {formErrors.specialRequest && <p className="formError font-bold">{formErrors.specialRequest}</p>}
                </fieldset>
            </div>
        </div>
        <div className='flex flex-row justify-end space-x-4 sm:mt-5 lg:mt-0'>
            <Button onClick={handleBack} outline className={'flex justify-self-end bg-secondary-3'}>Back</Button>
            <Button className={'flex justify-self-end'} type="primary">Reserve table</Button>
        </div>
       
    </div>
</form>


  )
}

export default UserDetailsForm