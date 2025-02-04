import React from 'react'
import { NavLink } from 'react-router-dom'

"Home", "About", "Menu", "Reservations", "order online", "Login"

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

const NavigationItems =() => {

    return(

      <li>
        <NavLink to="/" exact activeClassName="active">Home</NavLink>
      </li>

    )
}

const Navigation = () => {
  return (
    <nav>
        <ul>

        </ul>
    </nav>
  )
}

export default Navigation