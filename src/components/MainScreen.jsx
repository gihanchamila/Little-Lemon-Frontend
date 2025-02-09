import React from 'react'
import { useRef } from 'react'
import Home from './Home'
import Special from './Special'
import Testimonials from './Testimonials'
import About from './About'

const MainScreen = () => {

  const homeRef = useRef(null);
  const specialRef = useRef(null);
  const testimonialsRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <section id="home" ref={homeRef}>
        <Home />
      </section>

      <section id="menu" ref={specialRef}>
        <Special />
      </section>

      <section id="testimonials" ref={testimonialsRef}>
        <Testimonials />
      </section>

      <section id="about" ref={aboutRef}>
        <About />
      </section>
    </main>
  )
}

export default MainScreen