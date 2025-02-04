import React from 'react'
import { NavLink } from 'react-router-dom'
import { LogoImage } from './Navigation'

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
        <h2>Doormat Navigation</h2>
      </header>
      <ul>
        {doormatLinks.map((link) => (
          <li key={link.id}>
            <NavLink to={link.link}>{link.name}</NavLink>
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
        <h2>Contact Information</h2>
      </header>
      <ul>
        {contactLinks.map((link) => (
          <li key={link.id}>
            <NavLink to={link.link}>{link.name}</NavLink>
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
        <h2>Social Media Links</h2>
      </header>
      <ul>
        {socialLinks.map((link) => (
          <li key={link.id}>
            <NavLink to={link.link}>{link.name}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const Footer = () => {
  return (
    <footer>
      <LogoImage />
      <DoormatItems />
      <ContactItems />
      <SocialItems />
    </footer>
  )
}

export default Footer