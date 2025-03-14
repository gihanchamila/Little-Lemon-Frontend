import React from 'react'
import { HeaderText } from './Home'
import { photoA, photoB } from '../assets'

const About = () => {
  return (
    <section className='gridLayout'>
        <article className='lg:col-start-2 lg:col-end-6 sm:col-start-1 sm:col-end-5 sm:col-span-full'>
            <div className='sm:flex sm:justify-between sm:space-y-6 sm:flex-col'>
                <header className='sm:w-full'>
                    <HeaderText />
                </header>
                <p className='text-secondary-4 sm:w-full'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            
        </article>
        <aside className='lg:col-start-7 lg:col-end-12 lg:h-full sm:h-full sm:col-start-1 sm:col-end-5 sm:col-span-4' >
            <div className='lg:h-[446px] lg:w-[567px] sm:w-[300px] sm-h-[800px] sm:h-auto relative '>
                <figure className="sm:relative sm:h-auto">
                    <img src={photoA} loading='lazy' alt="Owner's photo in professional setting" role="img" className="lg:h-[275px] lg::w-[345px]  sm:object-cover sm:rounded-2xl" />
                    <img
                        src={photoB}
                        alt="Owner's photo smiling outdoors"
                        role="img"
                        loading='lazy'
                        className="sm:hidden lg:block lg:h-[275px] lg:w-[345px] sm:w-[350px] sm:absolute sm:h-auto sm:top-0 sm:left-1/2 sm:transform sm:-translate-x-1/4 sm:translate-y-1/2 sm:object-cover sm:rounded-2xl"
                    />
                </figure>
            </div>
        </aside>
    </section>
)}

export default About