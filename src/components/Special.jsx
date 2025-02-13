import React from 'react'
import Card from './Card/Card'
import Button from './Button/Button'
import { Bruchetta, LemonDessert, GreekSalad } from '../assets'

const specialItemsDetails = [{
    id : 1,
    name : "Greek salad",
    price : 10.99,
    image : GreekSalad,
    description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
    text : "Order a delivery",
},
{
    id : 2,
    name : "Bruchetta",
    price : 12.99,
    image : Bruchetta,
    description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
    text : "Order a delivery"
},
{
    
    id : 3,
    name : "Lemon Dessert",
    price : 15.99,
    image : LemonDessert,
    description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
    text : "Order a delivery"
}
    
]

const Special = () => {
  return (
    <section className="gridLayout">
        <div className='lg:col-start-2 lg:col-end-12 lg:space-y-4 sm:col-start-1 sm:col-end-5 sm:col-span-5'>
            <div className='flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0'>
                <header className='text-center lg:text-left'>
                    <h2 className='title text-secondary-4 sm:leading-14'>This Week's Specials!</h2>
                </header>
                <div className='sm:w-full lg:w-auto'>
                    <Button type="primary" className='lg:w-full sm:w-full'>Order Online</Button>
                </div>
            </div>
            <div className='lg:flex lg:justify-between sm:flex-row sm:space-y-6 sm:w-full lg:mt-0 sm:mt-5 sm:py-4 lg:py-0'>
                {specialItemsDetails.map((item) => (
                <Card
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    description={item.description}
                    text={item.text}
                />
                ))}
            </div>
        </div> 
    </section>
  )
}

export default Special