import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import {Logo} from '../assets'

const navigationLinks = [
  {
    id: 1,
    name: "Home",
    link: "#home"
  },

  {
    id: 2,
    name: "About",
    link: "#about"
  },

  {
    id: 3,
    name: "Menu",
    link: "#menu"
  },

  {
    id: 4,
    name: "Reservations",
    link: "#reservations"
  },

  {
    id: 5,
    name: "Order Online",
    link: "#order-online"
  },

  {
    id: 6,
    name: "Login",
    link: "#login"
  }
];

const NavigationItems = () => {
  return (
    <ul className='lg:col-start-5 lg:col-end-12 lg:-span-9 lg:flex-row lg:justify-between lg:mt-0 lg:items-center lg:space-y-0 lg:h-fit sm:flex sm:flex-col sm:space-y-8 sm:mt-12 sm:h-dvh'>
      {navigationLinks.map((link) => (
        <li key={link.id}>
          <ScrollLink 
            to={link.link.replace("#", "")} 
            smooth={true} 
            duration={500} 
            offset={-100} 
            className={"navigationList cursor-pointer"}
          >
            {link.name}
          </ScrollLink>
        </li>
      ))}
    </ul>
  );
};

export const LogoImage = ({ logo, className }) => {
  return (
      <figure className='col-start-2 col-end-4 col-span-2'>
        <Link to={'/'}>
          <img 
            src={logo} 
            alt="Company Logo" 
            className={`h-[56px] w-[206px] ${className}`} 
          />
        </Link>
      </figure>
  );
};

const Navigation = () => {

  const [open, setOpen] = useState()

  return (

    <nav role='navigation'  className="lg:grid lg:grid-cols-12 lg:gap-5 lg:px-24 lg:py-12 lg:pb-0 md:grid-cols-4 sm:grid sm:grid-cols-4 sm:gap-5 sm:px-12 sm:pt-12 sm:pb-0 items-center">
      <section className='lg:visible lg:grid grid-cols-12 col-start-1 col-end-13 sm:hidden items-center'>
        <LogoImage logo={Logo} />
        <NavigationItems/>
      </section>
      
      <section className='lg:hidden sm:visible col-start-1 col-end-5'>
        <div className='sm:flex justify-between'>
          <LogoImage logo={Logo} />
          <button className='lg:hidden sm:visible'>
            {open ? <X color='#333333' onClick={() =>setOpen(!open)}/> : <Menu color='#333333' onClick={() =>setOpen(!open) } />}
            
          </button>
        </div>
      </section>

      {open && (
        <section className="sm:block lg:hidden col-start-1 col-end-4">
          <div className=''>
            <NavigationItems />
          </div>
        </section>
      )}

    </nav>
  )
}

export default Navigation