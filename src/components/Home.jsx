import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button/Button";
import { homeImage } from "../assets";

export const HeaderText = ({titleColor, subTitleColor}) => {
  return (
    <header>
      <h1 className={`font-markazi text-2xl ${titleColor}  leading-none font-extrabold`}>Little Lemon</h1>
      <h2 className={`font-markazi text-xl ${subTitleColor}  leading-none`}>Chicago</h2>
    </header>
  );
};

const Text = ({ description }) => {
  return (
    <p className="text-sm font-extrabold text-secondary-3">{description}</p>
  );
};

const Home = () => {
  
  return (
    <main className="gridLayout bg-primary-1 mt-12">
      {/* Left Side (Text & Button) */}
      <section className="lg:col-start-2 lg:text-left lg:col-end-5 lg:col-span-4 lg:flex lg:flex-col lg:justify-between lg:gap-6 sm:col-start-1 sm:col-span-full sm:text-center sm:space-y-4">
        <HeaderText titleColor={`text-primary-2`} subTitleColor={"text-secondary-3"} />
        <Text description="We are a family-owned Mediterranean restaurant focused on traditional recipes served with a modern twist." />
        <div className="mt-5">
          <Link to={"/booking"}>
            <Button type="primary" className={'col-span-2'}>Reserve a table</Button>
          </Link>
        </div> 
      </section>

      {/* Right Side (Image) */}
      <figure className="lg:col-span-7 lg:flex lg:justify-end lg:h-full sm:col-start-1 sm:col-span-full sm:h-full">
        <img src={homeImage} alt="Restaurant food" className="lg:w-[320px] lg:h-[400px] sm:aspect-auto sm:w-[400px] sm:h-[350px] object-cover rounded-2xl" />
      </figure>
    </main>
  );
};

export default Home;
