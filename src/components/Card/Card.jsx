import React from 'react'
import { Link } from 'react-router-dom'
import { Bike } from 'lucide-react'
import { homeImage } from '../../assets'

const Card = ({image, name, children, className, description, price, text}) => {
  return (
    <article className="lg:flex-col lg:w-[300px] sm:w-full">
        <figure className=''>
            <img src={image} className='lg:h-[250px] lg:w-[300px] sm:w-full sm:h-full rounded-t-2xl object-cover' alt="A description of the image" role='img' />
        </figure>
        <div className='flex flex-col space-y-4 px-4 py-4 bg-secondary-3 rounded-b-2xl'>
            <header className='flex justify-between'>
                <h2 className='cardTitle'>{name}</h2>
                <p className='cardTitle text-secondary-1'>${price}</p>
            </header>
            <main>
                <p className='cardDescription'>{description}</p>
            </main>  
            <footer>
                <Link className='cardCTA'>{text} <Bike size={16} className='ml-2'/></Link>
            </footer>
        </div>
    </article>
  )
}

export default Card