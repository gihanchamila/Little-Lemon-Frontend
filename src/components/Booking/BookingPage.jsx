import React, { useReducer, useEffect, useState } from 'react';
import BookingForm from './BookingForm';

import { fetchAPI } from '../../api/api';

const availableTimesReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return action.payload;
    default:
      return state;
  }
};

const BookingPage = () => {
  const [availableTimes, dispatch] = useReducer(availableTimesReducer, []);

  useEffect(() => {
    const today = new Date();
    const times = fetchAPI(today);
    dispatch({ type: 'UPDATE_TIMES', payload: times });
  }, [])

  return (
    <BookingForm availableTimes={availableTimes} dispatch={dispatch}/>
  );
};

export default BookingPage;
