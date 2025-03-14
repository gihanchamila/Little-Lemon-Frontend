import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
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
    link: "reservations"
  },

  {
    id: 5,
    name: "Order Online",
    link: "order-online"
  },

  {
    id: 6,
    name: "Login",
    link: "login"
  }
];

const NavigationItems = ({closeMenu, handleNavigate}) => {
  return (
    <ul className='lg:col-start-5 lg:col-end-12 lg:-span-9 lg:flex-row lg:justify-between lg:mt-0 lg:items-center lg:space-y-0 lg:h-fit sm:flex sm:flex-col sm:space-y-8 sm:mt-12 sm:h-dvh'>
      {navigationLinks.map((link) => (
        <li key={link.id}>
          <ScrollLink 
            to={link.link} 
            smooth={true} 
            duration={500} 
            offset={-980} 
            className={"navigationList cursor-pointer"}
            onClick={() => {
              closeMenu(); 
              handleNavigate(link.link);
            }}
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
  const navigate = useNavigate()

  useEffect(() => {
    if (open) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
  };

  const handleNavigate = (link) => {
    if (link === 'home' || link === 'order-online' || link === 'login') {
      navigate('/'); // Navigate to home first
      setTimeout(() => {
        window.location.hash = ''; // Remove any hash fragment after navigation
      }, 100); // Small delay to ensure navigation is completed
    } else if (link === 'reservations') {
      navigate('/booking');
    } else {
      const section = document.getElementById(link.replace('#', ''));
      if (section) {
        const offset = window.innerWidth < 1024 ? -980 : -80;
        const yOffset = section.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top: yOffset, behavior: 'smooth' });
      } else {
        navigate('/'); // Ensure navigation to home first before scrolling
        setTimeout(() => {
          window.location.hash = link; // Then apply the hash fragment
        }, 100);
      }
    }
  };
  


  return (

    <nav role='navigation'  className="lg:grid lg:grid-cols-12 lg:gap-5 lg:px-24 lg:py-12 lg:pb-0 md:grid-cols-4 sm:grid sm:grid-cols-4 sm:gap-5 sm:px-12 sm:pt-12 sm:pb-0 items-center">
      <section className='lg:visible lg:grid grid-cols-12 col-start-1 col-end-13 sm:hidden items-center'>
        <LogoImage logo={Logo} />
        <NavigationItems  closeMenu={closeMenu} handleNavigate={handleNavigate}  />
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
            <NavigationItems closeMenu={closeMenu} handleNavigate={handleNavigate} />
          </div>
        </section>
      )}

    </nav>
  )
}

export default Navigation