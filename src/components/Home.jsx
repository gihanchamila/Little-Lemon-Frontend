import React from 'react'
import Button from './Button/Button'

import { homeImage } from '../assets'

export const HeaderText = () => {
  const title = "Little Lemon"
  const subTitle = "Chicago"

  return (
    <header className='col-start-2 col-end-5 col-span-3 '>
      <h1 className='font-markazi text-2xl text-primary-2'>{title}</h1>
      <h2 className='font-markazi text-xl text-secondary-3'>{subTitle}</h2>
    </header>
  )
}

const TextAndImage = ({ description, className, image, imageAlt }) => {
  return (
    <div className='col-start-2 col-end-13 col-span-10'>
      <article className={`lg:flex lg:flex-row md:flex-row lg:justify-between items-center gap-8 p-6 ${className}`}>
        {/* Text Content */}
        <div className="md:w-1/2 text-left">
          <p className=" col-start-2 col-end-4 col-span-2 text-sm font-extrabold text-secondary-3">{description}</p>
        </div>

        {/* Image Content */}
        <figure className="md:w-1/2 justify-end">
          <img src={image} alt={imageAlt} className='h-[518px] w-[518px]' />
        </figure>
      </article>
    </div>
    
  );
};

const Home = () => {
  return (
    <main className='gridLayout bg-primary-1'>
        <HeaderText />
        <TextAndImage 
          image={homeImage} 
          imageAlt={"Restaurant food image"} 
          description={"We are a family-owned Mediterranean restaurant focused on traditional recipes served with a modern twist"} 
        />
        <Button type="primary" className={'col-start-2 col-end-5 col-span-3'}>Reserve a table</Button>
    </main>
  )
}

export default Home