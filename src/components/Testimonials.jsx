import React from 'react'

import Rating from './Rating/Rating'
import { person01, person02, person03, person04 } from '../assets'

const ratingList = [
    {
        id : 1,
        image : person01,
        name : "Ethan Cole",
        rating : 4,
        description : "The food was absolutely delicious, and the service was exceptional. I can't wait to come back and try more dishes!"
    },

    {
        id : 2,
        image : person02,
        name : "Noah Bennett",
        rating : 5,
        description : "Great food and a lovely atmosphere, but the wait time was a bit long. Overall, a solid dining experience!"
    },

    {
        id : 3,
        image : person03,
        name : "Lily Harper",
        rating : 3,
        description : "The food was okay, but nothing special. Service could have been better, as we had to wait a while to get our order."
    },

    {
        id : 4,
        image : person04,
        name : "Ava Sinclair",
        rating : 1,
        description : "The food was disappointing, and the flavors were bland. The service was slow, and I probably wouldn’t come back"
    }
]

const Testimonials = () => {
  return (
    <section className="gridLayout bg-primary-1">
        <div className="lg:col-start-2 lg:col-end-12 sm:col-span-full sm:place-items-center lg:place-items-start">
            <div className="sm:flex sm:justify-between sm:items-center sm:mb-4">
                <header className="flex-1 text-center sm:text-left">
                    <h2 className="title text-secondary-3">
                    Testimonials
                    </h2>
                </header>
            </div>
            <ul
            className="grid sm:grid-cols-1 lg:grid-cols-4 gap-6 sm:place-items-center w-full"
            role="list"
            >
            {ratingList.map((rate) => (
                <li
                key={rate.id}
                className="rating-item w-full sm:max-w-xs sm:flex sm:justify-center"
                >
                <Rating
                    image={rate.image}
                    name={rate.name}
                    rating={rate.rating}
                    description={rate.description}
                />
                </li>
            ))}
            </ul>
        </div>
    </section>
  )
}

export default Testimonials