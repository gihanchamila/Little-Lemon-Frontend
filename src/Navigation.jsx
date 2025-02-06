import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from './assets/Logo.svg'

const navigationLinks = [
  {
    id: 1,
    name: "Home",
    link: "/"
  },

  {
    id: 2,
    name: "About",
    link: "/about"
  },

  {
    id: 3,
    name: "Menu",
    link: "/menu"
  },

  {
    id: 4,
    name: "Reservations",
    link: "/reservations"
  },

  {
    id: 5,
    name: "Order Online",
    link: "/order-online"
  },

  {
    id: 6,
    name: "Login",
    link: "/login"
  }
];

const NavigationItems = () => {
  return (
    <ul className='col-start-5 col-end-12 col-span-9 flex justify-between  '>
      {navigationLinks.map((link) => (
        <li key={link.id}>
          <NavLink to={link.link} className={"text-tiny font-karla font-bold text-secondary-4 uppercase"}>{link.name}</NavLink>
        </li>
      ))}
    </ul>
  );
};

export const LogoImage = ({logo}) => {
  return (
    <figure className='col-start-2 col-end-4 col-span-2'>
      <img src={logo} alt="Company Logo" className='h-[56px] w-[206px]' />
    </figure>
  );
};

const Navigation = () => {
  return (
    <nav role='navigation'  className="gridLayout h-20 flex justify-center items-center">
      <LogoImage logo={Logo} />
      <NavigationItems/>
    </nav>
  )
}

export default Navigation