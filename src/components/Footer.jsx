import React from 'react'
import { NavLink } from 'react-router-dom'
import { LogoImage } from './Navigation'
import { LogoFooter } from '../assets'

const doormatLinks = [
  {
    id : 1,
    name : "Home",
    link : "/"
  },
  {
    id : 2,
    name : "About",
    link : "/about"
  },
  {
    id : 3,
    name : "Menu",
    link : "/menu"
  },
  {
    id : 4,
    name : "Reservations",
    link : "/reservations"
  },
  {
    id : 5,
    name : "Order Online",
    link : "/order-online"
  },
  {
    id : 6,
    name : "Login",
    link : "/login"
  }
]

const contactLinks = [
  {
    id : 1,
    name : "Address",
    link : "/address"
  },
  {
    id : 2,
    name : "Phone number",
    link : "/phone-number"
  },
  {
    id : 3,
    name : "Email",
    link : "/email"
  }
]

const socialLinks = [
  {
    id : 1,
    name : "Facebook",
    link : "/facebook"
  },
  {
    id : 2,
    name : "Twitter",
    link : "/twitter"
  },
  {
    id : 3,
    name : "Instagram",
    link : "/instagram"
  }
]

const DoormatItems = () => {
  return (
    <nav aria-label="Doormat Navigation">
      <header>
        <h2 className='FooterTitle'>Doormat Navigation</h2>
      </header>
      <ul>
        {doormatLinks.map((link) => (
          <li key={link.id}>
            <NavLink className={'footerList'}>{link.name}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const ContactItems = () => {
  return (
    <nav aria-label="Contact Information">
      <header>
        <h2 className='FooterTitle'>Contact Information</h2>
      </header>
      <ul>
        {contactLinks.map((link) => (
          <li key={link.id}>
            <NavLink className={'footerList'}>{link.name}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const SocialItems = () => {
  return (
    <nav aria-label="Social Media Links">
      <header>
        <h2 className='FooterTitle lg:mb-7 sm:mb-0'>Social Media Links</h2>
      </header>
      <ul>
        {socialLinks.map((link) => (
          <li className="" key={link.id}>
            <NavLink className={'footerList'} >{link.name}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const Footer = () => {
  return (
    <footer className='gridLayout bg-primary-1'>
      <div className='lg:col-start-2 mb-12'>
        <LogoImage logo={LogoFooter} className={`lg:h-full lg:col-start-2 lg:col-end-5 lg:col-span-4 sm:w-[200px sm:h-full`} />
      </div>
        
        <div className="sm:grid lg:col-start-5 lg:col-end-12 lg:col-span-9 lg:grid-cols-3 gap-16 sm:col-start-1">
          <DoormatItems  />
          <ContactItems />
          <SocialItems />
        </div> 
    </footer>
  )
}

export default Footer