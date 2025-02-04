import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../public/Logo.svg'

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
    <ul>
      {navigationLinks.map((link) => (
        <li key={link.id}>
          <NavLink to={link.link}>{link.name}</NavLink>
        </li>
      ))}
    </ul>
  );
};

export const LogoImage = () => {
  return (
    <figure>
      <img src={Logo} alt="Company Logo" />
    </figure>
  );
};

const Navigation = () => {
  return (
    <nav role='navigation'>
      <LogoImage />
      <NavigationItems />
    </nav>
  )
}

export default Navigation