import React from 'react'
import { Star } from 'lucide-react'
import { person01 } from '../../assets'

const Rating = ({name, image, description, rating}) => {
  return (
    <article className="lg:flex lg:flex-col w-[260px]  max-w-sm ">
        <div className='flex flex-col space-y-4 p-4 bg-secondary-3 h-full w-full rounded-2xl'>
            <header className='flex justify-between'>
                <p className='cardTitle'>Ratings</p>
            </header>
            <main className='flex space-x-4 items-center'>
                <figure className=''>
                    <img src={image} className='h-14 w-14 rounded-xl object-cover' alt="A description of the image" role='img' />
                </figure>
                <div className=''>
                    <h2 className='cardTitle'>{name}</h2>
                    <section className="flex items-center gap-1" aria-label={`Rated ${rating} out of 5`}>
                        {[...Array(5)].map((_, index) => (
                        <Star key={index} className={`h-5 w-5 ${index < rating ? "fill-yellow-500 stroke-yellow-500" : "stroke-gray-400"}`} />
                        ))}
                    </section>
                </div>
            </main>  
            <footer>
                <p className='cardDescription line-clamp-2'>{description}</p>
            </footer>
        </div>
    </article>
  )
}

export default Rating